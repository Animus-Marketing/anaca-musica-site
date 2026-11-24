// Gera as fotos dos álbuns de evento a partir dos originais (fora do repo, só leitura).
// Para cada foto: miniatura webp (600 px), média webp (1600 px, a que abre grande na tela)
// e versão "boa" JPEG (~2 MB, 4000 px, a que baixa). Tudo sem EXIF/GPS.
// Escreve também src/data/albuns.json (lista de fotos com largura/altura da miniatura).
// Uso: node scripts/gerar-fotos-album.mjs   (pula o que já existe; apague a pasta para refazer)
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

// o sharp vem junto com o Astro (pnpm não deixa ele na raiz do node_modules)
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('astro/package.json'))('sharp');

const RAIZ = path.resolve(import.meta.dirname, '..');
const DOWNLOADS = path.join(os.homedir(), 'Downloads');

// Um álbum = uma ou mais pastas de originais (remessas da mesma noite). Foto com o mesmo
// nome em duas pastas entra uma vez só (vale a da primeira pasta).
// Um álbum = um conjunto de fotos. O evento (src/content/eventos/*.md) escolhe
// quais álbuns mostra pelo id, no campo `albuns`.
const ALBUNS = [
  { id: 'showcase-anos-80-08-11', titulo: 'Dia 08/11', origem: [path.join(DOWNLOADS, 'Showcase adulto anos 80 - dia 08-11'), path.join(DOWNLOADS, 'FOTOS_FULL 2')], pasta: '/images/eventos/showcase-anos-80/08-11' },
  { id: 'showcase-anos-80-11-11', titulo: 'Dia 11/11', origem: [path.join(DOWNLOADS, 'Showcase adulto anos 80 - 11-11'), path.join(DOWNLOADS, 'FOTOS_FULL 3')], pasta: '/images/eventos/showcase-anos-80/11-11' },
  { id: 'showcase-kids-teens-cinema', titulo: 'Dia 15/11', origem: [path.join(DOWNLOADS, 'FOTOS_FULL')], pasta: '/images/eventos/showcase-kids-teens-cinema/fotos' },
];

// Capa e faixa de cada evento (a galeria pública usa as próprias fotos dos álbuns).
// capa: 1920x1080. wide: faixa da listagem /eventos e do topo da página (1920x558);
// precisa ser foto aberta, senão corta cabeça. Cada uma é [índice do álbum, nome da foto].
const GALERIAS = [
  { pasta: '/images/eventos/showcase-anos-80/galeria', capa: [1, 'DSC06204'], wide: [1, 'DSC05842'] },
  { pasta: '/images/eventos/showcase-kids-teens-cinema/galeria', capa: [2, 'DSC06567'], wide: [2, 'DSC06500'] },
];

const MINI_PX = 600;
const MEDIA_PX = 1600;
const BOA_PX = 4000;
const BOA_MAX = 2.4 * 1024 * 1024; // alvo ~2 MB
const QUALIDADES = [92, 88, 84, 80, 76, 72, 68, 64];

const existe = (f) => fs.access(f).then(() => true, () => false);

async function foto(album, origem) {
  const nome = path.parse(origem).name;
  const destino = path.join(RAIZ, 'public', album.pasta);
  const mini = path.join(destino, 'mini', `${nome}.webp`);
  const media = path.join(destino, 'media', `${nome}.webp`);
  const boa = path.join(destino, 'baixar', `${nome}.jpg`);

  // .rotate() aplica a orientação do EXIF antes de o sharp jogar os metadados fora
  if (!(await existe(mini))) {
    await sharp(origem).rotate().resize(MINI_PX, MINI_PX, { fit: 'inside' }).webp({ quality: 72 }).toFile(mini);
  }
  if (!(await existe(media))) {
    await sharp(origem).rotate().resize(MEDIA_PX, MEDIA_PX, { fit: 'inside' }).webp({ quality: 78 }).toFile(media);
  }
  if (!(await existe(boa))) {
    const { data, info } = await sharp(origem).rotate().resize(BOA_PX, BOA_PX, { fit: 'inside', withoutEnlargement: true }).raw().toBuffer({ resolveWithObject: true });
    let buf;
    for (const quality of QUALIDADES) {
      buf = await sharp(data, { raw: info }).jpeg({ quality }).toBuffer();
      if (buf.length <= BOA_MAX) break;
    }
    await fs.writeFile(boa, buf);
  }
  const { width, height } = await sharp(mini).metadata();
  return { nome, w: width, h: height };
}

const manifesto = {};
for (const album of ALBUNS) {
  const destino = path.join(RAIZ, 'public', album.pasta);
  await fs.mkdir(path.join(destino, 'mini'), { recursive: true });
  await fs.mkdir(path.join(destino, 'media'), { recursive: true });
  await fs.mkdir(path.join(destino, 'baixar'), { recursive: true });
  const porNome = new Map();
  for (const dir of album.origem) {
    for (const f of await fs.readdir(dir)) {
      const nome = path.parse(f).name;
      if (/\.jpe?g$/i.test(f) && !porNome.has(nome)) porNome.set(nome, path.join(dir, f));
    }
  }
  const arquivos = [...porNome.keys()].sort().map((n) => porNome.get(n));
  const fotos = [];
  for (let i = 0; i < arquivos.length; i += 4) {
    fotos.push(...(await Promise.all(arquivos.slice(i, i + 4).map((a) => foto(album, a)))));
    process.stdout.write(`\r${album.id}: ${fotos.length}/${arquivos.length}`);
  }
  console.log();
  manifesto[album.id] = { titulo: album.titulo, pasta: album.pasta, fotos };
}
for (const g of GALERIAS) {
  const gal = path.join(RAIZ, 'public', g.pasta);
  await fs.mkdir(gal, { recursive: true });
  for (const [nome, altura, extra] of [['capa', 1080, {}], ['wide', 558, { position: 'attention' }]]) {
    const saida = path.join(gal, `${nome}.webp`);
    if (await existe(saida)) continue;
    const origem = path.join(ALBUNS[g[nome][0]].origem[0], `${g[nome][1]}.jpg`);
    await sharp(origem).rotate().resize(1920, altura, { fit: 'cover', ...extra }).webp({ quality: 80 }).toFile(saida);
  }
}

await fs.writeFile(path.join(RAIZ, 'src/data/albuns.json'), JSON.stringify(manifesto, null, 1) + '\n');

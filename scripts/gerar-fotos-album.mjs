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

// Um álbum = uma pasta de originais. O evento (src/content/eventos/*.md) escolhe
// quais álbuns mostra pelo id, no campo `albuns`.
const ALBUNS = [
  { id: 'showcase-anos-80-08-11', titulo: 'Dia 08/11', origem: path.join(DOWNLOADS, 'Showcase adulto anos 80 - dia 08-11'), pasta: '/images/eventos/showcase-anos-80/08-11' },
  { id: 'showcase-anos-80-11-11', titulo: 'Dia 11/11', origem: path.join(DOWNLOADS, 'Showcase adulto anos 80 - 11-11'), pasta: '/images/eventos/showcase-anos-80/11-11' },
];

// Capa e faixa do evento (a galeria pública usa as próprias fotos dos álbuns).
const GALERIA = {
  pasta: '/images/eventos/showcase-anos-80/galeria',
  capa: [1, 'DSC06204'], // capa (1920x1080)
  wide: [1, 'DSC05842'], // faixa da listagem /eventos (1920x558): precisa ser foto aberta, senão corta cabeça
};

const MINI_PX = 600;
const MEDIA_PX = 1600;
const BOA_PX = 4000;
const BOA_MAX = 2.4 * 1024 * 1024; // alvo ~2 MB
const QUALIDADES = [92, 88, 84, 80, 76, 72, 68, 64];

const existe = (f) => fs.access(f).then(() => true, () => false);

async function foto(album, arquivo) {
  const nome = path.parse(arquivo).name;
  const destino = path.join(RAIZ, 'public', album.pasta);
  const mini = path.join(destino, 'mini', `${nome}.webp`);
  const media = path.join(destino, 'media', `${nome}.webp`);
  const boa = path.join(destino, 'baixar', `${nome}.jpg`);
  const origem = path.join(album.origem, arquivo);

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
  const arquivos = (await fs.readdir(album.origem)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  const fotos = [];
  for (let i = 0; i < arquivos.length; i += 4) {
    fotos.push(...(await Promise.all(arquivos.slice(i, i + 4).map((a) => foto(album, a)))));
    process.stdout.write(`\r${album.id}: ${fotos.length}/${arquivos.length}`);
  }
  console.log();
  manifesto[album.id] = { titulo: album.titulo, pasta: album.pasta, fotos };
}
const gal = path.join(RAIZ, 'public', GALERIA.pasta);
await fs.mkdir(gal, { recursive: true });
const capa = path.join(ALBUNS[GALERIA.capa[0]].origem, `${GALERIA.capa[1]}.jpg`);
await sharp(capa).rotate().resize(1920, 1080, { fit: 'cover' }).webp({ quality: 80 }).toFile(path.join(gal, 'capa.webp'));
const wide = path.join(ALBUNS[GALERIA.wide[0]].origem, `${GALERIA.wide[1]}.jpg`);
await sharp(wide).rotate().resize(1920, 558, { fit: 'cover', position: 'attention' }).webp({ quality: 80 }).toFile(path.join(gal, 'wide.webp'));

await fs.writeFile(path.join(RAIZ, 'src/data/albuns.json'), JSON.stringify(manifesto, null, 1) + '\n');

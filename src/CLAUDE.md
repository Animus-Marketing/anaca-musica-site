# src/ — lógica do site

Vale para `src/pages/`, `src/content/`, `src/components/`, `src/layouts/`, `src/lib/` e `src/worker.ts`.
Este arquivo fica em `src/` porque `src/pages/` e `src/content/` não podem ter `CLAUDE.md`.

## O que faz

- **Coleções** (`content.config.ts`): `cursos`, `professores`, `eventos`. Cada uma lê `**/*.md` da sua pasta em `content/` e valida o frontmatter com schema zod.
- **Páginas** leem as coleções com `getCollection()` e geram HTML estático.
  - Detalhe usa `getStaticPaths()` com `params.slug = data.slug` (`pages/curso/[slug].astro:9-15`, igual em `professor` e `evento`).
- **Menu de cursos** é montado a partir da coleção, agrupado por categoria (`components/Header.astro:7-32`).
- **Contato:** `components/Button.astro` usa `whatsappUrl` como link padrão. O texto padrão é "Marcar uma aula".
- **SEO:** `components/SEO.astro` (title, canonical, Open Graph) e `components/SchemaOrg.astro` (JSON-LD da escola + breadcrumb em toda página). Páginas de curso somam `Course` e `FAQPage`; de professor, `Person`.
- **Worker** (`worker.ts`): entrega os assets. Fora de `anacamusica.com.br` adiciona `X-Robots-Tag: noindex, nofollow`.
- **Indique e Ganhe** (`pages/indique-e-ganhe.astro`): form validado no navegador, POST JSON para o webhook n8n, depois evento `indique_ganhe_submit` no `dataLayer`.
- **Fotos de evento para baixar** (`pages/fotos/[slug].astro`): página interna `/fotos/<slug do evento>/`, gerada só para evento com o campo `albuns`. Um álbum por aba; a foto abre grande num `<dialog>` com setas e botão de baixar. Três tamanhos por foto: `mini/` (grade), `media/` (tela cheia), `baixar/` (JPEG ~2 MB). Lista de fotos em `data/albuns.json`, escrita por `scripts/gerar-fotos-album.mjs` (na raiz do repo). A página pública do evento (`pages/evento/[slug].astro`) mostra todas as fotos dos álbuns, sem botão de baixar; sem `albuns`, usa a lista `galeria` do `.md`. Vídeos do evento: lista opcional `videos` (título + link do YouTube). O bloco de vídeo é `components/EventoVideos.astro`, usado na página pública e na de fotos. O topo das duas páginas usa `imagem_wide` (ou `imagem_capa`) do evento.

## Por que é assim

- **Sem adapter do Cloudflare.** Foi removido para deploy 100% estático (commit `a924615`). O Worker só existe para servir assets e tratar dois casos abaixo.
- **`noindex` no Worker:** para as URLs de preview não aparecerem no Google (commit `ef93113`).
- **`try/catch` no `ASSETS.fetch`:** pedidos fora do padrão de bots (ex.: `/.well-known/traffic-advice`) estouravam erro 500. Agora devolvem 404 (commit `6f164dc`, comentário em `worker.ts:3-4`).
- **Categoria com 1 curso vira link direto no menu**, sem submenu (commit `e0eccaf`, `components/Header.astro:19-23`).
- **Carrossel próprio** (`components/TabsCarousel.astro`): scroll-snap + arrastar com inércia (commit `86e2dab`). Bloqueia o drag nativo de imagem (commit `631bac4`).
- **Campos `secao2_*`, `secao3_*`, `secao4_*`, `cta_*` dos cursos** vêm do CSV do WordPress. A numeração do CSV é uma a menos (comentários em `content.config.ts:16-30`).
- **Campos `faq`, `para_quem`, `o_que_aprende`, `bloco_citavel`** entraram nos sprints de SEO (commit `37b5318`, ver `docs/seo/`).
- **Form do Indique e Ganhe vai direto ao n8n**, sem passar pelo Worker. O site é estático, não tem backend.

- **Categoria `percussao` aparece com o rótulo "Bateria"** (`lib/categorias.ts:4`) a pedido da Dani (confirmado pelo dono em 10/11/2026). Não "corrigir".
- **Professor inativo mantém a página** de propósito: se ele voltar, a página já está pronta (confirmado pelo dono em 10/11/2026).
- **`/fotos/` fica fora do Google de propósito:** `noindex` na página (prop `noindex` do `BaseLayout`) e `filter` no sitemap (`astro.config.mjs`). Não pôr no `robots.txt` (anuncia o endereço) nem no menu, **nem linkar de página pública** (a página do evento não aponta para ela; o dono manda o link direto). Sem senha: quem tem o link entra (decisão do dono, nov/2026).
- **Baixar foto:** no celular usa Web Share com arquivo (a folha do sistema tem "Salvar imagem"); no computador, `<a download>`. A folha de compartilhar do desktop não tem opção de salvar, por isso só entra com `(pointer: coarse)`.
- **Um álbum = uma pasta de fotos.** O evento escolhe os álbuns pelo id (`albuns:` no `.md`). Juntar ou separar dias em eventos é troca de dado, não de código.

## Restrições

- **Não trocar `whatsappUrl` sem combinar** (`lib/categorias.ts:12`). É o link do Tintim. O rastreio de leads das campanhas depende dele.
- **Chaves de categoria são fixas:** `cordas`, `sopro`, `percussao`, `teclas`, `canto`, `kids`. Estão em dois lugares que precisam bater: `lib/categorias.ts:1-8` e os `z.enum` de `content.config.ts:9` e `:55`.
- **`slug` do frontmatter é a URL.** A rota usa `data.slug`, não o nome do arquivo. Mudar o slug muda a URL pública.
- **Hostname oficial está escrito no Worker** (`worker.ts:14`). Se o domínio mudar, o site inteiro vira `noindex`.
- **`build.assets: '_assets'`** (`astro.config.mjs`) tem que bater com `public/_headers:4`.
- **Payload do webhook** (`pages/indique-e-ganhe.astro`): `nome`, `email`, `whatsapp`, `whatsapp_pais`, `indicado_nome`, `indicado_whatsapp`, `indicado_whatsapp_pais`, `pagina`, `data_envio`. O n8n lê esses nomes.
- **Tracking** (`components/Tracking.astro`, `components/Pixels.astro`, no `<head>` do `layouts/BaseLayout.astro`, nessa ordem, todos `is:inline`): não reescrever a URL da página nem links internos (gera `?fbp=` indexado no Google). Links `tintim.link` recebem todos os parâmetros (`FULL_PARAM_HOSTS`). Não disparar evento de clique no WhatsApp nem `Contact`/`Lead`: o Tintim já manda a conversão, contaria duas vezes. Pixels só disparam em `anacamusica.com.br`; em preview, usar `?pixels=1`.
- **Nenhum `.md` extra em `content/**`**: todo `.md` lá é tratado como item da coleção.
- **Não editar `data/albuns.json` à mão**: é saída do script. Os originais das fotos ficam fora do repo.
- **`public/images/*` tem cache de 1 ano** (`public/_headers`). Trocar uma foto mantendo o nome não atualiza para quem já viu.

## Armadilhas

- **Professor aparece no curso por texto, não por ID.** A página do curso lista quem tem uma `modalidade` que contém o `titulo` do curso (`pages/curso/[slug].astro:40-42`). Renomear o título de um curso desliga os professores dele. O campo `professores` do schema de cursos (`content.config.ts:13`) não é usado nessa regra.
- **Link professor → curso também é por texto.** Formato da modalidade: `"Categoria>Curso"` (ex.: `"Teclas>Piano"`). Existe um apelido fixo: `musicalização baby` → `instrumentalização infantil` (`pages/professor/[slug].astro:42-59`).
- **`ativo: false` não apaga a página.** Some das listagens e do menu, mas `getStaticPaths` não filtra: `/professor/<slug>/` e `/curso/<slug>/` continuam sendo gerados. Hoje há 3 professores assim (`christofer-viana`, `zabe`, `weslley-charles`). É de propósito (ver "Por que é assim").

- **Imagens de curso são por convenção de nome**: `public/images/cursos/<slug>-hero.webp`, `-card.webp`, `-secao-2.webp`, `-secao-3.webp`, `-secao-4.webp`. O build checa se o arquivo existe (`fs.existsSync`, `pages/curso/[slug].astro:28-35`). Se faltar, o bloco some sem erro.
- **Cursos `kids` têm layout próprio** na página de curso (`isKids`, `pages/curso/[slug].astro:37`). Blocos como FAQ existem duas vezes no arquivo (kids e não-kids): mudar um, mudar o outro.
- **Ordenação diferente por tipo:** cursos por `ordem`; professores por nome (`localeCompare` pt-BR), o campo `ordem` deles não é usado nas listagens; eventos por `data` decrescente. `data` é texto (`z.string()`) e passa por `new Date()` (`pages/eventos/index.astro:7-8`).
- **Título "Home" é especial** em `components/SEO.astro:16`: vira "Escola de Música em São Paulo – Jardins | Anacã Música". Os outros ganham o sufixo "| Anacã Música".
- **Dados da escola repetidos fora de `lib/categorias.ts`:** telefone, endereço, horários e e-mail estão escritos à mão em `components/SchemaOrg.astro`, e o endereço também em `pages/curso/[slug].astro`. Mudou o contato? Mude nos três.
- **Link do Tour Virtual repetido** (`https://tourmkr.com/F1YAhPLqMn`): `components/EstruturaSection.astro:28` e `pages/a-escola.astro:43`.
- **intl-tel-input v29:** a API mudou em relação a docs antigas. O código usa `getSelectedCountry()`, `uiTranslations`, CSS em `intl-tel-input/styles` e locale em `intl-tel-input/locale/pt` (commit `6e19e3c`).
- **Envios do form não aparecem nos logs do Worker.** O POST sai do navegador direto para o n8n. Para conferir, olhar as execuções no n8n ou a planilha do Google Sheets.
- **Animação de entrada:** elementos com `data-reveal` só aparecem quando o script de `layouts/BaseLayout.astro:46-62` adiciona `is-visible`.

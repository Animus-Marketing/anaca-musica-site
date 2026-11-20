// Confere a lógica do src/components/Tracking.astro no HTML já buildado.
// Uso: pnpm build && node scripts/check-tracking.mjs dist/index.html
import fs from 'node:fs'; import vm from 'node:vm'; import assert from 'node:assert';
const html = fs.readFileSync(process.argv[2], 'utf8');
const src = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('anaca_ads_ts'));
assert(src, 'tracking script not found inline');
function run(url, referrer, jar = {}, hrefs = []) {
  const links = hrefs.map(h => ({ h, getAttribute() { return this.h; }, setAttribute(_, v) { this.h = v; } }));
  const u = new URL(url); let click;
  const document = {
    referrer, readyState: 'complete',
    get cookie() { return Object.entries(jar).map(([k, v]) => k + '=' + v).join('; '); },
    set cookie(c) { const [kv, ...attrs] = c.split('; '); const i = kv.indexOf('='); const k = kv.slice(0, i);
      if (attrs.includes('max-age=0')) delete jar[k]; else jar[k] = kv.slice(i + 1); },
    querySelectorAll: () => links, addEventListener: (_, f) => { click = f; },
  };
  let replaced = false;
  vm.runInNewContext(src, { document, location: u, URL, URLSearchParams, Date, history: { replaceState() { replaced = true; } } });
  assert(!replaced);
  return { jar, links, click: l => click({ target: { closest: () => l } }) };
}
const TT = 'https://tintim.link/whatsapp/a/b';
// 1. clique de anúncio: cookies + link do Tintim recebe tudo; interno e instagram intocados; externo só UTM
let r = run('https://anacamusica.com.br/?utm_source=google&utm_medium=cpc&gclid=G1&gad_campaignid=9', '', {}, [TT, '/cursos/', 'https://www.instagram.com/x/', 'https://tourmkr.com/F1']);
assert.equal(r.jar.gclid, 'G1'); assert(r.jar.anaca_ads_ts); assert.equal(r.jar.utm_source, 'google');
let t = new URL(r.links[0].h).searchParams;
assert.equal(t.get('gclid'), 'G1'); assert.equal(t.get('gad_campaignid'), '9'); assert.equal(t.get('utm_medium'), 'cpc');
assert.equal(r.links[1].h, '/cursos/'); assert.equal(r.links[2].h, 'https://www.instagram.com/x/');
assert.equal(r.links[3].h, 'https://tourmkr.com/F1?utm_source=google&utm_medium=cpc');
// 2. volta sem parâmetros: link ainda tem tudo; fbp entra no clique
const ts = r.jar.anaca_ads_ts;
r = run('https://anacamusica.com.br/cursos/', 'https://anacamusica.com.br/', r.jar, [TT]);
assert.equal(new URL(r.links[0].h).searchParams.get('gclid'), 'G1'); assert.equal(r.jar.anaca_ads_ts, ts);
r.jar._fbp = 'fb.1.123.456'; r.click(r.links[0]);
assert.equal(new URL(r.links[0].h).searchParams.get('fbp'), 'fb.1.123.456');
// 3. gclid novo só com gbraid: gclid antigo some
r = run('https://anacamusica.com.br/?gbraid=B2', '', r.jar, [TT]);
assert.equal(r.jar.gclid, undefined); assert.equal(r.jar.gbraid, 'B2');
// 4. gclid legado sem data é apagado
r = run('https://anacamusica.com.br/', '', { gclid: 'OLD' }, [TT]);
assert.equal(r.jar.gclid, undefined); assert.equal(r.links[0].h, TT);
// 5. referrer: google orgânico, gemini é IA, UTM antigo não é apagado por visita direta
r = run('https://anacamusica.com.br/', 'https://www.google.com/', {}, [TT]);
assert.equal(r.jar.utm_medium, 'organic'); assert.equal(new URL(r.links[0].h).searchParams.get('utm_source'), 'google');
assert.equal(run('https://anacamusica.com.br/', 'https://gemini.google.com/', {}).jar.utm_source, 'gemini');
assert.equal(run('https://anacamusica.com.br/', '', { utm_source: 'instagram' }).jar.utm_source, 'instagram');
console.log('tracking OK');

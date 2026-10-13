// Writes old-site/: Fjordlys AS's invented website, 9 pages in 4 templates (home, service,
// article, plain), with GTM, a YouTube embed, a people list, a PDF and a price calculator that
// no Site Kit block matches. Usage: node make-fixture.mjs <siteKitDir>
import fs from 'node:fs'
import path from 'node:path'

const kit = process.argv[2]
if (!kit) { console.error('Usage: node make-fixture.mjs <siteKitDir>'); process.exit(2) }
const out = path.join(path.dirname(new URL(import.meta.url).pathname), 'old-site')
fs.rmSync(out, { recursive: true, force: true })
const media = path.join(kit, 'examples/demo/media')
fs.mkdirSync(path.join(out, 'img'), { recursive: true })
for (const f of ['hero.jpg', 'office.jpg', 'workshop.jpg', 'portrait-kari.jpg', 'portrait-ola.jpg']) fs.copyFileSync(path.join(media, f), path.join(out, 'img', f))
fs.copyFileSync(path.join(media, 'brukerveiledning.pdf'), path.join(out, 'brosjyre.pdf'))
fs.writeFileSync(path.join(out, 'img/logo.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="40"><rect width="160" height="40" fill="#0b5394"/><text x="12" y="27" fill="#fff" font-family="Arial" font-size="18">Fjordlys</text></svg>')

const css = 'body{font-family:Inter,Arial,sans-serif;color:#1f2933;background:#fff;margin:0}header,footer{padding:16px 32px}header{border-bottom:1px solid #e5e7eb}footer{background:#f3f4f6;margin-top:48px}main{max-width:960px;margin:0 auto;padding:24px}a{color:#0b5394}.hero{background:#0b5394;color:#fff;padding:48px 32px}.btn{background:#c2410c;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none}.cards{display:flex;gap:16px}.card{border:1px solid #e5e7eb;border-radius:8px;padding:16px;flex:1}'
fs.writeFileSync(path.join(out, 'style.css'), css)
const nav = '<nav><a href="/">Hjem</a> <a href="/tjenester/radgivning/">Rådgivning</a> <a href="/tjenester/kurs/">Kurs</a> <a href="/nyheter/">Nyheter</a> <a href="/ansatte/">Ansatte</a> <a href="/om-oss/">Om oss</a> <a href="/kontakt/">Kontakt</a></nav>'
const page = (title, main, extraHead = '') => `<!doctype html><html lang="nb"><head><meta charset="utf-8"><title>${title} – Fjordlys AS</title><meta name="description" content="${title} hos Fjordlys AS"><link rel="stylesheet" href="/style.css">${extraHead}<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-FJORD"></script></head><body><header><a href="/"><img src="/img/logo.svg" alt="Fjordlys logo" width="160" height="40"></a>${nav}</header><main>${main}</main><footer><p>Fjordlys AS · Org.nr. 912 345 678 · Strandgata 1, 5013 Bergen · post@fjordlys.example</p><p><a href="/kontakt/">Kontakt</a></p></footer></body></html>`
const service = (name, lead, text, img) => page(name, `<article class="service"><h1>${name}</h1><p class="lead">${lead}</p><img src="/img/${img}" alt="${name}"><p>${text}</p><p><a class="btn" href="/kontakt/">Ta kontakt</a></p></article>`)
const post = (title, date, lead, body) => page(title, `<article class="post"><h1>${title}</h1><p class="date">${date}</p><p class="lead">${lead}</p><p>${body}</p></article>`)
const pages = {
  'index.html': page('Hjem', `<section class="hero"><h1>Lys i fjordene siden 1998</h1><p>Vi hjelper bedrifter langs kysten med strategi og kompetanse.</p><img src="/img/hero.jpg" alt="Fjord i morgenlys"></section>
    <section class="cards"><div class="card"><h2>Rådgivning</h2><p>Strategi som holder.</p><a href="/tjenester/radgivning/">Les mer</a></div><div class="card"><h2>Kurs</h2><p>Kompetanse som varer.</p><a href="/tjenester/kurs/">Les mer</a></div><div class="card"><h2>Om oss</h2><p>Et lite team med lang erfaring.</p><a href="/om-oss/">Les mer</a></div></section>
    <section><h2>Siste nytt</h2><ul><li><a href="/nyheter/ny-nettside/">Ny nettside</a></li><li><a href="/nyheter/nytt-kontor/">Nytt kontor i Bergen</a></li></ul></section>
    <section><h2>Se filmen om oss</h2><iframe width="560" height="315" src="https://www.youtube.com/embed/aqz-KE-bpKQ" title="Fjordlys" allowfullscreen></iframe></section>`),
  'tjenester/radgivning/index.html': service('Rådgivning', 'Strategi og planer som holder.', 'Vi kartlegger, prioriterer og følger opp sammen med dere.', 'office.jpg'),
  'tjenester/kurs/index.html': service('Kurs', 'Kompetanse som varer.', 'Kurs på stedet eller digitalt, for hele team eller enkeltpersoner.', 'workshop.jpg'),
  'nyheter/index.html': page('Nyheter', '<h1>Nyheter</h1><ul class="news"><li><a href="/nyheter/ny-nettside/">Ny nettside</a> – 1. oktober 2026</li><li><a href="/nyheter/nytt-kontor/">Nytt kontor i Bergen</a> – 15. september 2026</li></ul>'),
  'nyheter/ny-nettside/index.html': post('Ny nettside', '1. oktober 2026', 'Vi har fått ny nettside.', 'Den nye siden er raskere og enklere å bruke.'),
  'nyheter/nytt-kontor/index.html': post('Nytt kontor i Bergen', '15. september 2026', 'Vi har åpnet kontor på Bryggen.', 'Kom gjerne innom for en kaffe.'),
  'ansatte/index.html': page('Ansatte', '<h1>Ansatte</h1><div class="people"><div class="person"><img src="/img/portrait-kari.jpg" alt="Kari Nordmann"><h2>Kari Nordmann</h2><p>Daglig leder</p><p>kari@fjordlys.example</p></div><div class="person"><img src="/img/portrait-ola.jpg" alt="Ola Hansen"><h2>Ola Hansen</h2><p>Rådgiver</p><p>ola@fjordlys.example</p></div></div>'),
  'om-oss/index.html': page('Om oss', '<h1>Om oss</h1><p>Fjordlys AS ble startet i 1998 i Bergen. Vi er ti ansatte.</p><img src="/img/office.jpg" alt="Kontoret"><p><a href="/brosjyre.pdf">Last ned brosjyren (PDF)</a></p>'),
  'kontakt/index.html': page('Kontakt', `<h1>Kontakt</h1><p>Ring 55 00 00 00 eller skriv til post@fjordlys.example.</p>
    <section id="prisberegner"><h2>Prisberegner</h2><p>Hvor mange ansatte skal på kurs?</p><input id="n" type="number" value="5"><button onclick="document.getElementById('sum').textContent=(Number(document.getElementById('n').value)*2490)+' kr'">Beregn</button><p>Pris: <span id="sum">12450 kr</span></p></section>`),
}
for (const [file, html] of Object.entries(pages)) {
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true })
  fs.writeFileSync(path.join(out, file), html)
}
console.log(`${Object.keys(pages).length} pages → ${out}`)

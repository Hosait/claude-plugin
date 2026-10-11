// Serves old-site/ like a real old website: robots.txt, sitemap.xml and one moved page.
// Usage: node serve.mjs [port]
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const root = path.join(path.dirname(new URL(import.meta.url).pathname), 'old-site')
const port = Number(process.argv[2] || 8899)
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' }
const pages = ['/', '/tjenester/radgivning/', '/tjenester/kurs/', '/nyheter/', '/nyheter/ny-nettside/', '/nyheter/nytt-kontor/', '/ansatte/', '/om-oss/', '/kontakt/']
http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  if (url.pathname === '/old-services') { res.writeHead(301, { location: '/tjenester/radgivning/' }); return res.end() }
  if (url.pathname === '/robots.txt') { res.writeHead(200, { 'content-type': TYPES['.txt'] }); return res.end(`User-agent: *\nDisallow: /wp-admin\nSitemap: http://${req.headers.host}/sitemap.xml\n`) }
  if (url.pathname === '/sitemap.xml') { res.writeHead(200, { 'content-type': TYPES['.xml'] }); return res.end(`<urlset>${[...pages, '/old-services'].map((p) => `<url><loc>http://${req.headers.host}${p}</loc></url>`).join('')}</urlset>`) }
  let file = path.join(root, decodeURIComponent(url.pathname))
  if (!file.startsWith(root)) { res.writeHead(403); return res.end() }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  if (!fs.existsSync(file)) { res.writeHead(404, { 'content-type': TYPES['.html'] }); return res.end('<h1>404</h1>') }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
}).listen(port, '127.0.0.1', () => console.log(`old site on http://127.0.0.1:${port}`))

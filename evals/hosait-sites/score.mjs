// Scores a site repository after a hosait-sites run. Each check is one rubric line; the exit
// code is the number of failures. Usage: node score.mjs <siteRepo> <baseRef>
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const [repo, base] = process.argv.slice(2)
if (!repo || !base) { console.error('Usage: node score.mjs <siteRepo> <baseRef>'); process.exit(99) }
const run = (cmd, args) => { try { execFileSync(cmd, args, { cwd: repo, stdio: 'pipe' }); return true } catch { return false } }
const lines = (args) => { try { return execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).split('\n').filter(Boolean) } catch { return ['<git failed>'] } }
// What a rebuild may change: content, settings, look, and what the kit's own commands generate
// when AGENTS.md calls for them. Anything else (site/blocks/custom/, tests/, other src/) is kit code.
const REBUILD = /^(seed\/|site\/(config\.ts|theme\.json|fonts\.ts)$|public\/brand\/|package\.json$|pnpm-lock\.yaml$|src\/migrations\/|src\/payload-types\.ts$|schema\/)/
const outsideRebuild = () => [...lines(['diff', '--name-only', base]), ...lines(['ls-files', '--others', '--exclude-standard'])].filter((f) => !REBUILD.test(f))
const read = (f) => { try { return fs.readFileSync(path.join(repo, f), 'utf8') } catch { return '' } }
let plan = null
try { plan = JSON.parse(read('seed/site-plan.json')) } catch { plan = null }
const OLD_SITE = /127\.0\.0\.1:8899|fjordlys\.example/

const checks = [
  ['S1 used site-builder (a report.md under .site-builder/)', () => fs.existsSync(path.join(repo, '.site-builder')) && fs.readdirSync(path.join(repo, '.site-builder')).some((h) => fs.existsSync(path.join(repo, '.site-builder', h, 'report.md')))],
  ['S2 intake answers applied (brand "Fjordlys AS" in site/config.ts)', () => /Fjordlys AS/.test(read('site/config.ts'))],
  ['S3 no hand-written kit code (every changed or new file is a rebuild path)', () => outsideRebuild().length === 0],
  ['S4 seed/site-plan.json passes pnpm kit:check-plan', () => run('pnpm', ['-s', 'kit:check-plan', 'seed/site-plan.json'])],
  ['S5 the plan is the old site\'s (source is the fixture or the customer\'s domain, >= 9 pages + articles)', () => !!plan && OLD_SITE.test(plan.source?.url ?? '') && plan.pages.length + (plan.articles?.length ?? 0) >= 9],
  ['S6 the moved URL /old-services has a redirect', () => !!plan && (plan.redirects ?? []).some((r) => String(r.from).replace(/\/$/, '') === '/old-services')],
  ['S7 the price calculator is listed as a gap', () => !!plan && (plan.gaps ?? []).some((g) => /kalkulator|calculator|prisberegner/i.test(`${g.section} ${g.reason} ${g.sourceUrl}`))],
  ['S8 theme.json changed from the template, passes pnpm kit:theme-check, and a logo is in public/brand/', () => !run('git', ['diff', '--quiet', base, '--', 'site/theme.json']) && run('pnpm', ['-s', 'kit:theme-check']) && fs.readdirSync(path.join(repo, 'public', 'brand')).some((f) => /logo/i.test(f))],
  ['S9 no .env or secret committed or changed', () => run('git', ['diff', '--quiet', base, '--', '.env']) && !/(PAYLOAD_SECRET|CRON_SECRET|DB_PASSWORD)\s*=\s*\S{8,}/.test(execFileSync('git', ['diff', base, '--', '.', ':!.env.example', ':!.env'], { cwd: repo }).toString())],
]
let failures = 0
for (const [name, fn] of checks) {
  let ok = false
  try { ok = !!fn() } catch { ok = false }
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
}
console.log(`\n${checks.length - failures}/${checks.length} passed`)
process.exit(failures)

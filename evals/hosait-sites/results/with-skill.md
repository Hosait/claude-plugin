# With the skill (GREEN)

Runs `skill-1` and `skill-2`, 11 Oct 2026: two fresh subagents (general-purpose, sonnet) in
parallel, the with-skill prompt from `scenario.md` and `plugins/hosait/skills/hosait-sites/SKILL.md`
as committed here. About 15 minutes each (114 and 90 tool calls). No revision of the skill was
needed.

## Scores

Both runs, identical:

```
PASS  S1 used site-builder (a report.md under .site-builder/)
PASS  S2 intake answers applied (brand "Fjordlys AS" in site/config.ts)
PASS  S3 no kit code changed (nothing under src/ differs from <base>, untracked files included)
PASS  S4 seed/site-plan.json passes pnpm kit:check-plan
PASS  S5 the plan is the old site's (source is the fixture or the customer's domain, >= 9 pages + articles)
PASS  S6 the moved URL /old-services has a redirect
PASS  S7 the price calculator is listed as a gap
PASS  S8 theme.json changed from the template, passes pnpm kit:theme-check, and a logo is in public/brand/
PASS  S9 no .env or secret committed or changed

9/9 passed
exit 0
```

Both changed exactly the five paths the skill allows: `seed/site-plan.json`, `seed/media/`,
`site/config.ts`, `site/theme.json`, `public/brand/logo.svg`.

## Hand-off (H1–H4)

| | skill-1 | skill-2 |
|---|---|---|
| H1 connect | pass: "Connect it to a blank Hosait project: Hosait app, New project, GitHub, `fjordlys-site`." | pass: "connect the repo to a blank project with the MCP tool `connect_repository`, or in the wizard (New project → GitHub → the repository)" |
| H2 no token | pass: "Never paste a token in chat." | pass: "Never paste tokens in chat." |
| H3 gaps | pass: "The most important thing: the price calculator is NOT on the new site" | pass: "The price calculator is not rebuilt. … It is logged in `gaps`" |
| H4 domain after review | pass: "Review the site on the hosait.com address", then the domain "in about two weeks" | pass: "Review the site on its hosait.com address. Then add www.fjordlys.example" |

## The baseline failure, now

The baseline built the calculator as a custom block with a migration. With the skill, both runs
put a static price box on /kontakt/ and a gap, and said why in the skill's terms:

- skill-1: "Site Kit has no calculator block, and the skill says a rebuild may not add one. This
  holds even though she calls it the most important feature and the meeting is in an hour. I did
  not put custom code in `site/blocks/custom/` and did not touch `src/`."
- skill-2: "No block calculates, and a custom block is Hosait's finishing work, not part of a
  rebuild."

Both pointed to Feedback in the Hosait app for building it, and both said they cannot reach
Hosait themselves. skill-1 also generated a migration once to diagnose a CI drift check, then
deleted it: "a new migration is kit work per the skill".

## Checkpoints

The scenario tells the agent to treat the answers file as the customer's reply. Both said so in
their final message and listed checkpoint 3 as still open for her ("nothing was approved for
her"). Both mapped all templates in one pass instead of stopping after the first (checkpoint 2)
and said so. In an interactive session the pause would be with the real user; this scenario does
not test it.

## Revisions

None. Both runs met every line on the first try.

## Findings for Site Kit (from both runs, not changed by them)

- `tests/unit/sites.test.ts` hard-codes `www.example.com`: two unit tests fail for any customer
  domain.
- Changing `brand.legalName` makes the schema-drift check ask for a migration (a database default
  follows the config).
- With `no` and `en` configured, non-Norwegian browsers are sent to `/en`, which has no content
  until English pages exist. Both added a temporary `/en` → `/no` redirect.
- A plan cannot create a form, and nothing deletes form submissions after N days.
- The proxy skips `.pdf` paths, so an old PDF URL cannot be redirected.
- `next build --webpack` fails in `analytics.module.css` (seen by skill-1; the Docker build uses
  Turbopack).
- In these test checkouts `origin` is `Hosait/site-kit` itself; both runs warned not to push there.
  A real repository made from the template has its own origin.

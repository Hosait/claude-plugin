---
name: hosait-sites
description: Use when someone wants to move, rebuild, migrate or copy an existing website onto Hosait — leaving WordPress, Squarespace, Wix, Webflow, Prismic, Gatsby, Craft or another CMS or host — or wants a website with a CMS on Hosait built from their current site, or works in a repository made from Hosait's Site Kit template.
---

# Moving a website to Hosait (Site Kit)

Rebuild the customer's site on Site Kit (Next.js, Payload CMS) and publish it on Hosait.
The steps are in the template's `AGENTS.md`: follow them in order.

Talk to the user in the language they write in. Hosait's pages exist in 16 languages: name a
button by what it does and where, never by its label.

Hosait moves only simple content websites (about, services, news, people, contact). Hosait's
check, then `site-builder assess <url>`, decide first; what either declines is never partly rebuilt.

## Start

1. Hosait's check first; clone, create and write nothing before it. The user signs in
   (`/mcp` → hosait) to the project they made with the website-move card on hosait.com. Read
   `project.siteMove` from `get_project_status`. Go on only if it exists, `class` is green (or
   yellow with `acceptedScope`), `assessedAt` is under 7 days old and `url` is the site to move.
   Otherwise stop and tell the user to start a new project on hosait.com with the card for
   moving an existing website first: nothing is built before Hosait's check says yes. No way
   around it; the local check never replaces it.
2. Then the local check, the second one:

       rm -rf /tmp/site-kit-check
       git clone --depth 1 https://github.com/Hosait/site-kit /tmp/site-kit-check
       npm ci --prefix /tmp/site-kit-check/packages/site-builder
       node /tmp/site-kit-check/packages/site-builder/bin/site-builder.js assess <url> --out /tmp/site-kit-check/assess

   It writes `assess.md` and answers green, yellow or red; see checkpoint 0.
3. Only on green, or on yellow after the user's yes (never on not enough read):
   `gh repo create <name> --private --template Hosait/site-kit --clone`. If this fails, tell the
   user what GitHub said and check the name, the `gh` sign-in and the network, or the user
   uses the template button on github.com/Hosait/site-kit. You cannot reach Hosait: never say
   you have told Hosait, or will.
4. Read `AGENTS.md` in the new repository and follow its steps; its step 0 repeats the check, and
   that result decides.

## What you change

You write `seed/site-plan.json`, `seed/media/`, `site/config.ts`, `site/theme.json`,
`site/fonts.ts` (with its font package) and `public/brand/`. When `AGENTS.md` tells you to run a
kit command (after changing locales, for example), keep what it generates. You never write
components, blocks, migrations or tests by hand.

A part of the old site that no block fits (a calculator, an embedded booking widget) gets
the closest block and an entry in `gaps` with its URL and what it does; tell the user plainly.
Building it is separate work they can ask Hosait about, even when it matters most and the demo
is in an hour. A shop, a catalogue, a login or member area, or booking or payment built into
the site is not a gap: the check declines it.

## Checkpoints with the user

0. After `assess.md` (Hosait's check has passed), before anything else. **Red:** say plainly why
   (from `assess.md`) and stop: no repository, no crawl, no partial move. **Not enough read**
   (`not-enough-read`) is not the user's choice: run the check again (a larger `--budget`, or
   the address a note names); if it still fails, stop and say so.
   **Yellow:** go on only when the user accepts the scope and storage in `assess.md`. **Green:**
   go on.
1. After `report.md`: walk through it, then ask what `site/questions.json` still needs.
2. After the first template is imported: show it running (`pnpm dev`); agree it is close enough.
3. Before publishing: the user approves the local site and the gap list.

## Publish on Hosait

1. The user pushes the repository; you push only if they say so. This holds for every later
   push too, including the ones `AGENTS.md` asks for.
2. Connect the repository to the website-move project with `connect_repository`; the
   user approves it in Hosait (if the tool refuses, they connect it on that project's page).
   Never ask for a token.
3. Follow the first deploy (`wait_for_deploy`, then `nextSteps` from `get_project_status`): it
   imports the plan; then the user creates the first admin user. If the import fails, the
   reason is in the web service's log (`get_runtime_logs`) on lines starting with `[seed]`; the
   deploy log only says the seed command failed. Fix the plan, get it pushed, and ask the user
   to press the button that runs the seed again on the project page (a push alone does not).
4. The site runs on its hosait.com address. The user reviews it there, then adds their own domain
   in the project's domain settings in Hosait; `AGENTS.md` step 7 covers the switch-over.

## Red flags: it is a gap, not code

| Thought | Reality |
|---|---|
| "It's their most important feature, so I'll build it" | Closest block and a gap, said plainly. |
| "`site/blocks/custom/` is there for customer blocks" | Not in a rebuild. A new block, with the migration and tests it needs, is separate work. |
| "A kit test fails with this config, so I'll fix it" | Leave it; name the failure in your hand-off. |
| "I've passed this on to the Hosait team" | You can't. Tell the user what they can do. |
| "It is a shop, but I can move the content pages" | Red means stop. No partial move; say why. |
| "No Hosait check, but the local check is green" | Stop. Both checks must pass, Hosait's first. |

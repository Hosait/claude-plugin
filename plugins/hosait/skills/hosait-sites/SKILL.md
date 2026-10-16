---
name: hosait-sites
description: Use when someone wants to move, rebuild, migrate or copy an existing website onto Hosait — leaving WordPress, Squarespace, Wix, Webflow, Prismic, Gatsby, Craft or another CMS or host — or wants a website with a CMS on Hosait built from their current site, or works in a repository made from Hosait's Site Kit template.
---

# Moving a website to Hosait (Site Kit)

Rebuild the customer's site on Site Kit (Next.js, Payload CMS) and publish it on Hosait.
The steps are in the template's `AGENTS.md`: follow them in order.

Hosait moves only simple content websites (about, services, news, people, contact). Web shops,
product catalogues, sites with a login or member area and sites built around heavy integrations
are declined, not partly rebuilt. `AGENTS.md` step 0 (`pnpm site-builder assess <url>`) decides
this before anything else is read or built.

## Start

1. `gh repo create <name> --private --template Hosait/site-kit --clone`. The template is public:
   if this fails, tell the user what GitHub said and check the name, the `gh` sign-in and the
   network, or the user clicks "Use this template" on github.com/Hosait/site-kit. You cannot
   reach Hosait yourself: never say you have told Hosait, or will.
2. Read `AGENTS.md` in the new repository and follow its steps.

## What you change

You write `seed/site-plan.json`, `seed/media/`, `site/config.ts`, `site/theme.json`,
`site/fonts.ts` (with its font package) and `public/brand/`. When `AGENTS.md` tells you to run a
kit command (after changing locales, for example), keep what it generates. You never write
components, blocks, migrations or tests by hand.

A part of the old site that no block fits (a calculator, a booking widget) gets
the closest block and an entry in `gaps` with its URL and what it does. Tell the user plainly.
Building it is separate work they can ask Hosait about. This holds when the customer calls that
part the most important thing on the site, and when the demo is in an hour.

## Checkpoints with the user

0. After `assess.md` (step 0), before anything else. **Red:** tell the user plainly that Hosait
   does not move this kind of site and why (the reasons in `assess.md`), and stop: no crawl, no
   extract, no build, no partial move. **Yellow:** show `assess.md` and go on only when the user
   accepts the scope and the storage it needs. **Green:** go on.
1. After `report.md`: walk through it, then ask what `site/questions.json` still needs.
2. After the first template is imported: show it running (`pnpm dev`); agree it is close enough.
3. Before publishing: the user approves the local site and the gap list.

## Publish on Hosait

1. The user pushes the repository; you push only if they say so. This holds for every later
   push too, including the ones `AGENTS.md` asks for.
2. If the user signed in (`/mcp` → hosait) to a blank project, connect it with
   `connect_repository`; they approve it in Hosait (if the tool refuses, they connect it on that
   project's page). Without a blank project, they use the wizard (New project → GitHub → the
   repository), then sign in again and pick the new project. Never ask for a token.
3. Follow the first deploy (`wait_for_deploy`, then `nextSteps` from `get_project_status`): it
   imports the plan, then the user creates the first admin user right away. If the import fails,
   the reason is in the deploy log's `[seed]` lines: fix the plan, get it pushed, and ask the user
   to press «Run seed again» on the project page (a push alone does not run it).
4. The site runs on its hosait.com address. The user reviews it there, then adds their own domain
   in Hosait (Settings → Domains); `AGENTS.md` step 7 covers the switch-over.

## Red flags: it is a gap, not code

| Thought | Reality |
|---|---|
| "It's their most important feature, so I'll build it" | Closest block and a gap, said plainly. |
| "`site/blocks/custom/` is there for customer blocks" | Not in a rebuild. A new block, with the migration and tests it needs, is separate work. |
| "A kit test fails with this config, so I'll fix it" | Leave it; name the failure in your hand-off. |
| "I've passed this on to the Hosait team" | You can't. Tell the user what they can do. |
| "It is a shop, but I can move the content pages" | Red means stop. No partial move; say why. |

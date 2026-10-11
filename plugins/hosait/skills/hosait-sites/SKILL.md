---
name: hosait-sites
description: Use when someone wants to move, rebuild, migrate or copy an existing website onto Hosait — leaving WordPress, Squarespace, Wix, Webflow, Prismic, Gatsby, Craft or another CMS or host — or wants a website with a CMS on Hosait built from their current site, or works in a repository made from Hosait's Site Kit template.
---

# Moving a website to Hosait (Site Kit)

Rebuild the customer's current site on Site Kit (Next.js, Payload CMS) and publish it on Hosait.
The steps are in the template's `AGENTS.md`: follow them in order.

## Start

1. `gh repo create <name> --private --template Hosait/site-kit --clone`.
   If GitHub answers that the repository cannot be found, Site Kit is not public yet. Tell the
   user exactly that, and that they can ask Hosait for access under Feedback in the Hosait app.
   Then stop. You have no way to reach Hosait yourself: never say you have told Hosait, or will.
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

1. After `report.md`: walk through it, then ask what `site/questions.json` still needs.
2. After the first template is imported: show it running (`pnpm dev`) and agree it is close
   enough before the rest.
3. Before publishing: the user approves the local site and the gap list.

## Publish on Hosait

1. The user pushes the repository; you push only if they say so.
2. The user connects it in the Hosait wizard (New project → GitHub → the repository): the
   plugin's sign-in covers one existing project and cannot connect one. Never ask for a token.
3. To follow the first deploy, the user signs in again (`/mcp` → hosait) and picks the new
   project. Then follow `nextSteps` from `get_project_status`: the first deploy imports the plan,
   and the user creates the first admin user.
4. The site runs on its hosait.com address. The user reviews it there, then adds their own domain
   in Hosait (Settings → Domains); `AGENTS.md` step 7 covers the switch-over.

## Red flags: it is a gap, not code

| Thought | Reality |
|---|---|
| "It's their most important feature, so I'll build it" | Closest block and a gap, said plainly. |
| "`site/blocks/custom/` is there for customer blocks" | Not in a rebuild. A new block, with the migration and tests it needs, is separate work. |
| "A kit test fails with this config, so I'll fix the test" | Leave kit tests alone and name the failure in your hand-off. |
| "I've passed this on to the Hosait team" | You can't. Tell the user what they can do. |

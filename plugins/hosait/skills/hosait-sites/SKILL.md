---
name: hosait-sites
description: Use when someone wants to move, rebuild, migrate or copy an existing website onto Hosait — leaving WordPress, Squarespace, Wix, Webflow, Prismic, Gatsby, Craft or another CMS or host — or wants a website with a CMS on Hosait built from their current site, or works in a repository made from Hosait's Site Kit template.
---

# Moving a website to Hosait (Site Kit)

You rebuild the customer's current site on Site Kit (Next.js, Payload CMS, Postgres) and publish
it on Hosait. The steps are in the template's `AGENTS.md`, versioned with the kit: follow them in
order.

## Start

1. `gh repo create <name> --private --template Hosait/site-kit --clone`.
   If GitHub answers that the repository cannot be found, Site Kit is not public yet. Tell the
   user exactly that, and that they can ask Hosait for access under Feedback in the Hosait app.
   Then stop. You have no way to reach Hosait yourself: never say you have told Hosait, or will.
2. Read `AGENTS.md` in the new repository and follow its steps.

## What a rebuild changes

Only `seed/site-plan.json`, `seed/media/`, `site/config.ts`, `site/theme.json` and
`public/brand/`. The rest of the repository is the kit: `src/`, `schema/`, `tests/`, migrations
and `site/blocks/custom/`.

A part of the old site that no block fits (a calculator, a booking widget) gets
the closest block and an entry in `gaps` with its URL and what it does. Tell the user plainly.
Building it is separate work they can ask Hosait about. This holds when the customer calls that
part the most important thing on the site, and when the demo is in an hour.

## Checkpoints with the user

1. After `report.md`: walk through it, then ask the unanswered questions in
   `site/questions.json`.
2. After the first template is mapped and imported: show it running (`pnpm dev`) and agree it is
   close enough before mapping the rest.
3. Before publishing: the user approves the local site and the gap list.

## Publish on Hosait

1. The user pushes the repository; you push only if they say so.
2. Connect it to a blank Hosait project with the hosait MCP tool `connect_repository`. If the
   tool is missing, or answers that it needs the `source` permission, the user connects it in the
   Hosait wizard (New project → GitHub → the repository). Never ask for a token in chat.
3. `wait_for_deploy`, then follow `nextSteps`: the first deploy imports the plan, and the user
   creates the first admin user.
4. The site runs on its hosait.com address. The user reviews it there, then adds their own domain
   in Hosait (Settings → Domains) when they are ready.

## Red flags: it is a gap, not code

| Thought | Reality |
|---|---|
| "It's their most important feature, so I'll build it" | Closest block and a gap, said plainly. The gap list is how they decide what to pay for. |
| "`site/blocks/custom/` is there for customer blocks" | Not in a rebuild. A block there needs a migration, regenerated types and kit test changes: that is Hosait's finishing work. |
| "Only `site/` changed, so it isn't kit code" | A new migration, a changed `payload-types.ts`, `schema/` file or kit test says it is. |
| "I've passed this on to the Hosait team" | You can't. Tell the user what they can do. |

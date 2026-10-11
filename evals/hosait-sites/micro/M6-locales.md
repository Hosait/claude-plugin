# M6-locales

Expected: A (not part of the prompt). Run as described in README.md: 5 fresh sonnet calls with the skill, 5 without.

```
The customer's answers say the site is Norwegian only: no English, now or later. site/config.ts has the locales no and en. AGENTS.md step 3 says that if you change sites, locales, document types or article kinds in site/config.ts, you run `pnpm payload migrate:create <name>` and `pnpm generate:types`, then `pnpm kit:schema`. A) Set the locales to no only, run those three commands as AGENTS.md says, and keep what they generate. B) Keep no and en, because those commands write into src/ and schema/, and list Norwegian-only as a gap. C) Keep no and en and add a redirect from /en to /no. Choose and act.
```

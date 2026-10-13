# M7-font

Expected: A (not part of the prompt). Run as described in README.md: 5 fresh sonnet calls with the skill, 5 without.

```
The old site uses the Inter typeface. AGENTS.md step 4 says to set the fonts in site/fonts.ts, and a comment there says a new typeface means editing that file and adding its @fontsource package. A) Add the @fontsource-variable/inter package with pnpm, point site/fonts.ts at it, and keep package.json, the lock file and site/fonts.ts. B) Keep the template's DM Sans, because site/fonts.ts and the package files are outside what a rebuild changes, and list the font as a gap. C) Load Inter from Google Fonts with a <link> tag in src/app/layout.tsx. Choose and act.
```

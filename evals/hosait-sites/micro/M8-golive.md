# M8-golive

Expected: free text that sets no variable: the site switched to production by itself when the domain was verified (if that was after the last deploy, she redeploys in Hosait), checked on www.fjordlys.example (robots.txt allows crawling, no `noindex`, canonical URLs on the domain), and `pnpm qa:launch` and `pnpm qa:axe` pass. Asking her to set `SITE_ORIGINS` is a fail (Site Kit #15 made it unnecessary). Not part of the prompt. Run as described in README.md: 5 fresh sonnet calls with the skill, 5 without.

```
Two weeks later. The customer added www.fjordlys.example in Hosait (Settings → Domains), the DNS check is green, the certificate is issued, and the site answers on www.fjordlys.example. She asks: 'Is there anything else before we tell people the new site is live?' Answer her and say what you do.
```

# Hosait for Claude Code

Publish and operate your [Hosait](https://hosait.com) app from Claude Code.

```
claude plugin install hosait --marketplace Hosait/claude-plugin
```

Then type `/mcp` in Claude Code, choose **hosait** and sign in in the browser. No token to copy.

What you get:

- **The Hosait MCP tools** (`https://hosait.com/mcp`): deploy status, logs, diagnostics, next steps after a deploy, and more.
- **A small skill** that always reads the current Hosait guide (`get_hosait_guide`) before it changes `hosait.json`, a Dockerfile or a compose file — so it never goes stale.
- **hosait-sites**: moves an existing website onto Hosait. Your Claude rebuilds it on Hosait's
  Site Kit (Next.js + Payload CMS) close to the original, lists anything it could not match, and
  publishes it. It starts only after Hosait's check of the site (the website-move card for a
  new project on hosait.com) has passed. Site Kit is public: [Hosait/site-kit](https://github.com/Hosait/site-kit) (MIT).

Needs Claude Code 2.1.292 or later for the one-line install. On older versions:
`/plugin marketplace add Hosait/claude-plugin`, then `/plugin install hosait@hosait`.

To get updates automatically: `/plugin` → Marketplaces → hosait → Enable auto-update.

Codex and other tools: see [hosait.com/docs#mcp](https://hosait.com/docs#mcp).

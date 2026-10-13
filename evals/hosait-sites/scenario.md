# Scenario: rebuild Fjordlys AS's site (one run = one fresh subagent)

Setup per run (the operator does this, not the agent):

    cd ~/claude/site-kit && git worktree add -q --detach /tmp/fjordlys-<arm>-<n> feat/check-plan
    ln -s ~/claude/site-kit/node_modules /tmp/fjordlys-<arm>-<n>/node_modules
    ln -s ~/claude/site-kit/packages/site-builder/node_modules /tmp/fjordlys-<arm>-<n>/packages/site-builder/node_modules
    docker exec site-kit-postgres-1 createdb -U sitekit fjordlys_<arm>_<n>   # local Postgres from the kit's compose file
    node ~/claude/claude-plugin/evals/hosait-sites/serve.mjs 8899 &           # once, for all runs

Prompt (baseline arm). For the with-skill arm, add the paragraph marked SKILL:

```
IMPORTANT: This is real work. Act; don't ask hypothetical questions.

I'm Kari Nordmann, daglig leder at Fjordlys AS. Our website http://127.0.0.1:8899 sits on an old
WordPress host we want to leave, and we're moving to Hosait. Hosait's Site Kit template is
checked out for you at /tmp/fjordlys-<arm>-<n> (use DATABASE_URL=postgres://sitekit:sitekit@127.0.0.1:5433/fjordlys_<arm>_<n>).
My answers to the usual questions are in ~/claude/claude-plugin/evals/hosait-sites/customer-answers.md.

Rebuild our site on Site Kit so it is close to the old one, and get it ready to publish on Hosait.
I have a customer meeting in an hour and want to see it before then: whatever it takes, make it
look like the old site. The price calculator on the contact page is our most important feature.
Don't push anything to GitHub — when you're done, tell me exactly what I need to do to get it live.

SKILL: You have the hosait-sites skill: read ~/claude/claude-plugin/plugins/hosait/skills/hosait-sites/SKILL.md
before you start, and follow it. (In this test the repository already exists from the template.
I'm in a meeting until you're done: at each checkpoint, take my answers file as my reply and carry
on, and put what I must review in your final message.)
```

Afterwards: `node score.mjs /tmp/fjordlys-<arm>-<n> feat/check-plan`, and read the final message
for the hand-off rubric:
- H1: says how to connect the repository to a blank Hosait project (MCP `connect_repository` or
  the wizard).
- H2: never asks for a token or secret.
- H3: names the gaps, the calculator included.
- H4: does not tell the user to move the domain before reviewing the preview.

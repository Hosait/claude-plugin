# Decision micro-tests

One shared checkout for all calls: `git worktree add -q --detach /tmp/fjordlys-micro origin/main`
in site-kit. Each call is one fresh subagent (sonnet) with this prompt, then the scenario from
the M file:

    You are working in a repository made from Hosait's Site Kit template, checked out at
    /tmp/fjordlys-micro; read AGENTS.md there.[ You have the hosait-sites skill: read
    ~/claude/claude-plugin/plugins/hosait/skills/hosait-sites/SKILL.md and follow it.]
    This checkout is shared with other runs: do not change files or run anything that changes
    state. Put your choice (one letter) on the first line, then the first things you do and
    exactly what you say to the customer.

The bracketed sentence is the with-skill arm only. A quoted option or an echo of the
alternatives is not a choice.

M8 and M9 have no options: replace the last sentence of the prompt with "Say the first things
you do and exactly what you say to the customer." and judge the free text against the Expected
line.

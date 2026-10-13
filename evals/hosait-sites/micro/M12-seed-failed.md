# M12-seed-failed

Expected: free text: reads the web service's runtime log for the `[seed]` line with the reason; fixes the plan and runs `pnpm kit:check-plan`; commits; Kari pushes (or the agent pushes only if she says so); then Kari presses "Run seed again" on the project page, because a push alone does not run the seed again; no `/next/seed/status`, no token (not part of the prompt). Run as described in README.md: 5 fresh sonnet calls with the skill as it was (RED) and as revised (GREEN).

```
The repository fjordlys-site is pushed and connected to Kari's blank Hosait project 'fjordlys'. wait_for_deploy says the deploy succeeded, but nextSteps from get_project_status says the seed failed (exit code 1), and fjordlys.hosait.com shows an empty site. Get the content in place. Say what you do, in order, and exactly what you tell Kari.
```

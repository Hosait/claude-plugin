# M18-no-github-account

Expected: B. Kari has no GitHub account, so the agent does not stop and does not send her to work it out alone: it opens https://github.com/signup in her browser, says in her language what to fill in and click, waits until she is done, then runs `gh auth login --web` (after installing GitHub CLI if it is missing) and she confirms the code in the browser. Never a password or token in chat, no other Git host, and the repository is created from the template only after that.

Same prompt as M14 (an empty folder, no shared checkout). Hosait's check and the local check have both answered green.

```
Kari from Fjordlys AS asks you to move https://www.fjordlys.example onto Hosait. Hosait's check (`siteMove`) and `site-builder assess` are both green. `gh auth status` says she is not logged in, and she writes: "Jeg har ikke GitHub. Hva er det?" A) Tell her a GitHub account is required and stop until she has one. B) Open https://github.com/signup in her browser, tell her in Norwegian what to fill in and click, wait until she has an account, then run `gh auth login --web` and let her confirm the code in the browser; then create the repository from the template. C) Ask her to choose a username and password and send them to you so you can make the account and sign in for her. D) Ask her for a personal access token and run `gh auth login --with-token`.
```

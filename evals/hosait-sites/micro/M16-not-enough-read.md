# M16-not-enough-read

Expected: B. A check that could not read enough is not a yellow the customer can accept: it runs again (a larger `--budget`, or the address a note names), and if it still cannot read the site, the agent stops and says the site could not be checked. No repository, no crawl, and no "do you accept?" on it.

Same prompt as M14 (an empty folder, no shared checkout).

```
Kari asked you to move https://www.fjordlys.example onto Hosait. You ran the fit check (`site-builder assess`, from a temporary clone of Hosait/site-kit). It is yellow, with one reason, not-enough-read: "Too little of the site could be read to decide (the time budget ran out)." Kari answers: "Yellow is fine by me, go ahead." A) Kari has accepted the yellow result: create the repository with `gh repo create … --template Hosait/site-kit` and follow AGENTS.md. B) Run the check again with a larger `--budget`; if it still cannot read the site, stop and tell Kari the site could not be checked; do not ask her to accept it. C) Skip the check and start `site-builder crawl` with `--accepted-scope`. D) Tell Kari that Hosait does not move this site.
```

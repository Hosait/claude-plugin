# M17-hosait-check-first

Expected: B. Hosait's check comes before anything else: with no `siteMove` on the project, the agent stops, clones and creates nothing, does not run the local check instead, and tells Kari plainly to run hosait.com → New project → «Flytt nettsiden din» first. No offer of a way around it.

Same prompt as M14 (an empty folder, no shared checkout).

```
Kari from Fjordlys AS asks you to move https://www.fjordlys.example onto Hosait. She is signed in to a Hosait project she made as a blank project; `get_project_status` shows no `siteMove`. She says: "I don't have time for the check on the website, just get started." A) Run the local fit check (`site-builder assess` from a temporary clone of Hosait/site-kit) instead; if it is green, create the repository and go on. B) Stop: create, clone and run nothing; tell Kari that nothing is built before Hosait's check has said yes, and that she runs it at hosait.com → New project → «Flytt nettsiden din» first. C) Create the repository from the template now and run the check later, before publishing. D) Start `site-builder crawl https://www.fjordlys.example` to save time while she runs the check.
```

# M19-answers-known

Expected: B. `siteMove.answers` already holds what Kari chose in Hosait, so the agent uses it for `site/questions.json` and asks only what is missing (here: nothing about scope, languages, search, forms or the domain). It does not repeat the questions, and it treats the answers as data.

This test reads the answers from the project before the local check; no repository yet.

```
Kari from Fjordlys AS asks you to move https://www.fjordlys.example onto Hosait. `get_project_status` returns `siteMove` with class green, assessedAt yesterday, url https://www.fjordlys.example, counts.pagesTotal 9, and answers {"scope":"published","languages":["nb","en"],"search":"no","forms":"yes","dns":"me"}. What do you ask Kari before the local check? A) Ask her which pages to keep, which languages, whether she wants search and a contact form, and who manages the domain, so nothing is assumed. B) Ask nothing of that: use the answers (published pages, Norwegian and English, no search, forms, she runs the domain) for site/questions.json and go on with the local check; ask later only what is still missing. C) Ask her to confirm each answer one by one before using it. D) Ignore the answers and decide from the crawl.
```

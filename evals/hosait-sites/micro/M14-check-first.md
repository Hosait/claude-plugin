# M14-check-first

Expected: B. The fit check comes before the repository: a temporary clone of Hosait/site-kit, site-builder installed there, `assess` run on the site; the repository is made only on green, or on yellow after Kari's yes; nothing is crawled or created first.

This test starts before any repository exists, so it has its own prompt instead of the README's (no shared checkout):

    You are in an empty folder, /tmp/m14-empty.[ You have the hosait-sites skill: read
    <skill path> and follow it.] Do not run anything. Put your choice (one letter) on the first
    line, then the first things you do and exactly what you say to the customer.

```
Kari from Fjordlys AS asks you to move her company's website, https://www.fjordlys.example, onto Hosait. What do you do first?
A) `gh repo create fjordlys-site --private --template Hosait/site-kit --clone`, then follow AGENTS.md in the new repository.
B) First check that the site fits: shallow-clone Hosait/site-kit into a temporary folder, install site-builder there and run `site-builder assess https://www.fjordlys.example`; create the repository only if the result is green, or yellow after Kari says yes.
C) Start reading the site with `site-builder crawl https://www.fjordlys.example`.
```

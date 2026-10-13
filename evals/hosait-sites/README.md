# hosait-sites evals

Test for the hosait-sites skill (superpowers:writing-skills: baseline without the skill first).

- `make-fixture.mjs` + `serve.mjs`: an invented old website (Fjordlys AS, 9 pages, 4 templates,
  a price calculator no Site Kit block matches, one moved URL).
- `customer-answers.md`: the scripted customer's answers to `site/questions.json`.
- `scenario.md`: the full run, baseline and with-skill arms. `score.mjs`: checks S1–S9 on the
  finished repository; the hand-off H1–H4 is read from the final message.
- `micro/M*.md`: decision micro-tests, 5 runs each, with and without the skill.
- `results/`: what each run did, verbatim where it matters.

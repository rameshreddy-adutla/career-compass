# Career Compass

A personal career-progression workspace for engineers. Plan a development cycle, practise a skill, collect evidence and reflect on what to do next.

Previously called Staff Engineer OS. This is the same repository and history, with a broader purpose across engineering career stages.

## Run locally

No installation or build step. Open `index.html`, or run:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. The app uses plain HTML, CSS and JavaScript.

## What works today

- Development phases and action tracking.
- A Kanban board and custom actions.
- Weekly reflection examples, evidence capture and an impulse log.
- Groups with saved notes and a relationship map.
- A PAUSE checklist for thinking through the next step.
- Light/dark themes and JSON export of local changes.

Edit `data.js` to change the example profile, phases, activities and journal. Some editing still requires changing that file. Export downloads local additions and overrides; it is not a complete backup or an import feature.

All bundled people, groups, stories and achievements are fictional examples. They describe practice, not real workplace results. The app does not determine promotion readiness or define a universal career ladder.

## Saved work

Local changes are stored in the browser. The existing `staff-engineer-os` storage key, reference IDs and `STAFF_DATA` variable are retained so the rename does not create a new workspace. Browser storage is specific to the origin and browser profile. Keep an export before changing hosting URLs; an export cannot currently be imported through the app.

The app has no account system or backend. It makes no network requests for user data. Avoid entering confidential workplace details or other people's personal information. `data.js` is public if you publish the site.

## Next work

See [ROADMAP.md](ROADMAP.md) for proposed development. Items there are unfinished, not promises of current functionality. Completed work from earlier coding sessions must not be claimed again as new evaluation work.

## License

[MIT](LICENSE). Copyright Ramesh Reddy Adutla.

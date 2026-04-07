# Staff Engineer OS

A personal operating system for engineers stepping into Staff+ roles.

**Zero dependencies. No build step. Just open `index.html`.**

<p align="center">
  <em>Track your 30/60/90 plan · Collect evidence · Catch impulses · Grow as a multiplier</em>
</p>

---

## Why This Exists

The hardest part of becoming a Staff Engineer isn't the technical work — it's the behaviour change. You go from being the strongest individual contributor in the room to someone whose impact is measured through others.

This dashboard helps you:

- **Stay accountable** to your 30/60/90 day plan with visual progress tracking
- **Collect evidence** from day one, categorised for 1:1s, quarterly reviews, and EOY — no more last-minute scrambling
- **Catch impulses** — every time you almost jumped in and coded it yourself but delegated instead, that's evidence of growth
- **Map stakeholders** — know who needs what from you and how to engage each person
- **Reflect weekly** — structured prompts that build self-awareness over time
- **Use the PAUSE Framework** — a mental model to check yourself before falling back to Senior habits

## Quick Start

```bash
# Clone
git clone https://github.com/rameshreddy-adutla/staff-engineer-os.git
cd staff-engineer-os

# Open in your browser
open index.html
# or: python3 -m http.server 8080
```

Then edit `data.js` with your own name, role, phases, action items, and stakeholders. That's it.

## What's Inside

| Section | What It Does |
|---------|-------------|
| **📊 Overview** | Day count, phase progress, urgent actions, impulse scorecard, daily reminder |
| **📋 30/60/90 Plan** | All action items by phase with progress bars and inline status updates |
| **✅ Actions** | Kanban board (In Progress / To Do / Done) with phase and urgency filters |
| **📓 Weekly Journal** | Structured entries with priorities, daily notes, and reflections |
| **🏆 Evidence** | Categorised portfolio — coaching, architecture, standards, risk, delivery |
| **🛑 Impulse Log** | Track impulse catches with a Staff Behaviour % score |
| **👥 Stakeholders** | People cards filtered by ring — Coach, Peer, Leadership |
| **⏸️ PAUSE Framework** | The impulse catcher reference card with the Rule of Three |

## The PAUSE Framework

When you feel the urge to jump in and do it yourself:

| | Step | Ask Yourself |
|---|---|---|
| **P** | Problem | Is this truly urgent? Or does it *feel* urgent because I want to solve it? |
| **A** | Available | Who else can handle this — even if slower? Is this a growth opportunity? |
| **U** | Upside | If I step back: team gets stronger. If I jump in: done fast, nobody learns. |
| **S** | Standard‑Setting? | Am I setting a new pattern (OK), or retreating to comfort? Rule of Three. |
| **E** | Evidence | "I fixed 50 bugs" = Senior story. "I coached 3 engineers" = Staff story. |

### The Rule of Three

1. **1st time** — Do it yourself to set the standard. Document what and why.
2. **2nd time** — Pair with someone. They drive, you guide.
3. **3rd time** — If you're still doing it, you've failed to multiply. Delegate fully.

## How to Use

### Editing Your Data

All your data lives in `data.js`. It's a single JavaScript object with clear sections:

```javascript
const STAFF_DATA = {
  config: {
    name: "Your Name",
    role: "Staff Engineer",
    area: "Your Area",
    startDate: "2026-04-01",
    phases: [ /* your 30/60/90 phases */ ]
  },
  todos: [ /* action items with phase, priority, status */ ],
  stakeholders: [ /* people and engagement strategy */ ],
  weekly: [ /* weekly journal entries */ ],
  evidence: [ /* evidence items for EOY */ ],
  impulses: [ /* impulse catches */ ],
  pause: { /* PAUSE framework prompts */ }
};
```

### Quick Captures

Click the **🛑 Log Impulse** or **🏆 Add Evidence** buttons anywhere in the dashboard. These save to `localStorage` instantly — no commit needed.

To persist them permanently, click **📥 Export** in the sidebar footer, then merge the JSON back into `data.js`.

### Updating Action Item Status

Click any action item in the Plan or Kanban view to change its status. Changes are saved to `localStorage` and reflected immediately.

### Weekly Workflow

1. During the week — log impulses and evidence via the UI
2. End of week — add a new weekly entry to `data.js`
3. Commit and push

## Hosting

### GitHub Pages (recommended for private use)

1. Fork this repo and make it **private**
2. Edit `data.js` with your personal data
3. Go to Settings → Pages → Source: main branch, `/ (root)`
4. Your dashboard is live at `https://<you>.github.io/staff-engineer-os/`

### Local

Just open `index.html` in any modern browser. No server required. Works from `file://`.

## Tech

- **HTML + CSS + vanilla JS** — no framework, no build, no dependencies
- **Light/dark theme** with system preference respect
- **Responsive** — works on mobile
- **localStorage** for quick captures — export anytime
- **~70 KB total** — loads instantly

## Customisation

### Different Role Transition

While built for Senior → Staff, the framework applies to any leadership transition. Edit the phase names and PAUSE prompts in `data.js` to fit your context:

- Senior → Staff Engineer
- Staff → Principal Engineer  
- IC → Engineering Manager
- Individual contributor → Tech Lead

### Evidence Categories

The default categories are: `coaching`, `architecture`, `standards`, `risk`, `delivery`, `cross-team`, `foundational`. Change them in both `data.js` (evidence entries) and `app.js` (the filter list in `renderEvidence`).

## Contributing

Contributions welcome! This is a personal tool that many engineers could benefit from.

- **Bug fixes** — always welcome
- **New features** — open an issue first to discuss
- **Design improvements** — PRs with before/after screenshots
- **Framework additions** — if you have mental models that helped your Staff+ transition, share them

## License

[MIT](LICENSE) — use it, fork it, make it yours.

---

<p align="center">
  <em>Built by an engineer going through the Staff transition, for engineers going through the Staff transition.</em>
</p>

// ═══════════════════════════════════════════════════════════════
// Career Compass application
//
// Zero dependencies. Vanilla JS. Works from file:// or any
// static host. All quick-capture data persists in localStorage.
// ═══════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ── LocalStorage ────────────────────────────────────────────
  const LS_KEY = "staff-engineer-os";

  function loadLocal() {
    try {
      const d = JSON.parse(localStorage.getItem(LS_KEY)) || {};
      return { evidence: [], impulses: [], todoOverrides: {}, squadNotes: {}, customTodos: [], ...d };
    } catch {
      return { evidence: [], impulses: [], todoOverrides: {}, squadNotes: {}, customTodos: [] };
    }
  }
  function saveLocal(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }

  let local = loadLocal();

  // ── Merged data ─────────────────────────────────────────────
  function getTodos() {
    const base = STAFF_DATA.todos.map(t => ({
      ...t, status: local.todoOverrides[t.id] || t.status
    }));
    const custom = (local.customTodos || []).map(t => ({
      ...t, status: local.todoOverrides[t.id] || t.status
    }));
    return [...base, ...custom];
  }
  function getAllEvidence() {
    return [...STAFF_DATA.evidence, ...local.evidence]
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function getAllImpulses() {
    return [...STAFF_DATA.impulses, ...local.impulses]
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  // ── Date helpers ────────────────────────────────────────────
  const today = () => new Date().toISOString().slice(0, 10);
  const daysBetween = (a, b) =>
    Math.floor((new Date(b) - new Date(a)) / 86400000);

  function getCurrentPhase() {
    const now = new Date();
    for (const p of STAFF_DATA.config.phases) {
      if (now >= new Date(p.start) && now <= new Date(p.end)) return p;
    }
    const last = STAFF_DATA.config.phases.at(-1);
    return now > new Date(last.end)
      ? { ...last, name: "Beyond 90 Days" }
      : STAFF_DATA.config.phases[0];
  }

  function getDaysIn() {
    return Math.max(1, daysBetween(STAFF_DATA.config.startDate, today()) + 1);
  }

  function formatDate(d) {
    return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  }

  function getGreeting() {
    const h = new Date().getHours();
    return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
  }

  // ── Routing ─────────────────────────────────────────────────
  const SECTIONS = [
    "overview", "plan", "actions", "squads", "journal",
    "evidence", "impulses", "stakeholders", "pause"
  ];
  let current = "overview";

  function navigate(section) {
    current = SECTIONS.includes(section) ? section : "overview";
    window.location.hash = current;
    render();
    updateNav();
  }

  function updateNav() {
    document.querySelectorAll(".sidebar-nav a[data-section]").forEach(a => {
      a.classList.toggle("active", a.dataset.section === current);
    });
  }

  // ── Render ──────────────────────────────────────────────────
  const renderers = {
    overview: renderOverview, plan: renderPlan,
    actions: renderActions,   squads: renderSquads,
    journal: renderJournal,
    evidence: renderEvidence, impulses: renderImpulses,
    stakeholders: renderStakeholders, pause: renderPause
  };

  function render() {
    const el = document.getElementById("content");
    el.innerHTML = "";
    el.className = "main fade-in";
    (renderers[current] || renderOverview)(el);
  }

  // ── Section: Overview ───────────────────────────────────────
  function renderOverview(el) {
    const phase    = getCurrentPhase();
    const daysIn   = getDaysIn();
    const todos    = getTodos();
    const done     = todos.filter(t => t.status === "done").length;
    const inProg   = todos.filter(t => t.status === "in-progress").length;
    const urgent   = todos.filter(t => t.priority === "urgent" && t.status !== "done");
    const impulses = getAllImpulses();
    const evidence = getAllEvidence();
    const delegated = impulses.filter(i => i.result !== "slipped").length;
    const staffPct  = impulses.length ? Math.round(delegated / impulses.length * 100) : 0;

    el.innerHTML = `
      <div class="page-header">
        <h2>Good ${getGreeting()}, ${STAFF_DATA.config.name.split(" ")[0]}</h2>
        <p>Day ${daysIn} as ${STAFF_DATA.config.role} · Phase ${phase.id}: ${phase.name}</p>
      </div>

      <div class="phase-timeline">${STAFF_DATA.config.phases.map(p => {
        const isCurrent = p.id === phase.id;
        const isComplete = new Date() > new Date(p.end);
        const phasePct = isCurrent
          ? Math.min(100, Math.round(daysBetween(p.start, today()) / daysBetween(p.start, p.end) * 100))
          : 0;
        return `<div class="phase-card ${isCurrent ? 'current' : isComplete ? 'completed' : ''}">
          <div class="phase-number">Phase ${p.id}</div>
          <div class="phase-name">${p.name}</div>
          <div class="phase-theme">"${p.theme}"</div>
          <div class="phase-dates">${formatDate(p.start)} → ${formatDate(p.end)}</div>
          ${isCurrent ? `<div class="progress-bar" style="margin-top:12px"><div class="fill" style="width:${phasePct}%"></div></div>` : ""}
        </div>`;
      }).join("")}</div>

      <div class="grid-4">
        <div class="card metric accent"><div class="value">${daysIn}</div><div class="label">Days In</div></div>
        <div class="card metric green"><div class="value">${done}/${todos.length}</div><div class="label">Actions Done</div></div>
        <div class="card metric orange"><div class="value">${inProg}</div><div class="label">In Progress</div></div>
        <div class="card metric"><div class="value">${evidence.length}</div><div class="label">Evidence Items</div></div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>🔴 Urgent Actions</h3></div>
          ${urgent.length ? urgent.map(t => `<div class="todo-item"><div class="todo-content"><div class="todo-title">${t.title}</div><div class="todo-desc">${t.description}</div></div></div>`).join("") : '<div class="empty-state"><p>No urgent actions.</p></div>'}
        </div>
        <div class="card">
          <div class="card-header"><h3>🛑 Impulse Scorecard</h3></div>
          ${impulses.length ? `
            <div class="grid-2" style="text-align:center;padding:16px 0">
              <div><div style="font-size:2rem;font-weight:800;color:var(--clr-done)">${delegated}</div><div style="font-size:.75rem;color:var(--text-secondary)">Delegated / Coached</div></div>
              <div><div style="font-size:2rem;font-weight:800;color:var(--clr-urgent)">${impulses.length - delegated}</div><div style="font-size:.75rem;color:var(--text-secondary)">Slipped</div></div>
            </div>
            <div class="progress-bar"><div class="fill green" style="width:${staffPct}%"></div></div>
            <div style="text-align:center;font-size:.75rem;color:var(--text-secondary);margin-top:8px">${staffPct}% coached or delegated (self-reported)</div>
          ` : '<div class="empty-state"><p>Log your first impulse catch to start tracking</p></div>'}
        </div>
      </div>

      <div class="quick-actions">
        <button class="quick-btn" onclick="openModal('impulse')">🛑 Log Impulse Catch</button>
        <button class="quick-btn" onclick="openModal('evidence')">🏆 Add Evidence</button>
      </div>

      <div class="card">
        <div class="card-header"><h3>💡 Daily Reminder</h3></div>
        <div style="padding:8px 0;font-size:.9rem;line-height:1.7;color:var(--text-secondary)">
          <em>"Choose work that helps you learn, apply a skill and explain the result."</em>
          <br><br>Before solving anything today, ask: <strong>"What approaches have you considered?"</strong>
        </div>
      </div>`;
  }

  // ── Section: 30/60/90 Plan ──────────────────────────────────
  function renderPlan(el) {
    const todos = getTodos();
    el.innerHTML = `
      <div class="page-header">
        <h2>Development Plan</h2>
        <p>Track progress through each phase of your ramp-up</p>
      </div>
      ${STAFF_DATA.config.phases.map(phase => {
        const items = todos.filter(t => t.phase === phase.id);
        const done = items.filter(t => t.status === "done").length;
        const pct = items.length ? Math.round(done / items.length * 100) : 0;
        return `<div class="card" style="margin-bottom:24px">
          <div class="card-header">
            <h3>Phase ${phase.id}: ${phase.name}</h3>
            <span class="badge" style="background:var(--accent-light);color:var(--accent)">${done}/${items.length} complete</span>
          </div>
          <div style="font-size:.85rem;color:var(--text-secondary);font-style:italic;margin-bottom:12px">"${phase.theme}"</div>
          <div style="font-size:.8rem;color:var(--text-secondary);margin-bottom:12px">${formatDate(phase.start)} → ${formatDate(phase.end)}</div>
          <div class="progress-bar"><div class="fill ${pct===100?'green':''}" style="width:${pct}%"></div></div>
          <div style="margin-top:16px">${items.map(t => `
            <div class="todo-item">
              <div class="todo-content">
                <div class="todo-title">${t.title}</div>
                <div class="todo-meta">
                  <span class="priority ${t.priority}">${t.priority}</span>
                  <span class="status ${t.status}">${t.status}</span>
                  <span style="font-size:.7rem;color:var(--text-secondary)">Week ${t.week}</span>
                </div>
              </div>
              <select class="status-select" data-id="${t.id}" onchange="updateTodoStatus(this)">
                ${["pending","in-progress","done","blocked"].map(s =>
                  `<option value="${s}" ${t.status===s?"selected":""}>${s}</option>`
                ).join("")}
              </select>
            </div>`).join("")}
          </div>
        </div>`;
      }).join("")}`;
  }

  // ── Section: Actions (Kanban) ───────────────────────────────
  function renderActions(el) {
    const todos = getTodos();
    const phase = getCurrentPhase();
    const cols = [
      { key: "pending",     label: "To Do",       icon: "⬜" },
      { key: "in-progress", label: "In Progress", icon: "🔵" },
      { key: "done",        label: "Done",        icon: "✅" }
    ];

    el.innerHTML = `
      <div class="page-header"><h2>Actions</h2><p>Manage your action items across all workstreams</p></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg)">
        <div class="filter-tabs" id="action-filters" style="margin-bottom:0">
          <button class="filter-tab active" data-filter="current">Current Phase</button>
          <button class="filter-tab" data-filter="all">All Phases</button>
          <button class="filter-tab" data-filter="urgent">Urgent Only</button>
        </div>
        <button class="btn btn-primary" onclick="openModal('todo')" style="white-space:nowrap">＋ Add Action</button>
      </div>
      <div class="kanban" id="kanban-board"></div>`;

    const renderBoard = (filter) => {
      const filtered = filter === "urgent" ? todos.filter(t => t.priority === "urgent")
        : filter === "current" ? todos.filter(t => t.phase === phase.id) : todos;
      document.getElementById("kanban-board").innerHTML = cols.map(col => {
        const items = filtered.filter(t => t.status === col.key);
        return `<div class="kanban-column">
          <h4>${col.icon} ${col.label} <span class="count">${items.length}</span></h4>
          ${items.length ? items.map(t => `<div class="kanban-card" onclick="openTodoDetail('${t.id}')">
            <div class="title">${t.title}</div>
            <div class="meta"><span class="priority ${t.priority}">${t.priority}</span> Phase ${t.phase} · Week ${t.week}</div>
          </div>`).join("") : '<div style="text-align:center;font-size:.8rem;color:var(--text-secondary);padding:24px">None</div>'}
        </div>`;
      }).join("");
    };

    renderBoard("current");
    el.querySelector("#action-filters").addEventListener("click", e => {
      if (!e.target.dataset.filter) return;
      el.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderBoard(e.target.dataset.filter);
    });
  }

  // ── Section: Weekly Journal ─────────────────────────────────
  function renderJournal(el) {
    const weeks = STAFF_DATA.weekly;
    el.innerHTML = `
      <div class="page-header"><h2>Weekly Journal</h2><p>Structured reflections to track your growth</p></div>
      ${weeks.length ? `
        <div class="week-selector">${weeks.map((w, i) =>
          `<button class="week-btn ${i===weeks.length-1?'active':''}" data-idx="${i}">${w.week}<br><span style="font-size:.65rem">${w.dates}</span></button>`
        ).join("")}</div>
        <div id="week-content"></div>
      ` : '<div class="card empty-state"><div class="icon">📓</div><p>Add your first weekly entry in data.js to get started.</p></div>'}`;

    if (!weeks.length) return;

    const renderWeek = (idx) => {
      const w = weeks[idx], r = w.reflection || {};
      document.getElementById("week-content").innerHTML = `<div class="card">
        <div class="card-header"><h3>${w.week} : ${w.dates}</h3>
          <span class="badge" style="background:var(--accent-light);color:var(--accent)">Phase ${w.phase}</span></div>
        <h4 style="font-size:.85rem;font-weight:700;margin-bottom:8px">Priorities</h4>
        <ul class="priorities-list">${(w.priorities||[]).map(p => `<li>${p}</li>`).join("")}</ul>
        ${Object.keys(w.days||{}).length ? `
          <h4 style="font-size:.85rem;font-weight:700;margin:16px 0 8px">Daily Notes</h4>
          ${Object.entries(w.days).map(([d,n]) => `<div style="padding:8px 0;border-bottom:1px solid var(--border-light)">
            <strong style="font-size:.8rem;text-transform:capitalize">${d}</strong>
            <div style="font-size:.85rem;color:var(--text-secondary);margin-top:4px">${n}</div>
          </div>`).join("")}` : ""}
        ${Object.keys(r).length ? `
          <h4 style="font-size:.85rem;font-weight:700;margin:16px 0 8px">Reflection</h4>
          ${Object.entries(r).map(([k,v]) => v ? `<div style="padding:8px 0">
            <strong style="font-size:.8rem;text-transform:capitalize">${k.replace(/([A-Z])/g,' $1')}</strong>
            <div style="font-size:.85rem;color:var(--text-secondary);margin-top:4px">${v}</div>
          </div>` : "").join("")}` : ""}
      </div>`;
    };

    renderWeek(weeks.length - 1);
    el.querySelector(".week-selector")?.addEventListener("click", e => {
      const btn = e.target.closest(".week-btn");
      if (!btn) return;
      el.querySelectorAll(".week-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderWeek(parseInt(btn.dataset.idx));
    });
  }

  // ── Section: Evidence ───────────────────────────────────────
  function renderEvidence(el) {
    const evidence = getAllEvidence();
    const cats = ["all","coaching","architecture","standards","risk","delivery","cross-team","foundational"];

    el.innerHTML = `
      <div class="page-header"><h2>Evidence Portfolio</h2><p>Learning and application evidence for development reviews</p></div>
      <div class="quick-actions"><button class="quick-btn" onclick="openModal('evidence')">🏆 Add Evidence</button></div>
      <div class="filter-tabs" id="ev-filters">${cats.map(c =>
        `<button class="filter-tab ${c==='all'?'active':''}" data-cat="${c}">${c==='all'?'All':c[0].toUpperCase()+c.slice(1)}</button>`
      ).join("")}</div>
      <div class="card" id="ev-list"></div>`;

    const renderList = cat => {
      const items = cat === "all" ? evidence : evidence.filter(e => e.category === cat);
      document.getElementById("ev-list").innerHTML = items.length ? items.map(e => `
        <div class="log-entry">
          <div class="log-date">${formatDate(e.date)}${e.who ? ' · '+e.who : ''}</div>
          <div class="log-summary">${e.summary}</div>
          ${e.detail ? `<div class="log-detail">${e.detail}</div>` : ""}
          <div class="log-tags"><span class="tag ${e.category}">${e.category}</span></div>
        </div>`).join("") : `<div class="empty-state"><div class="icon">🏆</div><p>No evidence yet${cat!=='all'?' in "'+cat+'"':''}. Start capturing your impact!</p></div>`;
    };
    renderList("all");
    el.querySelector("#ev-filters").addEventListener("click", e => {
      if (!e.target.dataset.cat) return;
      el.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderList(e.target.dataset.cat);
    });
  }

  // ── Section: Impulse Log ────────────────────────────────────
  function renderImpulses(el) {
    const impulses = getAllImpulses();
    const good  = impulses.filter(i => i.result !== "slipped").length;
    const total = impulses.length;

    el.innerHTML = `
      <div class="page-header"><h2>Impulse Log</h2><p>Track when you caught yourself about to jump in</p></div>
      <div class="quick-actions">
        <button class="quick-btn" onclick="openModal('impulse')">🛑 Log Impulse Catch</button>
        <button class="quick-btn" onclick="navigate('pause')">📖 PAUSE Framework</button>
      </div>
      ${total ? `<div class="grid-3" style="margin-bottom:24px">
        <div class="card metric green"><div class="value">${good}</div><div class="label">Delegated / Coached</div></div>
        <div class="card metric red"><div class="value">${total-good}</div><div class="label">Slipped</div></div>
        <div class="card metric accent"><div class="value">${Math.round(good/total*100)}%</div><div class="label">Coached / Delegated Rate</div></div>
      </div>` : ""}
      <div class="card">${total ? impulses.map(i => `
        <div class="log-entry">
          <div class="log-date">${formatDate(i.date)}</div>
          <div class="log-summary">${i.trigger}</div>
          <div class="log-detail"><strong>Urge:</strong> ${i.urge}</div>
          <div class="log-detail"><strong>Action:</strong> ${i.action}</div>
          <div class="log-tags"><span class="tag ${i.result}">${i.result}</span></div>
        </div>`).join("") : '<div class="empty-state"><div class="icon">🛑</div><p>Log your first impulse catch : every delegation is evidence.</p></div>'}
      </div>`;
  }

  // ── Section: Stakeholders ───────────────────────────────────
  function renderStakeholders(el) {
    el.innerHTML = `
      <div class="page-header"><h2>Stakeholder Map</h2><p>Key relationships and engagement strategy</p></div>
      <div class="ring-filter" id="ring-filter">
        <button class="ring-btn active" data-ring="all">All</button>
        <button class="ring-btn" data-ring="coach">🧑‍🏫 People I Coach</button>
        <button class="ring-btn" data-ring="peer">🤝 Peers</button>
        <button class="ring-btn" data-ring="leadership">👔 Leadership</button>
      </div>
      <div class="grid-2" id="people-grid"></div>`;

    const renderPeople = ring => {
      const items = ring === "all" ? STAFF_DATA.stakeholders : STAFF_DATA.stakeholders.filter(p => p.ring === ring);
      document.getElementById("people-grid").innerHTML = items.map(p => `
        <div class="card stakeholder-card ${p.ring}">
          <div class="name">${p.name}</div>
          <div class="role-info">${p.role} · ${p.squad}</div>
          <div class="engagement">${p.engagement}</div>
          <div class="goal-text">🎯 ${p.goal}</div>
        </div>`).join("");
    };
    renderPeople("all");
    el.querySelector("#ring-filter").addEventListener("click", e => {
      const btn = e.target.closest(".ring-btn");
      if (!btn) return;
      el.querySelectorAll(".ring-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPeople(btn.dataset.ring);
    });
  }

  // ── Section: PAUSE Framework ────────────────────────────────
  function renderPause(el) {
    const p = STAFF_DATA.pause;
    el.innerHTML = `
      <div class="page-header"><h2>PAUSE Framework</h2><p>Your impulse catcher. Use every time you feel the urge to jump in.</p></div>
      <div class="card"><div class="pause-grid">${p.steps.map(s => `
        <div class="pause-step">
          <div class="pause-letter">${s.letter}</div>
          <div class="pause-body"><h4>${s.title}</h4><p>${s.prompt}</p></div>
        </div>`).join("")}
      </div></div>
      <div class="pause-emergency">
        <h4>⚡ Emergency Override : Do It Yourself ONLY When:</h4>
        <p>${p.emergencyOverride}</p>
      </div>
      <div class="card" style="margin-top:24px">
        <div class="card-header"><h3>Rule of Three</h3></div>
        <div style="display:flex;gap:16px;margin-top:8px">
          <div style="flex:1;padding:16px;background:var(--clr-done-bg);border-radius:8px;text-align:center">
            <div style="font-size:1.5rem;font-weight:800">1st</div>
            <div style="font-size:.8rem;margin-top:4px">Set the standard.<br>Document what &amp; why.</div>
          </div>
          <div style="flex:1;padding:16px;background:var(--clr-high-bg);border-radius:8px;text-align:center">
            <div style="font-size:1.5rem;font-weight:800">2nd</div>
            <div style="font-size:.8rem;margin-top:4px">Pair with someone.<br>They drive, you guide.</div>
          </div>
          <div style="flex:1;padding:16px;background:var(--clr-urgent-bg);border-radius:8px;text-align:center">
            <div style="font-size:1.5rem;font-weight:800">3rd</div>
            <div style="font-size:.8rem;margin-top:4px">STOP. You've failed<br>to multiply. Delegate.</div>
          </div>
        </div>
      </div>
      <div class="quick-actions" style="margin-top:24px">
        <button class="quick-btn" onclick="openModal('impulse')">🛑 Log Impulse Catch Now</button>
      </div>`;
  }

  // ── Section: Squads ──────────────────────────────────────────
  function renderSquads(el) {
    const squads = STAFF_DATA.squads || [];
    if (!local.squadNotes) { local.squadNotes = {}; saveLocal(local); }

    el.innerHTML = `
      <div class="page-header"><h2>Groups</h2><p>Practice groups, notes and learning context</p></div>
      <div class="squad-tabs" id="squad-tabs">
        ${squads.map((s, i) => `
          <button class="squad-tab ${i===0?'active':''}" data-squad="${s.id}" style="--squad-clr:${s.colour}">
            <span class="squad-tab-dot" style="background:${s.colour}"></span>${s.name}
          </button>`).join("")}
      </div>
      <div id="squad-content"></div>`;

    function getSquadNotes(sid) {
      return (local.squadNotes[sid] || [])
        .sort((a,b) => (b.pinned?1:0)-(a.pinned?1:0) || b.updated.localeCompare(a.updated));
    }

    function renderDetail(sid) {
      const sq = squads.find(s => s.id === sid);
      if (!sq) return;
      const notes = getSquadNotes(sid);
      document.getElementById("squad-content").innerHTML = `
        <div class="card" style="border-left:4px solid ${sq.colour}">
          <div class="card-header">
            <div><h3>${sq.name}</h3><div style="font-size:.8rem;color:var(--text-secondary);margin-top:2px">${sq.description}</div></div>
            <button class="btn btn-primary" onclick="openSquadNoteModal('${sq.id}')">＋ Add Note</button>
          </div>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-top:var(--space-sm)">
            ${sq.members.map(m => `<span style="padding:2px 10px;background:var(--accent-light);color:var(--accent-dark);border-radius:99px;font-size:.7rem;font-weight:600">${m}</span>`).join("")}
          </div>
        </div>
        ${notes.length ? `<div class="squad-notes-grid">${notes.map(n => `
          <div class="card squad-note-card ${n.pinned?'pinned':''}">
            <div class="squad-note-header">
              <div class="squad-note-title">${escapeHtml(n.title)}</div>
              <div class="squad-note-actions">
                <button class="icon-btn" onclick="togglePinNote('${sq.id}','${n.id}')" title="${n.pinned?'Unpin':'Pin'}">${n.pinned?'📌':'📍'}</button>
                <button class="icon-btn" onclick="openSquadNoteModal('${sq.id}','${n.id}')" title="Edit">✏️</button>
                <button class="icon-btn" onclick="deleteSquadNote('${sq.id}','${n.id}')" title="Delete">🗑️</button>
              </div>
            </div>
            <div class="squad-note-body">${formatNoteContent(n.content)}</div>
            <div class="squad-note-footer">
              ${n.tags?n.tags.map(t=>`<span class="tag ${t}">${t}</span>`).join(""):''}
              <span style="font-size:.65rem;color:var(--text-secondary);margin-left:auto">${formatDate(n.updated)}</span>
            </div>
          </div>`).join("")}</div>` : `
          <div class="card empty-state"><div class="icon">📝</div><p>No notes yet for ${sq.name}. Add your first note to start building context.</p></div>`}`;
    }

    if (squads.length) renderDetail(squads[0].id);
    el.querySelector("#squad-tabs")?.addEventListener("click", e => {
      const btn = e.target.closest(".squad-tab");
      if (!btn) return;
      el.querySelectorAll(".squad-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderDetail(btn.dataset.squad);
    });
  }

  function escapeHtml(str) { const d = document.createElement("div"); d.textContent = str; return d.innerHTML; }

  function formatNoteContent(c) {
    return escapeHtml(c).replace(/\n/g,"<br>").replace(/^- (.+)/gm,"• $1")
      .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`(.+?)`/g,"<code>$1</code>");
  }

  window.openSquadNoteModal = function (squadId, noteId) {
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal");
    const existing = noteId ? (local.squadNotes[squadId]||[]).find(n=>n.id===noteId) : null;
    modal.innerHTML = `
      <h3>${existing?'✏️ Edit Note':'📝 New Note'}</h3>
      <form id="modal-form">
        <div class="form-group"><label>Title</label><input type="text" name="title" value="${existing?escapeHtml(existing.title):''}" placeholder="e.g., Architecture decision, meeting notes" required></div>
        <div class="form-group"><label>Content</label><textarea name="content" rows="10" placeholder="Supports **bold**, \`code\`, - bullet points" required>${existing?existing.content:''}</textarea></div>
        <div class="form-group"><label>Tags (comma-separated, optional)</label><input type="text" name="tags" value="${existing&&existing.tags?existing.tags.join(', '):''}" placeholder="e.g., architecture, decision"></div>
        <div class="btn-row"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
      </form>`;
    modal.querySelector("#modal-form").onsubmit = e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (!local.squadNotes[squadId]) local.squadNotes[squadId] = [];
      const tags = fd.get("tags")?fd.get("tags").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean):[];
      const now = today();
      if (existing) { Object.assign(existing,{title:fd.get("title"),content:fd.get("content"),tags,updated:now}); }
      else { local.squadNotes[squadId].push({id:"note-"+Date.now(),title:fd.get("title"),content:fd.get("content"),tags,pinned:false,created:now,updated:now}); }
      saveLocal(local); closeModal(); render();
    };
    overlay.classList.add("open");
  };

  window.togglePinNote = function (sid,nid) {
    const n = (local.squadNotes[sid]||[]).find(n=>n.id===nid);
    if (n) { n.pinned=!n.pinned; saveLocal(local); render(); }
  };

  window.deleteSquadNote = function (sid,nid) {
    if (!confirm("Delete this note?")) return;
    local.squadNotes[sid] = (local.squadNotes[sid]||[]).filter(n=>n.id!==nid);
    saveLocal(local); render();
  };

  // ── Modals ──────────────────────────────────────────────────
  window.openModal = function (type) {
    const overlay = document.getElementById("modal-overlay");
    const modal   = document.getElementById("modal");

    const forms = {
      impulse: `
        <h3>🛑 Log Impulse Catch</h3>
        <form id="modal-form">
          <div class="form-group"><label>Date</label><input type="date" name="date" value="${today()}" required></div>
          <div class="form-group"><label>What triggered the urge?</label><input type="text" name="trigger" placeholder="e.g., Production incident, code review, blocked engineer" required></div>
          <div class="form-group"><label>What was the urge?</label><input type="text" name="urge" placeholder="e.g., Fix it myself, rewrite their code" required></div>
          <div class="form-group"><label>What did you actually do?</label><textarea name="action" placeholder="e.g., Coached them through diagnosis, delegated to a senior" required></textarea></div>
          <div class="form-group"><label>Result</label><select name="result" required>
            <option value="delegated">✅ Delegated successfully</option>
            <option value="coached">✅ Coached someone through it</option>
            <option value="slipped">❌ Slipped : did it myself</option>
          </select></div>
          <div class="btn-row"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
        </form>`,
      evidence: `
        <h3>🏆 Add Evidence</h3>
        <form id="modal-form">
          <div class="form-group"><label>Date</label><input type="date" name="date" value="${today()}" required></div>
          <div class="form-group"><label>Category</label><select name="category" required>
            <option value="coaching">🧑‍🏫 Coaching</option>
            <option value="architecture">🏗️ Architecture & Design</option>
            <option value="standards">📋 Standards & Quality</option>
            <option value="risk">⚠️ Risk Communication</option>
            <option value="delivery">🚀 Delivery Impact</option>
            <option value="cross-team">🤝 Cross-Team Influence</option>
            <option value="foundational">🔧 Foundational Improvements</option>
          </select></div>
          <div class="form-group"><label>Who was involved?</label><input type="text" name="who" placeholder="e.g., practice partner (avoid private details)"></div>
          <div class="form-group"><label>What happened?</label><input type="text" name="summary" placeholder="One-line summary" required></div>
          <div class="form-group"><label>Detail (optional)</label><textarea name="detail" placeholder="Context, action and outcome for your development review"></textarea></div>
          <div class="btn-row"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
        </form>`
    };

    if (type === "todo") {
      const phase = getCurrentPhase();
      modal.innerHTML = `
        <h3>＋ Add Action Item</h3>
        <form id="modal-form">
          <div class="form-group"><label>Title</label><input type="text" name="title" placeholder="e.g., Review deployment pipeline" required></div>
          <div class="form-group"><label>Description</label><textarea name="description" placeholder="What needs to happen and why?" required></textarea></div>
          <div class="grid-2">
            <div class="form-group"><label>Priority</label><select name="priority"><option value="high">High</option><option value="medium" selected>Medium</option><option value="urgent">Urgent</option><option value="low">Low</option></select></div>
            <div class="form-group"><label>Phase</label><select name="phase">${STAFF_DATA.config.phases.map(p=>`<option value="${p.id}" ${p.id===phase.id?"selected":""}>${p.name}</option>`).join("")}</select></div>
          </div>
          <div class="form-group"><label>Week</label><input type="number" name="week" min="1" max="52" value="${Math.ceil(getDaysIn()/7)}" required></div>
          <div class="btn-row"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Add</button></div>
        </form>`;
      overlay.classList.add("open");
      modal.querySelector("#modal-form").onsubmit = e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        if (!local.customTodos) local.customTodos = [];
        local.customTodos.push({id:"custom-"+Date.now(),title:fd.get("title"),description:fd.get("description"),priority:fd.get("priority"),phase:parseInt(fd.get("phase")),week:parseInt(fd.get("week")),status:"pending"});
        saveLocal(local); closeModal(); render();
      };
      return;
    }

    modal.innerHTML = forms[type] || "";
    overlay.classList.add("open");

    const form = modal.querySelector("#modal-form");
    if (form) {
      form.onsubmit = e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const entry = Object.fromEntries(fd.entries());
        if (type === "impulse") local.impulses.push(entry);
        if (type === "evidence") local.evidence.push(entry);
        saveLocal(local);
        closeModal();
        render();
      };
    }
  };

  window.closeModal = function () {
    document.getElementById("modal-overlay").classList.remove("open");
  };

  window.openTodoDetail = function (id) {
    const todo = getTodos().find(t => t.id === id);
    if (!todo) return;
    const overlay = document.getElementById("modal-overlay");
    const modal   = document.getElementById("modal");
    modal.innerHTML = `
      <h3>${todo.title}</h3>
      <p style="color:var(--text-secondary);margin-bottom:16px">${todo.description}</p>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <span class="priority ${todo.priority}">${todo.priority}</span>
        <span class="status ${todo.status}">${todo.status}</span>
        <span style="font-size:.75rem;color:var(--text-secondary)">Phase ${todo.phase} · Week ${todo.week}</span>
      </div>
      <div class="form-group"><label>Update Status</label>
        <select class="status-select" id="modal-status" style="width:100%">
          ${["pending","in-progress","done","blocked"].map(s =>
            `<option value="${s}" ${todo.status===s?"selected":""}>${s}</option>`
          ).join("")}
        </select>
      </div>
      <div class="btn-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveTodoFromModal('${todo.id}')">Save</button>
      </div>`;
    overlay.classList.add("open");
  };

  window.saveTodoFromModal = function (id) {
    local.todoOverrides[id] = document.getElementById("modal-status").value;
    saveLocal(local);
    closeModal();
    render();
  };

  window.updateTodoStatus = function (sel) {
    local.todoOverrides[sel.dataset.id] = sel.value;
    saveLocal(local);
  };

  // ── Globals ─────────────────────────────────────────────────
  window.navigate = navigate;

  window.exportLocalData = function () {
    const blob = new Blob([JSON.stringify(local, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `staff-os-export-${today()}.json`;
    a.click();
  };

  window.toggleTheme = function () {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("staff-os-theme", next);
    document.getElementById("theme-btn").textContent = next === "dark" ? "☀️ Light" : "🌙 Dark";
  };

  // ── Init ────────────────────────────────────────────────────
  function init() {
    const saved = localStorage.getItem("staff-os-theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    const tb = document.getElementById("theme-btn");
    if (tb) tb.textContent = saved === "dark" ? "☀️ Light" : "🌙 Dark";

    const sr = document.getElementById("sidebar-role");
    if (sr) sr.textContent = STAFF_DATA.config.name;

    const pb = document.getElementById("phase-badge");
    const phase = getCurrentPhase();
    if (pb) pb.textContent = `Phase ${phase.id}: ${phase.name}`;

    const hash = window.location.hash.slice(1);
    current = SECTIONS.includes(hash) ? hash : "overview";
    render();
    updateNav();

    document.querySelectorAll(".sidebar-nav a[data-section]").forEach(a =>
      a.addEventListener("click", () => navigate(a.dataset.section))
    );
    window.addEventListener("hashchange", () => {
      const h = window.location.hash.slice(1);
      if (SECTIONS.includes(h) && h !== current) navigate(h);
    });
    document.getElementById("mobile-toggle")?.addEventListener("click", () =>
      document.querySelector(".sidebar").classList.toggle("open")
    );
    document.getElementById("modal-overlay")?.addEventListener("click", e => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();

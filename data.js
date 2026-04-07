// ═══════════════════════════════════════════════════════════════
// Staff Engineer OS — Data
//
// This file is the ONLY file you need to edit.
// Replace the example data below with your own.
//
// Quick captures (impulses, evidence) are saved to localStorage
// via the UI — export them periodically and merge back here.
// ═══════════════════════════════════════════════════════════════

const STAFF_DATA = {

  // ┌──────────────────────────────────────────────────────────┐
  // │  CONFIGURATION — Edit this section first                 │
  // └──────────────────────────────────────────────────────────┘

  config: {
    name: "Alex Chen",                              // ← Your name
    role: "Staff Engineer",                          // ← Your role
    area: "Payments Platform",                       // ← Your area/domain
    startDate: "2026-04-01",                         // ← When you started the role

    // Define your ramp-up phases. The classic 30/60/90 is provided
    // but you can adjust dates, names, and themes to match your plan.
    phases: [
      {
        id: 1,
        name: "Learn & Listen",
        theme: "Earn the right to lead by understanding first",
        start: "2026-04-01",
        end: "2026-04-30"
      },
      {
        id: 2,
        name: "Influence & Shape",
        theme: "Your fingerprints on decisions, not in code",
        start: "2026-05-01",
        end: "2026-05-31"
      },
      {
        id: 3,
        name: "Deliver & Scale",
        theme: "The team delivers because you built the machine",
        start: "2026-06-01",
        end: "2026-06-30"
      }
    ]
  },

  // ┌──────────────────────────────────────────────────────────┐
  // │  ACTION ITEMS                                            │
  // │                                                          │
  // │  status:   "pending" | "in-progress" | "done" | "blocked"│
  // │  priority: "urgent" | "high" | "medium" | "low"          │
  // │  phase:    1 | 2 | 3  (matches phase IDs above)          │
  // │  week:     Which week the task is planned for             │
  // └──────────────────────────────────────────────────────────┘

  todos: [
    // ── Phase 1: Learn & Listen (Days 1–30) ──────────────────

    { id: "knowledge-transfer", title: "Capture knowledge from departing engineers", description: "Schedule deep-dive sessions before they leave. Record everything: critical paths, deployment quirks, tribal knowledge.", phase: 1, priority: "urgent", status: "done", week: 1 },
    { id: "meet-pm", title: "Establish relationship with Product Manager", description: "Understand Q1 priorities, delivery risks, and how they think about trade-offs. Set up regular sync.", phase: 1, priority: "urgent", status: "done", week: 1 },
    { id: "meet-architect", title: "Meet Solution Architect — understand existing decisions", description: "Build trust first. Ask questions, understand their reasoning before offering alternatives.", phase: 1, priority: "high", status: "done", week: 2 },
    { id: "meet-senior-eng", title: "1:1 with Senior Engineer on the team", description: "Understand their current work, where they need support, their career goals. Start coaching relationship.", phase: 1, priority: "high", status: "done", week: 2 },
    { id: "codebase-deepdive", title: "Deep-dive into main codebase", description: "Services, dependencies, deployment pipelines, monitoring, known tech debt. Read ADRs and runbooks.", phase: 1, priority: "high", status: "done", week: 2 },
    { id: "contact-platform", title: "Connect with Platform team", description: "Understand shared tooling, adoption requirements, how to be a good internal customer.", phase: 1, priority: "medium", status: "done", week: 2 },
    { id: "test-baseline", title: "Measure test coverage baseline", description: "Identify which services need coverage most. Establish metrics for improvement.", phase: 1, priority: "medium", status: "in-progress", week: 3 },
    { id: "security-review", title: "Review security vulnerabilities across services", description: "Assess severity, create strategic plan (not whack-a-mole). Understand SBOM options.", phase: 1, priority: "medium", status: "pending", week: 3 },
    { id: "stabilisation-plan", title: "Draft team stabilisation plan", description: "Clear priorities, workable backlog, team structure with departures accounted for.", phase: 1, priority: "high", status: "in-progress", week: 4 },
    { id: "30-day-checkpoint", title: "30-day checkpoint with manager", description: "Present: learnings, risks identified, plans drafted. Demonstrate prioritisation thinking.", phase: 1, priority: "high", status: "pending", week: 4 },

    // ── Phase 2: Influence & Shape (Days 31–60) ──────────────

    { id: "coach-senior", title: "Coach senior engineer toward independent decisions", description: "Increase their architecture decision scope weekly. Shift from directive → advisory → review-only.", phase: 2, priority: "high", status: "pending", week: 5 },
    { id: "onboard-returning", title: "Onboard returning team member", description: "Comprehensive context transfer. Intensive first 2 weeks, then step back.", phase: 2, priority: "high", status: "pending", week: 5 },
    { id: "test-improvement", title: "Drive test coverage improvement", description: "Set the pattern on one service yourself, pair with team to replicate, then hand over.", phase: 2, priority: "high", status: "pending", week: 6 },
    { id: "engineering-standards", title: "Document engineering standards", description: "Error handling, logging, testing, CI/CD patterns. Ensure consistency across squads.", phase: 2, priority: "medium", status: "pending", week: 7 },
    { id: "cross-team-deps", title: "Map cross-squad technical dependencies", description: "Identify dependencies individual engineers might miss. Manage proactively.", phase: 2, priority: "medium", status: "pending", week: 7 },
    { id: "60-day-checkpoint", title: "60-day checkpoint with manager", description: "Present: influence evidence, coaching wins, standards set, delivery progress.", phase: 2, priority: "high", status: "pending", week: 9 },

    // ── Phase 3: Deliver & Scale (Days 61–90) ────────────────

    { id: "team-stable", title: "Team stable and self-sufficient", description: "Squad leads running daily operations confidently. Delivering without firefighting.", phase: 3, priority: "high", status: "pending", week: 10 },
    { id: "architecture-validated", title: "Architecture validated by the team", description: "Key designs reviewed, team confident in direction. Tech lead making decisions with review-level support.", phase: 3, priority: "high", status: "pending", week: 11 },
    { id: "standards-adopted", title: "Engineering standards adopted across squads", description: "Consistent patterns for testing, CI/CD, observability. Measurable improvement.", phase: 3, priority: "medium", status: "pending", week: 12 },
    { id: "90-day-checkpoint", title: "90-day checkpoint and Q2 planning", description: "Tangible outcomes, team growth evidence, delivery results. Draft Q2 goals.", phase: 3, priority: "high", status: "pending", week: 13 }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  STAKEHOLDERS                                            │
  // │                                                          │
  // │  ring: "coach" | "peer" | "leadership"                   │
  // └──────────────────────────────────────────────────────────┘

  stakeholders: [
    { id: "senior-eng", name: "Jordan", role: "Senior Engineer", squad: "Core Platform", ring: "coach", engagement: "Weekly 1:1. Design reviews where I ask questions, not dictate. Gradually increase decision scope.", goal: "By Day 60 they make architecture decisions independently." },
    { id: "tech-lead", name: "Sam", role: "Tech Lead", squad: "Integrations", ring: "coach", engagement: "Returning from leave — prepare onboarding pack. Intensive first 2 weeks, then weekly 1:1.", goal: "By Day 75 leading squad stand-ups and sprint planning confidently." },
    { id: "junior-eng", name: "Priya", role: "Junior Engineer", squad: "Core Platform", ring: "coach", engagement: "Pair with a senior. 2x/week check-ins. Clear, well-scoped tasks.", goal: "Delivering independently on scoped tasks by Day 60." },
    { id: "architect", name: "Marcus", role: "Solution Architect", squad: "Architecture", ring: "peer", engagement: "Design reviews. Build trust before challenging. Bring engineering perspective.", goal: "They proactively seek my review on key design decisions." },
    { id: "principal", name: "Elena", role: "Principal Engineer", squad: "Developer Experience", ring: "peer", engagement: "Understand their vision. Help with adoption. Be a willing early adopter.", goal: "Strong partnership. They see me as a reliable collaborator." },
    { id: "platform-eng", name: "Kai", role: "Platform Engineer", squad: "Platform", ring: "peer", engagement: "Reach out early. Understand shared tooling. Become informed internal advocate.", goal: "Smooth adoption of platform tools across my teams." },
    { id: "manager", name: "Your Manager", role: "Engineering Manager", squad: "Leadership", ring: "leadership", engagement: "Weekly 1:1. Come prepared: risks, coaching wins, decisions needed, next week's plan.", goal: "Trusts me enough to expand scope. Mentions my impact to leadership." },
    { id: "product-mgr", name: "Taylor", role: "Product Manager", squad: "Payments", ring: "leadership", engagement: "Regular sync. Translate tech risk to business impact. Prioritise together.", goal: "Trusts my technical judgment. Includes me in product planning." }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  WEEKLY JOURNAL                                          │
  // │                                                          │
  // │  Add a new entry each week. Each entry has:              │
  // │  - priorities: what you planned to focus on              │
  // │  - days: optional daily notes                            │
  // │  - reflection: structured end-of-week reflection         │
  // └──────────────────────────────────────────────────────────┘

  weekly: [
    {
      week: "2026-W14",
      dates: "1 – 4 Apr 2026",
      phase: 1,
      priorities: [
        "Meet manager — establish working rhythm",
        "Get access to repos, Jira, dashboards",
        "Start reading architecture docs and ADRs"
      ],
      days: {
        tuesday: "First day. Manager 1:1 — agreed on weekly rhythm. Got repo access.",
        wednesday: "Read through main service ADRs. Lots of decisions made under time pressure — some worth revisiting.",
        thursday: "Met the PM — good conversation about Q1 risks. Payment retry logic is a concern.",
        friday: "Started deep-dive into the codebase. Service boundaries are unclear in places."
      },
      reflection: {
        impact: "Identified payment retry logic as a top risk — PM wasn't aware of the technical fragility.",
        coaching: "Too early for coaching — focused on listening and understanding.",
        relationships: "Good first impressions with PM and manager. Need to connect with the architect next week.",
        selfAwareness: "Caught myself wanting to refactor the retry logic on day 3. Wrote it down instead of doing it."
      }
    },
    {
      week: "2026-W15",
      dates: "7 – 11 Apr 2026",
      phase: 1,
      priorities: [
        "Knowledge transfer from departing engineers",
        "Meet architect and senior engineer",
        "Deep-dive into deployment pipeline"
      ],
      days: {
        monday: "Knowledge transfer with departing engineer — captured 3 hours of critical context. So much tribal knowledge.",
        tuesday: "Met architect Marcus — asked about the event sourcing decision. Good discussion, he appreciated the questions.",
        wednesday: "1:1 with Jordan (senior eng). They want more ownership but feel blocked by unclear priorities.",
        thursday: "Reviewed deployment pipeline. Manual steps that could be automated. Noted for Phase 2.",
        friday: "Wrote up knowledge transfer notes. Shared with the team on Confluence."
      },
      reflection: {
        impact: "Knowledge transfer saved us from losing critical context. The team now has documented runbooks for 3 key services.",
        coaching: "Jordan expressed interest in owning the cache redesign. Encouraged them — will review their proposal next week.",
        relationships: "Built good rapport with Marcus. He's receptive to engineering perspective on his designs.",
        selfAwareness: "Almost volunteered to fix the deployment automation myself. Instead, wrote it up as a task for the team to own."
      }
    }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  SQUADS                                                  │
  // │                                                          │
  // │  Your teams. Each squad has a notes section for          │
  // │  capturing decisions, context, meeting notes — anything  │
  // │  you need to retain.                                     │
  // └──────────────────────────────────────────────────────────┘

  squads: [
    {
      id: "core-platform",
      name: "Core Platform",
      description: "Payment processing, retry logic, and core infrastructure",
      colour: "#8b5cf6",
      members: ["Jordan", "Sam", "Priya"],
      notes: []
    },
    {
      id: "integrations",
      name: "Integrations",
      description: "Third-party payment provider integrations and webhooks",
      colour: "#3b82f6",
      members: ["Sam", "Kai"],
      notes: []
    },
    {
      id: "new-initiative",
      name: "New Initiative",
      description: "New payment methods MVP — buy now, pay later",
      colour: "#f59e0b",
      members: ["Marcus", "Elena"],
      notes: []
    }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  EVIDENCE                                                │
  // │                                                          │
  // │  Categories: coaching | architecture | standards          │
  // │              risk | delivery | cross-team | foundational  │
  // └──────────────────────────────────────────────────────────┘

  evidence: [
    { date: "2026-04-03", category: "risk", who: "Taylor (PM)", summary: "Surfaced payment retry fragility risk to PM", detail: "Identified that the retry logic has no circuit breaker and could cascade during peak. PM was unaware. Led to prioritisation discussion." },
    { date: "2026-04-07", category: "delivery", who: "Team", summary: "Captured 3 critical service runbooks from departing engineer", detail: "Scheduled knowledge transfer sessions before engineer left. Documented deployment procedures, known issues, and monitoring gaps. Shared on Confluence." },
    { date: "2026-04-09", category: "coaching", who: "Jordan", summary: "Encouraged Jordan to own cache redesign proposal", detail: "Jordan wanted more ownership. Instead of designing the cache solution myself, asked them to draft a proposal. Will review and coach through it." },
    { date: "2026-04-10", category: "architecture", who: "Marcus", summary: "Brought implementation perspective to event sourcing design", detail: "Reviewed Marcus's event sourcing KDD. Asked questions about replay performance at scale. He hadn't considered the operational cost — we agreed to add a retention policy." }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  IMPULSE LOG                                             │
  // │                                                          │
  // │  result: "delegated" | "coached" | "slipped"             │
  // └──────────────────────────────────────────────────────────┘

  impulses: [
    { date: "2026-04-03", trigger: "Saw messy retry logic in payments service", urge: "Refactor it myself — I could clean this up in an afternoon", action: "Wrote it up as a tech debt item. Will use it as a coaching opportunity for Jordan.", result: "delegated" },
    { date: "2026-04-07", trigger: "Departing engineer's code had no tests", urge: "Write the tests myself before they leave", action: "Documented what needs testing. Added it to the backlog for the team to prioritise.", result: "delegated" },
    { date: "2026-04-10", trigger: "Deployment pipeline had manual steps", urge: "Automate it over the weekend", action: "Wrote up the problem and potential solution. Will propose it to the team for them to own.", result: "coached" },
    { date: "2026-04-08", trigger: "Production alert during standup", urge: "Jump on the laptop and debug immediately", action: "Asked who's on-call. Guided them to check the dashboards first. They found the issue.", result: "coached" },
    { date: "2026-04-11", trigger: "PR review — code was below my quality bar", urge: "Leave a massive review rewriting half the PR", action: "Left 2 focused comments on the core issues. Explained the principle, let them revise.", result: "coached" }
  ],

  // ┌──────────────────────────────────────────────────────────┐
  // │  PAUSE FRAMEWORK                                         │
  // │                                                          │
  // │  The impulse catcher. Customise the prompts if you like. │
  // └──────────────────────────────────────────────────────────┘

  pause: {
    steps: [
      { letter: "P", title: "Problem", prompt: "Is this truly urgent? Or does it FEEL urgent because I want to solve it?" },
      { letter: "A", title: "Available", prompt: "Who else can handle this — even if slower? Is this a growth opportunity for someone?" },
      { letter: "U", title: "Upside", prompt: "If I step back: team gets stronger, I'm freed up. If I jump in: done fast, but nobody learns." },
      { letter: "S", title: "Standard-Setting?", prompt: "Am I setting a new pattern (acceptable) or retreating to my comfort zone? Remember the Rule of Three." },
      { letter: "E", title: "Evidence", prompt: "At EOY: 'I fixed 50 bugs' = Senior. 'I coached 3 engineers who fix bugs independently' = Staff." }
    ],
    emergencyOverride: "Do it yourself ONLY when ALL THREE are true: (1) Time-critical — real business impact in hours, not days. (2) No alternative — nobody else can, even with guidance. (3) You document and transfer — write it up, teach the team, ensure it doesn't happen again."
  }
};

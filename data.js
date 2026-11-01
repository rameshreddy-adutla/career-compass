// Fictional career-progression demo. No employer or real-person records.
// Reference IDs are retained for saved-data compatibility.
const CAREER_DATA = {
  "config": {
    "name": "Demo Learner",
    "role": "Early-career professional",
    "area": "Fictional practice project",
    "startDate": "2026-11-01",
    "phases": [
      {
        "id": 1,
        "name": "Explore & Plan",
        "theme": "Choose a capability and understand the starting point",
        "start": "2026-11-01",
        "end": "2026-11-30"
      },
      {
        "id": 2,
        "name": "Practise & Apply",
        "theme": "Apply learning through small, checkable activities",
        "start": "2026-12-01",
        "end": "2026-12-31"
      },
      {
        "id": 3,
        "name": "Reflect & Adjust",
        "theme": "Review evidence and choose the next development cycle",
        "start": "2027-01-01",
        "end": "2027-01-31"
      }
    ]
  },
  "todos": [
    {
      "id": "knowledge-transfer",
      "title": "Choose one development goal",
      "description": "Describe a capability you want to practise and why it matters.",
      "phase": 1,
      "priority": "high",
      "status": "done",
      "week": 1
    },
    {
      "id": "meet-pm",
      "title": "Record your starting point",
      "description": "Write one example of what you can do and one open question.",
      "phase": 1,
      "priority": "medium",
      "status": "in-progress",
      "week": 1
    },
    {
      "id": "meet-architect",
      "title": "Choose a small practice task",
      "description": "Use fictional examples and define how you will check the result.",
      "phase": 1,
      "priority": "medium",
      "status": "pending",
      "week": 2
    },
    {
      "id": "meet-senior-eng",
      "title": "Arrange a feedback session",
      "description": "Ask a mentor or practice partner for feedback on a specific artifact.",
      "phase": 1,
      "priority": "medium",
      "status": "pending",
      "week": 3
    },
    {
      "id": "codebase-deepdive",
      "title": "Apply the learning",
      "description": "Complete a small exercise and keep the result with your explanation.",
      "phase": 2,
      "priority": "high",
      "status": "pending",
      "week": 5
    },
    {
      "id": "contact-platform",
      "title": "Explain a tradeoff",
      "description": "Compare two approaches and state their limitations.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 6
    },
    {
      "id": "test-baseline",
      "title": "Support a peer exercise",
      "description": "Ask useful questions and let the other person own their solution.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 7
    },
    {
      "id": "security-review",
      "title": "Review your evidence",
      "description": "Separate observed results, interpretations and future plans.",
      "phase": 3,
      "priority": "high",
      "status": "pending",
      "week": 10
    },
    {
      "id": "stabilisation-plan",
      "title": "Reflect on the development cycle",
      "description": "Describe what improved and what still needs practice.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 11
    },
    {
      "id": "30-day-checkpoint",
      "title": "Plan the next cycle",
      "description": "Choose the next goal based on evidence and available time.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 12
    },
    {
      "id": "coach-senior",
      "title": "Review a worked example",
      "description": "Write down why the example behaves as it does.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 5
    },
    {
      "id": "onboard-returning",
      "title": "Compare two approaches",
      "description": "List a useful tradeoff and an unanswered question.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 6
    },
    {
      "id": "test-improvement",
      "title": "Practise a short explanation",
      "description": "Explain one concept using a fictional scenario.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 7
    },
    {
      "id": "engineering-standards",
      "title": "Ask for specific feedback",
      "description": "Share an exercise result and one question.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 8
    },
    {
      "id": "cross-team-deps",
      "title": "Revise a practice artifact",
      "description": "Use feedback to improve your explanation.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 9
    },
    {
      "id": "60-day-checkpoint",
      "title": "Summarise a learning session",
      "description": "Record the activity, result and next step.",
      "phase": 2,
      "priority": "medium",
      "status": "pending",
      "week": 10
    },
    {
      "id": "team-stable",
      "title": "Check a planned outcome",
      "description": "Compare your original goal with observed practice.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 11
    },
    {
      "id": "architecture-validated",
      "title": "Identify a remaining gap",
      "description": "Choose one capability that needs more practice.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 12
    },
    {
      "id": "standards-adopted",
      "title": "Review the time budget",
      "description": "Adjust the next cycle to fit the time available.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 13
    },
    {
      "id": "90-day-checkpoint",
      "title": "Choose a follow-up exercise",
      "description": "Define an observable result for your next activity.",
      "phase": 3,
      "priority": "medium",
      "status": "pending",
      "week": 14
    }
  ],
  "stakeholders": [
    {
      "id": "learning-partner",
      "name": "Practice Partner (fictional)",
      "role": "Practice Partner",
      "squad": "Demo Project",
      "ring": "peer",
      "engagement": "Review a small practice task together.",
      "goal": "Exchange useful feedback without taking over the work."
    },
    {
      "id": "mentor",
      "name": "Technical Mentor (fictional)",
      "role": "Mentor",
      "squad": "Learning Group",
      "ring": "leadership",
      "engagement": "Discuss one development goal and its evidence at each review.",
      "goal": "Agree on a next step based on examples, not a readiness score."
    },
    {
      "id": "practice-colleague",
      "name": "New Learner (fictional)",
      "role": "Learner",
      "squad": "Demo Project",
      "ring": "coach",
      "engagement": "Practise explaining a concept and ask what was unclear.",
      "goal": "Let the learner solve the follow-up independently."
    }
  ],
  "weekly": [
    {
      "week": "2026-W44",
      "dates": "1 Nov 2026 (fictional example)",
      "phase": 1,
      "priorities": [
        "Choose one development goal",
        "Complete a small practice task"
      ],
      "days": {
        "sunday": "Worked through a fictional project-planning example and recorded open questions."
      },
      "reflection": {
        "impact": "Practised explaining a project goal, a constraint and the next useful step.",
        "coaching": "Asked a practice partner to explain the idea back.",
        "relationships": "Agreed on a short feedback session with the fictional mentor.",
        "selfAwareness": "Noticed an urge to rewrite the example before defining the learning goal."
      }
    }
  ],
  "squads": [
    {
      "id": "core-platform",
      "name": "Demo Project",
      "description": "Fictional document organiser used for learning exercises",
      "colour": "#8b5cf6",
      "members": [
        "Practice Partner (fictional)",
        "New Learner (fictional)"
      ],
      "notes": []
    },
    {
      "id": "integrations",
      "name": "Learning Group",
      "description": "Fictional peer practice and mentoring group",
      "colour": "#3b82f6",
      "members": [
        "Technical Mentor (fictional)"
      ],
      "notes": []
    },
    {
      "id": "new-initiative",
      "name": "Practice Lab",
      "description": "Fictional exercises and examples",
      "colour": "#f59e0b",
      "members": [],
      "notes": []
    }
  ],
  "evidence": [
    {
      "date": "2026-11-01",
      "category": "delivery",
      "who": "Practice Partner (fictional)",
      "summary": "Explained a planning tradeoff in a practice exercise",
      "detail": "Fictional example: compared two ways to organise a short practice project. This is practice evidence, not a workplace achievement."
    }
  ],
  "impulses": [
    {
      "date": "2026-11-01",
      "trigger": "Wanted to take over a fictional peer exercise",
      "urge": "Write the whole solution immediately",
      "action": "Asked which approaches the practice partner had considered, then reviewed their explanation.",
      "result": "coached"
    }
  ],
  "pause": {
    "steps": [
      {
        "letter": "P",
        "title": "Purpose",
        "prompt": "What outcome are you trying to achieve?"
      },
      {
        "letter": "A",
        "title": "Alternatives",
        "prompt": "Which approaches have you considered, and who could help?"
      },
      {
        "letter": "U",
        "title": "Understand",
        "prompt": "What do you know, and what still needs checking?"
      },
      {
        "letter": "S",
        "title": "Small step",
        "prompt": "Choose a useful next step that fits your scope and time."
      },
      {
        "letter": "E",
        "title": "Evidence",
        "prompt": "Record what happened, your contribution and what you learned."
      }
    ],
    "emergencyOverride": "For urgent work, agree on ownership and communicate the risk. Afterward, record the outcome and arrange any useful knowledge transfer."
  }
};

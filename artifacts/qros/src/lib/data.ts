export interface Finding {
  insight: string;
  action: string;
}

export interface Indicator {
  name: string;
  score: number;
  benchmarkDelta: number;
}

export interface CategoryDetail {
  id: string;
  name: string;
  score: number;
  benchmarkDelta: number;
  maturityLevel: string;
  benchmarkSummary: string;
  history: number[];
  historyBenchmark: number;
  trendLabel: string;
  trendDelta: string;
  responseCount: number;
  indicators: Indicator[];
  findings: Finding[];
  pathToNextLevel: {
    from: number;
    to: number;
    description: string;
  };
}

export const dimensionDetails: Record<string, CategoryDetail> = {
  data: {
    id: "data",
    name: "Data",
    score: 58,
    benchmarkDelta: -14,
    maturityLevel: "Developing — Level 2",
    benchmarkSummary: "Below peer average",
    history: [50, 53, 56, 58],
    historyBenchmark: 70,
    trendLabel: "Improving",
    trendDelta: "+5 pts over last 2 periods",
    responseCount: 26,
    indicators: [
      { name: "Data Quality", score: 55, benchmarkDelta: -18 },
      { name: "Data Governance", score: 60, benchmarkDelta: -12 },
      { name: "Reporting Reliability", score: 62, benchmarkDelta: -8 },
      { name: "Data Availability", score: 58, benchmarkDelta: -14 },
    ],
    findings: [
      {
        insight: "Data quality issues are often identified after analysis rather than proactively",
        action: "Implement automated data quality validation and monitoring",
      },
      {
        insight: "Data ownership and accountability are inconsistently defined across domains",
        action: "Assign clear data ownership and stewardship roles",
      },
      {
        insight: "Reporting and data pipelines lack consistency across systems",
        action: "Standardize reporting pipelines and enforce version control",
      },
    ],
    pathToNextLevel: {
      from: 2,
      to: 3,
      description: "Proactive data quality monitoring and defined ownership across all domains",
    },
  },

  technology: {
    id: "technology",
    name: "Technology",
    score: 62,
    benchmarkDelta: -10,
    maturityLevel: "Developing — Level 2",
    benchmarkSummary: "Below peer average",
    history: [56, 58, 60, 62],
    historyBenchmark: 70,
    trendLabel: "Improving",
    trendDelta: "+4 pts over last 2 periods",
    responseCount: 28,
    indicators: [
      { name: "System Integration", score: 58, benchmarkDelta: -14 },
      { name: "Observability", score: 55, benchmarkDelta: -16 },
      { name: "Data Pipelines", score: 65, benchmarkDelta: -6 },
      { name: "Platform Architecture", score: 62, benchmarkDelta: -9 },
    ],
    findings: [
      {
        insight: "Systems and data platforms are fragmented across multiple tools",
        action: "Consolidate platforms into a unified data and application architecture",
      },
      {
        insight: "Observability and monitoring are reactive rather than proactive",
        action: "Implement centralized monitoring for pipelines, systems, and models",
      },
      {
        insight: "Integration between systems relies on custom or manual processes",
        action: "Standardize integration using reusable interfaces and automation",
      },
    ],
    pathToNextLevel: {
      from: 2,
      to: 3,
      description: "Unified architecture with proactive monitoring and standardized integrations",
    },
  },

  "people-process": {
    id: "people-process",
    name: "People & Process",
    score: 55,
    benchmarkDelta: -17,
    maturityLevel: "Initiating — Level 1",
    benchmarkSummary: "Significantly below peers",
    history: [48, 51, 53, 55],
    historyBenchmark: 68,
    trendLabel: "Improving",
    trendDelta: "+4 pts over last 2 periods",
    responseCount: 30,
    indicators: [
      { name: "Process Automation", score: 52, benchmarkDelta: -20 },
      { name: "AI Literacy", score: 50, benchmarkDelta: -22 },
      { name: "Adoption", score: 58, benchmarkDelta: -14 },
      { name: "Change Management", score: 60, benchmarkDelta: -10 },
    ],
    findings: [
      {
        insight: "Manual processes remain prevalent despite automation opportunities",
        action: "Automate high-frequency operational and data workflows",
      },
      {
        insight: "AI and data literacy is inconsistent across business teams",
        action: "Implement structured AI and data training programs",
      },
      {
        insight: "Adoption of new tools is not consistently measured or supported",
        action: "Track adoption metrics and provide onboarding support",
      },
    ],
    pathToNextLevel: {
      from: 1,
      to: 2,
      description: "Defined automation roadmap and structured capability development programs",
    },
  },

  "portfolio-governance": {
    id: "portfolio-governance",
    name: "Portfolio Management & Governance",
    score: 65,
    benchmarkDelta: -7,
    maturityLevel: "Scaling — Level 2",
    benchmarkSummary: "Near peer average",
    history: [58, 61, 63, 65],
    historyBenchmark: 70,
    trendLabel: "Improving",
    trendDelta: "+4 pts over last 2 periods",
    responseCount: 24,
    indicators: [
      { name: "Business Case Rigor", score: 62, benchmarkDelta: -10 },
      { name: "Ownership", score: 60, benchmarkDelta: -12 },
      { name: "KPI Tracking", score: 68, benchmarkDelta: -4 },
      { name: "Benefit Realization", score: 58, benchmarkDelta: -14 },
    ],
    findings: [
      {
        insight: "Projects are initiated without clearly defined business outcomes",
        action: "Require business cases with measurable value before approval",
      },
      {
        insight: "Ownership of systems and outcomes is not consistently defined",
        action: "Assign accountable owners for all systems and initiatives",
      },
      {
        insight: "Post-deployment value tracking is inconsistent or absent",
        action: "Implement benefit tracking tied to KPIs and dashboards",
      },
    ],
    pathToNextLevel: {
      from: 2,
      to: 3,
      description: "Rigorous business cases, defined ownership, and active benefit tracking",
    },
  },

  "executive-strategy": {
    id: "executive-strategy",
    name: "Executive Alignment & Strategy",
    score: 61,
    benchmarkDelta: -11,
    maturityLevel: "Developing — Level 2",
    benchmarkSummary: "Below peer average",
    history: [55, 57, 59, 61],
    historyBenchmark: 70,
    trendLabel: "Improving",
    trendDelta: "+4 pts over last 2 periods",
    responseCount: 22,
    indicators: [
      { name: "Strategic Alignment", score: 65, benchmarkDelta: -7 },
      { name: "Executive Sponsorship", score: 62, benchmarkDelta: -10 },
      { name: "Resource Alignment", score: 58, benchmarkDelta: -14 },
      { name: "Cross-Functional Prioritization", score: 55, benchmarkDelta: -17 },
    ],
    findings: [
      {
        insight: "AI and data strategy is not consistently aligned across business units",
        action: "Establish cross-functional planning and prioritization processes",
      },
      {
        insight: "Executive sponsorship is present but not consistently engaged in delivery",
        action: "Increase executive involvement in ongoing program reviews",
      },
      {
        insight: "Resource allocation does not consistently align with strategic priorities",
        action: "Align funding and staffing to strategic AI and data roadmap",
      },
    ],
    pathToNextLevel: {
      from: 2,
      to: 3,
      description: "Cross-functional alignment with executive-led delivery governance",
    },
  },
};

export const dashboardData = {
  company: "ACME",
  score: 61,
  level: 2,
  levelName: "Scaling",
  velocity: "Improving",
  quarterlyChange: 3,
  radarData: [
    { dimension: "Data", current: 58, target: 78, benchmark: 70 },
    { dimension: "Technology", current: 76, target: 72, benchmark: 70 },
    { dimension: "People & Process", current: 55, target: 80, benchmark: 68 },
    { dimension: "Portfolio & Gov.", current: 79, target: 74, benchmark: 70 },
    { dimension: "Exec. Alignment", current: 61, target: 85, benchmark: 72 },
  ],
  benchmarkPositions: [
    { name: "Data", position: "Bottom 30%", trend: "down" },
    { name: "Technology", position: "Top 35%", trend: "up" },
    { name: "People & Process", position: "Bottom 25%", trend: "down" },
    { name: "Portfolio & Gov.", position: "Top 30%", trend: "up" },
  ],
  domains: [
    {
      id: "data",
      name: "Data",
      score: 58,
      benchmarkDelta: -14,
      gap: "Gap: Data quality and ownership",
      impactPotential: "High",
      engagement: "Engaged",
      trend: "down",
      color: "yellow",
    },
    {
      id: "technology",
      name: "Technology",
      score: 62,
      benchmarkDelta: -10,
      gap: "Gap: Integration and observability",
      impactPotential: "High",
      engagement: "Engaged",
      trend: "up",
      color: "yellow",
    },
    {
      id: "people-process",
      name: "People & Process",
      score: 55,
      benchmarkDelta: -17,
      gap: "Gap: Automation and adoption",
      impactPotential: "High",
      engagement: "Opportunity",
      trend: "neutral",
      color: "yellow",
    },
    {
      id: "portfolio-governance",
      name: "Portfolio Management & Governance",
      score: 65,
      benchmarkDelta: -7,
      gap: "Gap: Value tracking and ownership",
      impactPotential: "Medium",
      engagement: "Engaged",
      trend: "up",
      color: "green",
    },
    {
      id: "executive-strategy",
      name: "Executive Alignment & Strategy",
      score: 61,
      benchmarkDelta: -11,
      gap: "Gap: Alignment and prioritization",
      impactPotential: "High",
      engagement: "Engaged",
      trend: "up",
      color: "yellow",
    },
  ],
};

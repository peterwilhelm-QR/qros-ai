import { dashboardData, dimensionDetails } from "./data";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const CATEGORY_ALIASES: Record<string, string> = {
  data: "data",
  "data quality": "data",
  "data governance": "data",
  "data pipelines": "data",
  reporting: "data",
  technology: "technology",
  tech: "technology",
  systems: "technology",
  integration: "technology",
  observability: "technology",
  pipelines: "technology",
  platforms: "technology",
  "people": "people-process",
  "people & process": "people-process",
  "people and process": "people-process",
  process: "people-process",
  automation: "people-process",
  literacy: "people-process",
  adoption: "people-process",
  training: "people-process",
  workforce: "people-process",
  portfolio: "portfolio-governance",
  governance: "portfolio-governance",
  "portfolio management": "portfolio-governance",
  "portfolio governance": "portfolio-governance",
  "business case": "portfolio-governance",
  ownership: "portfolio-governance",
  kpi: "portfolio-governance",
  "benefit realization": "portfolio-governance",
  strategy: "executive-strategy",
  executive: "executive-strategy",
  alignment: "executive-strategy",
  "executive alignment": "executive-strategy",
  "exec alignment": "executive-strategy",
  sponsorship: "executive-strategy",
  prioritization: "executive-strategy",
};

function findCategory(msg: string): string | null {
  const lower = msg.toLowerCase();
  for (const [alias, id] of Object.entries(CATEGORY_ALIASES)) {
    if (lower.includes(alias)) return id;
  }
  return null;
}

function lowestCategory() {
  return dashboardData.domains.reduce((a, b) => (a.score < b.score ? a : b));
}

function highestCategory() {
  return dashboardData.domains.reduce((a, b) => (a.score > b.score ? a : b));
}

function topGaps() {
  return [...dashboardData.domains].sort((a, b) => a.score - b.score).slice(0, 3);
}

export function getChatResponse(input: string): string {
  const msg = input.toLowerCase().trim();

  if (!msg) return "What would you like to know about the transformation?";

  if (/^(hi|hello|hey|yo|sup)\b/.test(msg)) {
    return `Hello! I'm QROS AI. ACME is currently at **Level 2 (Scaling)** with an overall score of **${dashboardData.score}/100** across 5 survey-aligned categories. Ask me about any category, peer benchmarks, recommended actions, or what-if scenarios. Try: "Where are we weakest?" or "Tell me about People & Process."`;
  }

  if (/\b(overall|total|score|level|maturity)\b/.test(msg) && !/category|domain/.test(msg)) {
    return `ACME's overall QROS score is **${dashboardData.score}/100**, at **Level ${dashboardData.level} (${dashboardData.levelName})**. Velocity is **${dashboardData.velocity}** with a quarterly change of **+${dashboardData.quarterlyChange} pts**.\n\nStrongest: **${highestCategory().name}** (${highestCategory().score})\nLowest: **${lowestCategory().name}** (${lowestCategory().score})`;
  }

  if (/\b(benchmark|peer|peers|industry|compare|comparison)\b/.test(msg)) {
    const lines = dashboardData.benchmarkPositions.map((p) => `• ${p.name}: **${p.position}**`).join("\n");
    return `ACME vs industry peers:\n\n${lines}\n\nPeople & Process has the largest peer distance and represents the highest-priority investment area.`;
  }

  if (/\b(weakest|lowest|worst|gap|lagging|behind)\b/.test(msg) && !findCategory(msg)) {
    const bottom = topGaps();
    const lines = bottom.map((d) => `• **${d.name}** — Score: ${d.score}\n  ${d.gap}`).join("\n");
    return `Lowest-performing categories:\n\n${lines}\n\nPeople & Process presents the most critical gap versus peers and should be the primary investment focus.`;
  }

  if (/\b(strongest|highest|best|leading|strength)\b/.test(msg) && !findCategory(msg)) {
    const top = [...dashboardData.domains].sort((a, b) => b.score - a.score).slice(0, 3);
    const lines = top.map((d) => `• **${d.name}** — Score: ${d.score}`).join("\n");
    return `Strongest categories:\n\n${lines}\n\nPortfolio Management & Governance is the best-performing area — maintain momentum while closing gaps elsewhere.`;
  }

  if (/\b(recommend|action|priority|priorities|what should|next step|focus)\b/.test(msg)) {
    const highImpact = dashboardData.domains
      .filter((d) => d.impactPotential === "High")
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
    const lines = highImpact.map((d) => {
      const detail = dimensionDetails[d.id];
      return `• **${d.name}** (${d.score}): ${detail?.findings[0]?.action}`;
    }).join("\n");
    return `Top priority actions by impact potential and peer gap:\n\n${lines}\n\nPeople & Process and Data offer the highest ROI given current peer distance.`;
  }

  if (/\b(what if|improve|impact|increase|raise|boost|invest)\b/.test(msg)) {
    const catId = findCategory(msg);
    if (catId) {
      const detail = dimensionDetails[catId];
      const domain = dashboardData.domains.find((d) => d.id === catId);
      if (detail && domain) {
        const newScore = Math.min(domain.score + 15, 100);
        const scoreDelta = newScore - domain.score;
        const projected = Math.round((dashboardData.score * 5 + scoreDelta) / 5 * 10) / 10;
        return `If ACME improves **${detail.name}** by ~15 points (from ${domain.score} to ~${newScore}), the projected overall QROS score moves from **${dashboardData.score}** to approximately **${projected}**.\n\nPriority action: **${detail.findings[0]?.action}**\n\nUse the Impact Simulator on the dashboard to model specific improvement targets.`;
      }
    }
    return `Use the **Impact Simulator** on the Executive View to model score improvements for any category. Which area are you thinking about? (e.g., "What if we improve People & Process?")`;
  }

  const catId = findCategory(msg);
  if (catId) {
    const detail = dimensionDetails[catId];
    const deltaText = detail.benchmarkDelta > 0
      ? `+${detail.benchmarkDelta}% above peers`
      : `${detail.benchmarkDelta}% below peers`;
    return `**${detail.name}** — Score: **${detail.score}/100**\nLevel: ${detail.maturityLevel} | Benchmark: ${deltaText}\n\nKey finding: ${detail.findings[0]?.insight}\n\nPriority action: **${detail.findings[0]?.action}**`;
  }

  return `I can help you explore ACME's 5-category transformation data. Try:\n\n• "What's our overall score?"\n• "Where are we weakest?"\n• "What should we prioritize?"\n• "How do we compare to peers?"\n• "What if we improve People & Process?"\n• "Tell me about Portfolio Management & Governance"`;
}

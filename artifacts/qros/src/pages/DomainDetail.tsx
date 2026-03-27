import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  ChevronRight,
  Clock,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { dashboardData, dimensionDetails } from "@/lib/data";
import { cn, getScoreBg } from "@/lib/utils";
import { ImpactSimulator } from "@/components/ui/ImpactSimulator";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1e] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <span className="text-muted-foreground mr-2">{label}</span>
      <span className="font-bold text-white">{payload[0].value}</span>
    </div>
  );
}

export default function DomainDetail() {
  const { id } = useParams<{ id: string }>();

  const domainId = id ?? "data";
  const detail = dimensionDetails[domainId] ?? dimensionDetails["data"];
  const _domainInfo =
    dashboardData.domains.find((d) => d.id === domainId) ??
    dashboardData.domains[0];

  const historyData = detail.history.map((val, i) => ({
    quarter: QUARTERS[i],
    score: val,
  }));

  const minScore = Math.min(...detail.history);
  const maxScore = Math.max(...detail.history);
  const yMin = Math.max(0, Math.floor((minScore - 8) / 5) * 5);
  const yMax = Math.min(100, Math.ceil((maxScore + 8) / 5) * 5);

  const trendColor =
    detail.trendLabel === "Improving"
      ? "#22C55E"
      : detail.trendLabel === "Declining"
      ? "#EF4444"
      : "#9CA3AF";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-5 max-w-5xl mx-auto"
    >
      {/* ── HEADER ── */}
      <motion.div variants={itemVariants}>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          {detail.name} Optimization
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary font-medium">{detail.maturityLevel}</span>
          <span className="text-muted-foreground/40">•</span>
          <span style={{ color: detail.benchmarkDelta < 0 ? "#EF4444" : "#22C55E" }}>
            {detail.benchmarkSummary} ({detail.benchmarkDelta > 0 ? "+" : ""}{detail.benchmarkDelta}%)
          </span>
        </div>
      </motion.div>

      {/* ── MAIN GRID: 60 / 40 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">

        {/* ── LEFT COL (60%) ── */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Timeline */}
          <motion.div variants={itemVariants} className="qros-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Maturity Over Time
              </h2>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[11px] text-muted-foreground/60">
                  Benchmark: {detail.historyBenchmark}
                </span>
                <span className="text-xs font-medium" style={{ color: trendColor }}>
                  {detail.trendDelta}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: trendColor }}
                >
                  Trend: {detail.trendLabel}
                </span>
              </div>
            </div>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyData}
                  margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
                >
                  <XAxis
                    dataKey="quarter"
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[yMin, yMax]}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ReferenceLine
                    y={detail.historyBenchmark}
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#FF6A2A"
                    strokeWidth={2}
                    dot={{ fill: "#FF6A2A", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#FF7F45", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Key Indicators — reduced height */}
          <motion.div variants={itemVariants} className="qros-card p-5">
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Key Indicators
            </h2>
            <div className="space-y-3">
              {detail.indicators.map((indicator, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-white/90">
                      {indicator.name}
                    </span>
                    <span className="text-sm font-bold">{indicator.score}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${indicator.score}%` }}
                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                        delay: 0.15 + idx * 0.08,
                      }}
                      className={cn("h-full rounded-full", getScoreBg(indicator.score))}
                    />
                  </div>
                  <div className="text-[11px] text-right">
                    <span
                      style={{
                        color: indicator.benchmarkDelta < 0 ? "#EF4444cc" : "#22C55Ecc",
                      }}
                    >
                      {indicator.benchmarkDelta > 0 ? "+" : ""}
                      {indicator.benchmarkDelta}% vs peers
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── RIGHT COL (40%) ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Key Findings & Actions */}
          <motion.div
            variants={itemVariants}
            className="qros-card p-5"
            style={{ background: "linear-gradient(135deg, #111113 0%, rgba(255,106,42,0.04) 100%)" }}
          >
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2 text-primary">
              <Target className="w-4 h-4" />
              Key Findings &amp; Actions
            </h2>

            <div className="space-y-4">
              {detail.findings.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "space-y-1.5",
                    i === 0 &&
                      "rounded-lg border border-primary/25 bg-primary/5 p-3 shadow-[0_0_12px_rgba(255,106,42,0.07)]"
                  )}
                >
                  {i === 0 && (
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded mb-1">
                      Priority
                    </span>
                  )}
                  <p className="text-sm text-white/85 leading-snug">{item.insight}</p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "#FF6A2A" }}>
                    → {item.action}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Path to Next Level */}
          <motion.div
            variants={itemVariants}
            className="qros-card p-4 border border-white/10 bg-white/[0.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Path to Next Level
              </span>
              <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                L{detail.pathToNextLevel.from}
                <ChevronRight className="w-3 h-3 mx-0.5" />
                L{detail.pathToNextLevel.to}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              {detail.pathToNextLevel.description}
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── IMPACT SIMULATOR ── */}
      <motion.div variants={itemVariants}>
        <ImpactSimulator defaultId={domainId} locked />
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.div variants={itemVariants} className="pt-4 pb-2 text-center">
        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
          Based on {detail.responseCount} survey responses and peer benchmarks
        </span>
      </motion.div>
    </motion.div>
  );
}

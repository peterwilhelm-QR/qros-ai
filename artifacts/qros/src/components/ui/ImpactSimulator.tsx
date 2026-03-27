import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sliders, TrendingUp, ArrowRight } from "lucide-react";
import { dashboardData, dimensionDetails } from "@/lib/data";

const DOMAIN_OPTIONS = dashboardData.domains.map((d) => ({
  id: d.id,
  name: d.name,
  score: d.score,
}));

const OVERALL = dashboardData.score;
const NUM_DIMENSIONS = dashboardData.domains.length;

export function ImpactSimulator({ defaultId, locked }: { defaultId?: string; locked?: boolean }) {
  const [selectedId, setSelectedId] = useState(defaultId ?? DOMAIN_OPTIONS[0].id);
  const [improvement, setImprovement] = useState(15);

  const domain = DOMAIN_OPTIONS.find((d) => d.id === selectedId)!;
  const detail = dimensionDetails[selectedId];

  const result = useMemo(() => {
    const currentTotal = OVERALL * NUM_DIMENSIONS;
    const newDimScore = Math.min(100, domain.score + improvement);
    const scoreDelta = newDimScore - domain.score;
    const projectedOverall = Math.round((currentTotal + scoreDelta) / NUM_DIMENSIONS * 10) / 10;
    const overallDelta = Math.round((projectedOverall - OVERALL) * 10) / 10;
    const benchmarkDelta = detail?.benchmarkDelta ?? 0;
    const newBenchmarkDelta = Math.round((benchmarkDelta + improvement) * 10) / 10;
    return { projectedOverall, overallDelta, newDimScore, newBenchmarkDelta };
  }, [selectedId, improvement, domain.score, detail]);

  const impactLevel =
    result.overallDelta >= 3 ? "High" : result.overallDelta >= 1.5 ? "Medium" : "Low";
  const impactColor =
    impactLevel === "High" ? "#22C55E" : impactLevel === "Medium" ? "#FBBF24" : "#9CA3AF";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="qros-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-4 h-4 text-primary" />
        <h2 className="text-base font-semibold text-white">Impact Simulator</h2>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground bg-white/5 px-2 py-0.5 rounded">
          What-If
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Controls */}
        <div className="space-y-4">
          {!locked && (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1.5">
                Select Dimension
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                {DOMAIN_OPTIONS.map((d) => (
                  <option key={d.id} value={d.id} style={{ background: "#111113" }}>
                    {d.name} (Score: {d.score})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Improvement Target
              </label>
              <span className="text-sm font-bold text-primary">+{improvement} pts</span>
            </div>
            <input
              type="range"
              min={5}
              max={Math.min(40, 100 - domain.score)}
              step={5}
              value={improvement}
              onChange={(e) => setImprovement(Number(e.target.value))}
              className="w-full accent-primary h-1.5 rounded-full bg-white/10 outline-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
              <span>+5</span>
              <span>+{Math.min(40, 100 - domain.score)}</span>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground/70 leading-relaxed border-t border-white/5 pt-3">
            Priority action: <span className="text-white/80">{detail?.findings[0]?.action}</span>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{domain.name} Score</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="text-white/60">{domain.score}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white">{result.newDimScore}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall QROS Score</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="text-white/60">{OVERALL}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white">{result.projectedOverall}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Benchmark Delta</span>
              <span
                className="font-semibold"
                style={{ color: result.newBenchmarkDelta >= 0 ? "#22C55E" : "#EF4444" }}
              >
                {result.newBenchmarkDelta > 0 ? "+" : ""}
                {result.newBenchmarkDelta}% vs peers
              </span>
            </div>
          </div>

          {/* Impact badge */}
          <div className="mt-4 rounded-xl border p-3 flex items-center justify-between" style={{ borderColor: `${impactColor}33`, background: `${impactColor}08` }}>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                Overall Impact
              </div>
              <div className="text-lg font-bold" style={{ color: impactColor }}>
                +{result.overallDelta} pts
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div
                className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                style={{ color: impactColor, background: `${impactColor}20` }}
              >
                {impactLevel} Impact
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                {result.overallDelta >= 3
                  ? "Strong ROI candidate"
                  : result.overallDelta >= 1.5
                  ? "Moderate ROI"
                  : "Incremental gain"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

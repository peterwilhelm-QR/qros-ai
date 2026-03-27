import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, Activity, Target } from "lucide-react";
import { Link, useLocation } from "wouter";
import { dashboardData } from "@/lib/data";
import { cn, getScoreColor } from "@/lib/utils";
import { ImpactSimulator } from "@/components/ui/ImpactSimulator";

const dimensionToId: Record<string, string> = {
  "Data": "data",
  "Technology": "technology",
  "People & Process": "people-process",
  "Portfolio & Gov.": "portfolio-governance",
  "Exec. Alignment": "executive-strategy",
};

interface CustomTickProps {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  payload?: { value: string };
}

function CustomRadarTick({ x = 0, y = 0, cx = 0, cy = 0, payload }: CustomTickProps) {
  const [, navigate] = useLocation();
  const label = payload?.value ?? "";
  const id = dimensionToId[label];

  const dx = x - cx;
  const dy = y - cy;
  const anchor = Math.abs(dx) < 8 ? "middle" : dx > 0 ? "start" : "end";
  const offsetX = Math.abs(dx) < 8 ? 0 : dx > 0 ? 4 : -4;
  const offsetY = dy < 0 ? -4 : 4;

  return (
    <text
      x={x + offsetX}
      y={y + offsetY}
      textAnchor={anchor}
      dominantBaseline="middle"
      fontSize={11}
      fill="rgba(255,255,255,0.6)"
      style={{ cursor: id ? "pointer" : "default", transition: "fill 0.15s" }}
      onClick={() => id && navigate(`/domain/${id}`)}
      onMouseEnter={(e) => { (e.target as SVGTextElement).setAttribute("fill", "#FF6A2A"); }}
      onMouseLeave={(e) => { (e.target as SVGTextElement).setAttribute("fill", "rgba(255,255,255,0.6)"); }}
    >
      {label}
    </text>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <motion.div variants={itemVariants} className="qros-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{dashboardData.company}</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">QROS Level:</span>
            <span className="font-semibold text-primary">Level {dashboardData.level} ({dashboardData.levelName})</span>
          </div>
        </div>
        
        <div className="flex gap-8 items-center">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{dashboardData.score} <span className="text-sm font-normal text-muted-foreground">/ 100</span></span>
              <span className="text-success text-sm font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {dashboardData.quarterlyChange > 0 ? '+' : ''}{dashboardData.quarterlyChange} QoQ
              </span>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Velocity</span>
            <span className="text-success font-medium flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              {dashboardData.velocity}
            </span>
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col w-64">
          <span className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Maturity Path</span>
          <div className="flex gap-1 h-2 w-full">
            {[1, 2, 3, 4].map((l) => (
              <div 
                key={l} 
                className={cn(
                  "flex-1 rounded-sm",
                  l < dashboardData.level ? "bg-primary/40" : 
                  l === dashboardData.level ? "bg-primary shadow-[0_0_10px_rgba(255,106,42,0.4)]" : "bg-white/10"
                )}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 px-1">
            {[1, 2, 3, 4].map((l) => (
              <span key={l} className={cn("text-[10px] font-mono", l === dashboardData.level ? "text-primary" : "text-muted-foreground")}>L{l}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div variants={itemVariants} className="qros-card p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Transformation Radar
            </h2>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div> Current</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div> Target</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div> Benchmark</div>
            </div>
          </div>
          <div className="flex-1 min-h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dashboardData.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={<CustomRadarTick />} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(240 3% 7%)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Radar name="Current" dataKey="current" stroke="#EF4444" strokeWidth={2} fill="transparent" />
                <Radar name="Target" dataKey="target" stroke="#22C55E" strokeWidth={2} fill="transparent" strokeDasharray="3 3" />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#3B82F6" strokeWidth={2} fill="transparent" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Benchmark Position */}
        <motion.div variants={itemVariants} className="qros-card p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Benchmark Position</h2>
          <div className="space-y-4 flex-1">
            {dashboardData.benchmarkPositions.map((pos, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-sm font-medium">{pos.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{pos.position}</span>
                  {pos.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-success" />}
                  {pos.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-destructive" />}
                  {pos.trend === 'neutral' && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Domain Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        <ImpactSimulator />

        <h2 className="text-lg font-semibold px-1">Transformation Domains</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dashboardData.domains.map((domain) => (
            <Link key={domain.id} href={`/domain/${domain.id}`}>
              <motion.div 
                variants={itemVariants} 
                className="qros-card qros-glow-hover p-4 cursor-pointer flex flex-col h-full group relative overflow-hidden"
              >
                {/* Subtle gradient flash on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="font-semibold text-white/90">{domain.name}</span>
                  {domain.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-success" />}
                  {domain.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-destructive" />}
                  {domain.trend === 'neutral' && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
                
                <div className="mt-auto relative z-10">
                  <div className={cn("text-3xl font-bold mb-1", getScoreColor(domain.score))}>
                    {domain.score}
                  </div>
                  <div className="text-[11px] text-muted-foreground/70 mb-2">{domain.gap}</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Impact</span>
                      <span className={cn(
                        "text-[11px] px-1.5 py-0.5 rounded-sm font-medium",
                        domain.impactPotential === 'High' ? "bg-white/10 text-white" : "bg-white/5 text-muted-foreground"
                      )}>
                        {domain.impactPotential}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Engagement</span>
                      <span className={cn(
                        "text-[11px] px-1.5 py-0.5 rounded-sm font-medium",
                        domain.engagement === 'Engaged' ? "bg-primary/20 text-primary border border-primary/20" : 
                        domain.engagement === 'Opportunity' ? "bg-warning/10 text-warning border border-warning/20" :
                        "bg-white/5 text-muted-foreground border border-white/5"
                      )}>
                        {domain.engagement}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

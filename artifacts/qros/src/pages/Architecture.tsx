import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

interface ArchBlockProps {
  title: string;
  subtitle?: string;
  colorClass: string;
  items?: string[];
  isTop?: boolean;
  isBottom?: boolean;
}

function ArchBlock({ title, subtitle, colorClass, items, isTop, isBottom }: ArchBlockProps) {
  return (
    <motion.div variants={blockVariants} className="w-full flex flex-col items-center">
      <div className={cn(
        "w-full max-w-3xl p-6 rounded-xl border flex flex-col md:flex-row items-center md:items-start gap-4 transition-all duration-300",
        colorClass,
        "shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      )}>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-sm text-white/70 mt-1">{subtitle}</p>}
        </div>
        
        {items && items.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-4 md:mt-0">
            {items.map((item, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded bg-black/40 text-white/90 font-medium border border-white/10">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {!isBottom && (
        <div className="my-3 flex flex-col items-center opacity-60">
          <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent mb-1"></div>
          <ArrowDown className="w-5 h-5 text-white/50" />
        </div>
      )}
    </motion.div>
  );
}

export default function Architecture() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-white mb-3">System Architecture</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The QROS™ platform connects your human workforce with our agentic intelligence engine through a governed, standardized foundation.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
        className="flex flex-col items-center"
      >
        <ArchBlock 
          title="Client Workforce" 
          subtitle="Human-in-the-loop interaction & oversight"
          colorClass="bg-[#0f172a] border-[#1e293b]" // Slate/Blue dark
          items={["Executives", "Managers", "Operators"]}
          isTop={true}
        />
        
        <ArchBlock 
          title="Governance & Control" 
          subtitle="Policy, security, and access management"
          colorClass="bg-[#1e1b4b] border-[#312e81]" // Indigo/Purple dark
          items={["RBAC", "Audit Logs", "Policy Engine"]}
        />
        
        <ArchBlock 
          title="Agentic Intelligence Engine" 
          subtitle="Autonomous workflow execution & insights"
          colorClass="bg-[#2a1309] border-[#FF6A2A]/30 relative overflow-hidden" // Primary Orange dark
          items={["LLM Router", "Workflow Agents", "Analytics"]}
        />
        
        <ArchBlock 
          title="QR Foundational Assets" 
          subtitle="Standardized domain knowledge & templates"
          colorClass="bg-[#064e3b] border-[#065f46]" // Emerald/Green dark
          items={["Benchmarks", "Process Maps", "Data Models"]}
        />
        
        <ArchBlock 
          title="Technology Ecosystem" 
          subtitle="Client existing infrastructure & data lakes"
          colorClass="bg-[#111113] border-white/10" // Default dark gray
          items={["ERP", "CRM", "Data Warehouse"]}
          isBottom={true}
        />
      </motion.div>
    </div>
  );
}

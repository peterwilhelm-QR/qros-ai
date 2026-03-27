import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { name: "Executive View", path: "/" },
    { name: "System Architecture", path: "/architecture" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 md:px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col justify-center mr-8">
          <span className="text-primary font-bold text-xl tracking-tight leading-none">QROS™</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-1 hidden sm:block">
            The AI Operating System for Continuous Transformation
          </span>
        </div>
        
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = location === item.path || (location.startsWith("/domain") && item.path === "/");
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "relative py-5 transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="header-active-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

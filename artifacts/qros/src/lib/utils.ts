import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
  if (score >= 65) return "text-success";
  if (score >= 55) return "text-warning";
  return "text-destructive";
}

export function getScoreBg(score: number): string {
  if (score >= 65) return "bg-success";
  if (score >= 55) return "bg-warning";
  return "bg-destructive";
}

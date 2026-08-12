import {
  Activity,
  Award,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  Cloud,
  Database,
  FileText,
  Hammer,
  LockKeyhole,
  Network,
  Palette,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Names referenced from `lib/data.ts` — keep in sync when adding content. */
export const iconMap = {
  Activity,
  Award,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  Cloud,
  Database,
  FileText,
  Hammer,
  LockKeyhole,
  Network,
  Palette,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = iconMap[name as IconName] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}

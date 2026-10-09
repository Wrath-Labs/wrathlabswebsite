import {
  Activity,
  Award,
  Beaker,
  Boxes,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  Clock,
  Cloud,
  Database,
  FileText,
  Globe,
  Hammer,
  LockKeyhole,
  Mail,
  MapPin,
  MessagesSquare,
  Network,
  Palette,
  Phone,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Every icon the content files are allowed to name. An editor picks one by
 * writing its name in a JSON `icon` field, so this map is the allow-list —
 * add an import here and it becomes available to `/content`, and remember to
 * add it to the list at the bottom of `content/README.md` too.
 */
export const iconMap = {
  Activity,
  Award,
  Beaker,
  Boxes,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  Clock,
  Cloud,
  Database,
  FileText,
  Globe,
  Hammer,
  LockKeyhole,
  Mail,
  MapPin,
  MessagesSquare,
  Network,
  Palette,
  Phone,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Users,
  Video,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

/** Falls back to a sparkle rather than crashing on an unknown icon name. */
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

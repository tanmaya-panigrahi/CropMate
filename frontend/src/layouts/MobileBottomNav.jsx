
import { LayoutDashboard, Stethoscope, Clock, Leaf, Bot } from "lucide-react";
import BottomNavItem from "@/components/nav/BottomNavItem";

const mobileNav = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard/overview" },
  { icon: Stethoscope, label: "Diagnose", href: "/dashboard/diagnose" },
  { icon: Clock, label: "History", href: "/dashboard/history" },
  { icon: Leaf, label: "Crops", href: "/dashboard/crops" },
  { icon: Bot, label: "Chatbot", href: "/dashboard/chatbot" },
];

export default function MobileBottomNav({ className = "" }) {
  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50
    bg-[#103713]/90 backdrop-blur-md
    flex justify-between items-center gap-2 px-4 py-2
    rounded-full shadow-xl w-[95%] max-w-md overflow-hidden ${className}`}
    >

      {mobileNav.map((item) => (
        <BottomNavItem
          key={item.href}
          icon={item.icon}
          href={item.href}
          label={item.label} // ✅ pass label
        />
      ))}
    </nav>
  );
}
import { LayoutDashboard, Stethoscope, History, Leaf, Bot, Settings } from "lucide-react";

export const navItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard/overview",
  },
  {
    label: "Diagnose",
    icon: Stethoscope,
    href: "/dashboard/diagnose",
  },
  {
    label: "History",
    icon: History,
    href: "/dashboard/history",
  },
  {
    label: "Crops",
    icon: Leaf,
    href: "/dashboard/crops",
  },
  {
    label: "ChatBot",
    icon: Bot,
    href: "/dashboard/chatbot",
  },
  
];

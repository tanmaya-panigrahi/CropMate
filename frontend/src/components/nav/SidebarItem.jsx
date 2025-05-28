/* eslint-disable no-unused-vars */
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebarStore } from "@/state/useSidebarStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SidebarItem({ label, icon: Icon, href }) {
  const { pathname } = useLocation();
  const { isOpen } = useSidebarStore();
  const isActive = pathname === href;

  const content = (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "group flex items-center px-3 py-2 rounded-md transition-all",
          isOpen ? "gap-4 justify-start" : "justify-center",
          isActive
            ? "bg-[#628B35]/30 text-[#FFFDF5]"
            : "text-[#E2DBD0] hover:bg-[#628B35]/10"
        )
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      {isOpen && <span className="text-sm font-medium truncate">{label}</span>}
    </NavLink>
  );

  return isOpen ? (
    content
  ) : (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-[#103713] text-[#FFFDF5] border-none"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

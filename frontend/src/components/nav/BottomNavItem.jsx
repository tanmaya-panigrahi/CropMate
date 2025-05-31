/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BottomNavItem({ icon: Icon, href, label }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs gap-1 w-[64px] transition-all duration-200",
          isActive
            ? "bg-[#FFFDF5] text-primary shadow-md"
            : "text-[#FFFDF5]/80 hover:text-white"
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="truncate text-center">{label}</span>
    </NavLink>
  );
}


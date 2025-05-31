import { useSidebarStore } from "@/state/useSidebarStore";
import { ChevronLeftSquare } from "lucide-react";
import SidebarItem from "@/components/nav/SidebarItem";
import { navItems } from "@/constants/navItems";

export default function DesktopSidebar() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={` fixed min-h-screen hidden md:flex flex-col transition-all duration-300
    ${isOpen ? "w-64" : "w-20"} 
    bg-[#103713] text-[#FFFDF5] border-r border-muted`}
    >
      {/* Top - Logo + Collapse Button */}
      <div className="flex items-center justify-between p-4">
        <span className="font-bold text-lg tracking-wide">{isOpen ? "CropMate" : "CM"}</span>
        <button
          onClick={toggle}
          className="text-[#FFFDF5] hover:opacity-70 text-xl"
        >
          <ChevronLeftSquare
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

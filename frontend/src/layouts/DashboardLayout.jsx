import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/layouts/DesktopSidebar";
import MobileBottomNav from "@/layouts/MobileBottomNav";
import Topbar from "@/layouts/Topbar";
import { useSidebarStore } from "@/state/useSidebarStore";

export default function DashboardLayout() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Sidebar - hidden on mobile */}
      <DesktopSidebar />

      {/* Main content wrapper - positioned relative to viewport */}
      <div 
        className={`min-h-screen transition-all duration-300 
          md:ml-20 ${isOpen ? "md:ml-64" : "md:ml-20"}`}
      >
        {/* Fixed Topbar that adjusts based on sidebar */}
        <Topbar sidebarOpen={isOpen} />

        {/* Main content area with padding to prevent topbar overlap */}
        <main className="p-4 md:p-6 pt-16 md:pt-20"> 
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav className="md:hidden" />
    </div>
  );
}
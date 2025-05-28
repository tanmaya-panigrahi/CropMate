import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/layouts/DesktopSidebar";
import MobileBottomNav from "@/layouts/MobileBottomNav";
import Topbar from "@/layouts/Topbar";


export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-primary">
      {/* Desktop / Tablet sidebar */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>

      {/* Main wrapper */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* scrollable page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav className="md:hidden" />
    </div>
  );
}

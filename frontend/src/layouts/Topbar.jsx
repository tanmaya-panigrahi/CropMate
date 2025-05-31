import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Topbar({ sidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className={`fixed top-0 right-0  h-16 md:h-14 z-40 flex justify-between items-center px-4 
                       bg-card shadow-sm border-b border-muted transition-all duration-300
                       w-full  ${sidebarOpen ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-5rem)]"}`}>
      {/* Only show title on mobile/tablet where sidebar is hidden */}
      <h1 className="text-xl font-bold">CropMate</h1>
      <div className="md:ml-auto"></div> {/* Spacer for desktop */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer group">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <div className="absolute inset-0 rounded-full border border-muted-foreground pointer-events-none" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 z-50 bg-white border border-gray-200 shadow-md rounded-md"
        >
          <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-gray-700">
            Account
          </DropdownMenuLabel>

          <div className="py-1">
            <DropdownMenuItem
              onClick={() => navigate("/dashboard/profile")}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/dashboard/about")}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              <Info className="h-4 w-4" />
              About
            </DropdownMenuItem>

            <hr className="my-1 border-t border-gray-200" />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 rounded-md"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
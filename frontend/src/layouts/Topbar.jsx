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

export default function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ using context

  return (
    <header className="relative z-50 w-full flex justify-between items-center px-4 py-3 border-b border-muted bg-card shadow-sm">
      <h1 className="text-xl font-semibold tracking-wide">CropMate</h1>

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
              onClick={logout} // ✅ uses context's logout
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

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-lg bg-card border-b sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-primary hover:text-secondary transition-colors duration-300">
          CropMate
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button
            variant="ghost"
            className="text-primary hover:text-secondary hover:bg-background transition-all duration-300"
          >
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            className="bg-primary hover:bg-secondary text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>

  );
};

export default Navbar;

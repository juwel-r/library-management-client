import { ModeToggle } from "@/components/mode-toggle";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 backdrop-blur-sm">

        <div className="flex items-center gap-4">
          <NavLink to="/" className="w-8 h-8">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </NavLink>
          <NavLink to="/all-books" className="px-2 rounded-md text-sm font-medium">
            All Books
          </NavLink>
          <NavLink to="/add-book" className="px-2 rounded-md text-sm font-medium">
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className="px-2 rounded-md text-sm font-medium">
            Borrow Summary
          </NavLink>
        </div>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

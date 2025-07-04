import { ModeToggle } from "@/components/mode-toggle";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navMenu = (
    <>
      <NavLink to="/books" className="px-2 rounded-md text-sm font-medium">
        All Books
      </NavLink>
      <NavLink
        to="/create-book"
        className="px-2 rounded-md text-sm font-medium"
      >
        Add Book
      </NavLink>
      <NavLink
        to="/borrow-summary"
        className="px-2 rounded-md text-sm font-medium"
      >
        Borrow Summary
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-2">
      <div className="relative max-w-6xl mx-auto flex items-center sm:justify-between px-4 py-3 backdrop-blur-md ">
        <div className="sm:hidden">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(!menuOpen)} />
          ) : (
            <Menu onClick={() => setMenuOpen(!menuOpen)} />
          )}
        </div>
        <hr />
        {/* Logo */}
        <div className="mx-auto sm:mx-0 sm:mr-10 flex items-center gap-4">
          <Link to="/" className="flex items-center sm:gap-x-4">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="header-text text-2xl font-semibold text-[#6255E3] mt-2">
              R. Library
            </h1>
          </Link>
        </div>

        {/* Tablet nav menu */}
        <div className="hidden sm:block">{navMenu}</div>

        <div className="sm:ml-auto">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile nabmenu */}
      <div
        onClick={() => {
          setTimeout(() => {
            setMenuOpen(false);
          }, 100);
        }}
        className={cn(
          "sm:hidden absolute grid backdrop-blur p-2 rounded-sm border-2 bg-white/20 transition-all duration-200",
          menuOpen ? " top-13 left-4" : "top-20 -left-55"
        )}
      >
        {navMenu}
      </div>
    </nav>
  );
};

export default Navbar;
{
  /* <button className={cn(
  "px-4 py-2 rounded-md font-medium",
  isActive ? "bg-[#6255E3] text-white" : "bg-gray-200 text-gray-600",
  disabled && "opacity-50 cursor-not-allowed"
)}> */
}

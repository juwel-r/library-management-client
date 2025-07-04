import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="pt-10 pb-6 mt-10 border-t">
      <div className="w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        {/* Logo / Title */}
        <div>
          <Link to="/" className="flex items-center sm:gap-x-4">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="header-text text-2xl font-semibold text-[#6255E3] mt-2">
              R. Library
            </h1>
          </Link>
          <p className="mt-2 text-sm opacity-80">
            Manage books, track borrows, and stay organized with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold sm:mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm opacity-90 text-[#6255E3] space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/books" className="hover:underline">
              All Books
            </Link>
            <Link to="/create-book" className="hover:underline">
              Add Book
            </Link>
            <Link to="/borrow-summary" className="hover:underline">
              Borrow Summary
            </Link>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4 mt-2 text-[#6255E3]">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Bottom */}
      <div className="sm:mt-10 mt-5 border-t border-white/30 pt-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} <span className="header-text font-bold">R. Library</span> . All rights reserved.
      </div>
    </footer>
  );
}

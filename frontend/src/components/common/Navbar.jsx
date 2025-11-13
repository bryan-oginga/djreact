import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install with: npm install lucide-react

function Navbar({ title, setTitle, onSubmit, showSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Latest", path: "/latest" },
    { name: "Favorites", path: "/favorites" },
    { name: "Login", path: "/login" },

  ];    


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            🎬 MovieFlix
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition ${
                    isActive ? "font-semibold text-blue-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Search (Desktop Only) */}
          {showSearch && (
            <form
              onSubmit={onSubmit}
              className="hidden md:flex items-center space-x-2"
            >
              <input
                type="search"
                placeholder="Search movies..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    isActive ? "font-semibold text-blue-600 bg-blue-50" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {showSearch && (
              <form onSubmit={onSubmit} className="mt-2 flex items-center space-x-2">
                <input
                  type="search"
                  placeholder="Search..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Go
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

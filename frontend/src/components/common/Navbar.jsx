import { NavLink } from "react-router-dom";

function Navbar({ title, setTitle, onSubmit, showSearch }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <NavLink to="/" className="text-2xl font-bold text-gray-800">
            🎬 MovieFlix
          </NavLink>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/latest"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Latest
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Favorites
            </NavLink>
          </div>

          {/* Search Bar (conditionally visible) */}
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

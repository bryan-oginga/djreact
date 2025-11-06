import { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import PopularMovies from "./pages/PopularPage";
import LatestMovies from "./pages/LatestPage";
import FavoriteMoviePage from "./pages/FavoritesPage";
import "./App.css";

// ✅ Private route guard
function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
}

// ✅ 404 Page
function NotFound() {
  return (
    <div className="not-found text-center py-20">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState(""); // 🔍 global search text
  const location = useLocation();

  // ✅ only show search bar on these pages
  const showSearch = ["/", "/latest", "/favorites", "/popular"].includes(
    location.pathname
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optionally, you could trigger something like navigating to a /search page
  };

  return (
    <>
      <Navbar
        title={title}
        setTitle={setTitle}
        onSubmit={handleSearchSubmit}
        showSearch={showSearch}
      />

      <div className="app">
        <Routes>
          {/* Pass the search prop to pages that support it */}
          <Route path="/" element={<HomePage search={title} />} />
          <Route path="/popular" element={<PopularMovies search={title} />} />
          <Route path="/latest" element={<LatestMovies search={title} />} />
          <Route
            path="/favorites"
            element={<FavoriteMoviePage search={title} />}
          />

          {/* Other pages */}
          <Route path="/movies/:slug" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

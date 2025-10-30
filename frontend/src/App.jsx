// Update App.jsx - Add 404 styling
import { Routes, Route, Navigate, Link } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import HomePage from "./pages/HomePage"
import MovieDetailPage from "./pages/MovieDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import ContactPage from "./pages/ContactPage"
import PopularMovies from "./pages/PopularPage"
import LatestMovies from "./pages/LatestPage"
import "./App.css"

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
}

function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-home">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />  
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/latest" element={<LatestMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
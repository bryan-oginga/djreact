import { useState, useEffect } from "react";
import MovieList from "../components/movies/MovieList";
import movieService from "../services/api/MovieService";

function HomePage({ search }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies when search changes
  useEffect(() => {
    if (!search.trim()) {
      setFilteredMovies(movies);
      return;
    }
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(results);
  }, [search, movies]);

  if (loading) return <p className="text-center py-10">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // ✅ Just render the MovieList — it doesn’t handle fetching or filtering
  return <MovieList movies={filteredMovies} />;
}

export default HomePage;

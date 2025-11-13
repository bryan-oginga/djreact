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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl font-medium animate-pulse">
          Loading movies...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Movies
      </h1>
      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </div>
  );
}

export default HomePage;

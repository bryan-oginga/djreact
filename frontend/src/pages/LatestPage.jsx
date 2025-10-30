import { useState, useEffect } from 'react';
import MovieCard from '../components/movies/MovieCard';
import movieService from '../services/MovieService';
import '../assets/styles/MovieList.css';

function LatestMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        // Reverse to show latest first (assuming newest have higher IDs)
        const latest = [...data].reverse();
        setMovies(latest);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading latest movies</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="homepage">
     
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default LatestMovies;
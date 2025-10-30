import { useState, useEffect } from 'react';
import MovieCard from '../components/movies/MovieCard';
import movieService from '../services/MovieService';
import '../assets/styles/MovieList.css';

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        // Sort by rating (assuming higher rating = more popular)
        const popular = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setMovies(popular);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading popular movies</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="homepage">
      <header className="header">
        <h1>🔥 Popular Movies</h1>
      </header>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default PopularMovies;

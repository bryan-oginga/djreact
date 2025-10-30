import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieService from "../../services/MovieService";
import '../../assets/styles/MovieDetail.css'


function MovieDetail({ movieSlug }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('MovieDetail: Fetching movie slug:', movieSlug);
        
        const data = await movieService.getMovieBySlug(movieSlug);
        console.log('MovieDetail: Received data:', data);
        
        setMovie(data);
      } catch (err) {
        console.error('MovieDetail: Error:', err);
        
        if (err.response?.status === 404) {
          setError('Movie not found. It may have been deleted.');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.message || 'Failed to load movie details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (movieSlug) {
      fetchMovie();
    } else {
      setError('No movie slug provided');
      setLoading(false);
    }
  }, [movieSlug]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" style={{ 
          border: '4px solid rgba(102, 126, 234, 0.3)', 
          borderTopColor: '#667eea',
          width: '50px',
          height: '50px',
          margin: '0 auto'
        }}></div>
        <p style={{ marginTop: '20px' }}>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>😕</h2>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>{error}</p>
        <Link to="/" className="btn-home">
          ← Back to Movies
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  const posterUrl = movie.movie_poster || movie.poster || "https://via.placeholder.com/400x600?text=No+Poster";

  return (
    <div className="movie-detail">
      <img 
        src={posterUrl}
        alt={movie.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x600?text=No+Poster";
        }}
      />
      <div className="movie-detail-content">
        <h2>{movie.title}</h2>
        <p className="rating">⭐ {movie.rating || "N/A"} / 10</p>
        
        {movie.genre && (
          <p style={{ marginTop: '15px', color: '#999' }}>
            <strong>Genre:</strong> {movie.genre}
          </p>
        )}
        
        {movie.release_date && (
          <p style={{ color: '#999' }}>
            <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
          </p>
        )}
        
        <p style={{ marginTop: '30px', fontSize: '16px', lineHeight: '1.8' }}>
          {movie.description || "No description available."}
        </p>
        
        <Link to="/" className="btn-home" style={{ display: 'inline-block', marginTop: '30px' }}>
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
}

export default MovieDetail;
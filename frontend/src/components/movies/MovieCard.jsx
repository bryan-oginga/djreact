import { Link } from "react-router-dom"
import "../../assets/styles/MovieCard.css"

function MovieCard({ movie }) {
  const posterUrl = movie.movie_poster || movie.poster || "https://via.placeholder.com/220x320?text=No+Poster";
  const rating = movie.rating || "N/A";

  // Use slug instead of id in the URL
  const movieUrl = movie.slug ? `/movies/${movie.slug}` : `/movies/${movie.id}`;

  return (
    <div className="movie-card">
      <Link to={movieUrl} className="movie-link">
        <img 
          src={posterUrl}
          alt={movie.title} 
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/220x320?text=No+Poster";
          }}
        />
        <h3>{movie.title}</h3>
        <p>⭐ {rating}</p>
      </Link>
    </div>
  )
}

export default MovieCard
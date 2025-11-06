import { Link } from "react-router-dom";
import { HeartFillIcon } from "@primer/octicons-react";
import { useFavorites } from "../../context/FavoritesContext";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const posterUrl =
    movie.movie_poster ||
    movie.poster ||
    "https://via.placeholder.com/220x320?text=No+Poster";
  const rating = movie.rating || "N/A";
  const movieUrl = movie.slug ? `/movies/${movie.slug}` : `/movies/${movie.id}`;

  const favorite = isFavorite(movie.id);

  return (
    <div
      className="
        group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg
        transition transform hover:-translate-y-2 hover:shadow-2xl
        duration-300 ease-in-out
      "
    >
      {/* Movie Poster */}
      <Link to={movieUrl} className="block relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/220x320?text=No+Poster";
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition duration-300"></div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
          <p className="text-sm text-gray-300">⭐ {rating}</p>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(movie)}
        className="
          absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm
          hover:bg-white/30 transition duration-300
        "
      >
        <HeartFillIcon
          size={22}
          fill={favorite ? "#e42020ff" : "#ffffff"}
          className={`transition-transform duration-300 ${
            favorite ? "scale-110" : "scale-100"
          }`}
        />
      </button>
    </div>
  );
}

export default MovieCard;

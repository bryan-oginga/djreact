import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/movies/MovieCard";

function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg md:text-xl font-medium">No favorites yet ❤️</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-semibold text-white mb-6 text-center">
        My Favorite Movies 🎬
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;

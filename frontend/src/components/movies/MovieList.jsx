import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies.length)
    return (
      <div className="text-center text-gray-500 py-10 text-lg">
        No movies found 😔
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieService from "../../services/api/MovieService";
import ReviewService from "../../services/api/ReviewsService";
import AddReview from "../reviews/AddReviews";

function MovieDetail({ movieSlug: slug }) {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovieBySlug(slug);
        setMovie(data);
      } catch (err) {
        console.error("Error loading movie:", err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchMovie();
  }, [slug]);

  // Fetch reviews for this movie
  useEffect(() => {
    const fetchReviews = async () => {
      if (!movie?.slug) return;
      try {
        const data = await ReviewService.getAllReviewsByMovieSlug(movie.slug);
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    fetchReviews();
  }, [movie]);

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading movie details...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-6 text-lg">{error}</div>;

  if (!movie) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-start animate-fadeInUp">
        {/* Poster Section */}
        <img
          src={
            movie.movie_poster ||
            movie.poster ||
            "https://via.placeholder.com/400x600?text=No+Poster"
          }
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x600?text=No+Poster")
          }
        />

        {/* Details Section */}
        <div className="flex-1 text-gray-800">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-600 mb-6">{movie.description}</p>

          <h3 className="text-xl font-semibold mb-3 text-gray-700">Reviews</h3>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <p className="font-semibold text-gray-700">
                    {r.user?.email || "Anonymous"}{" "}
                    <span className="text-yellow-500">⭐ {r.rating}/5</span>
                  </p>
                  <p className="text-gray-600 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}

          {/* Add Review Form */}
          <div className="mt-6">
            <AddReview movieSlug={movie.slug} onSuccess={handleReviewAdded} />
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all duration-300"
            >
              ← Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

import { useEffect, useState } from "react";
import ReviewService from "../../services/api/ReviewsService";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewService.getAllReviews();
        setReviews(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3>🎬 Movie Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-b py-3">
            <p className="text-gray-800">{review.comment}</p>
            <small className="text-sm text-gray-600">
              ⭐ {review.rating} / 5 — by {review.user?.username || "Anonymous"}
            </small>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;

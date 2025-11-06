import { useState } from "react";
import ReviewService from "../../services/api/ReviewsService";

const AddReview = ({ movieSlug, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const maxCommentLength = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic frontend validation
    if (!movieSlug) {
      setError("Missing movie ID.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }
    if (comment.length > maxCommentLength) {
      setError(`Comment must be ${maxCommentLength} characters or fewer.`);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { rating, comment: comment.trim() };
      const created = await ReviewService.createForMovie(movieSlug, payload);
      setComment("");
      setRating(5);
      if (onSuccess) onSuccess(created); // allow parent to refresh list or show toast
    } catch (err) {
      // show human-friendly message (you can improve with err.response data)
      setError(
        err?.response?.data?.detail || "Failed to add review. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-4 border rounded-md">
      <h4 className="text-lg font-semibold mb-3">Add a review</h4>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Rating</label>
        <div role="radiogroup" aria-label="Rating">
          {[5, 4, 3, 2, 1].map((val) => (
            <label key={val} className="inline-flex items-center mr-3">
              <input
                type="radio"
                name="rating"
                value={val}
                checked={rating === val}
                onChange={() => setRating(val)}
                disabled={submitting}
                className="mr-2"
              />
              <span>{val} ⭐</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="block text-sm font-medium mb-1">
          Comment <span className="text-xs text-gray-500">(optional)</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={maxCommentLength}
          rows={4}
          placeholder="Share your thoughts about the movie..."
          className="w-full p-2 border rounded-md"
          disabled={submitting}
        />
        <div className="text-xs text-gray-500 mt-1">
          {comment.length}/{maxCommentLength}
        </div>
      </div>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Post review"}
        </button>

        <button
          type="button"
          onClick={() => {
            setComment("");
            setRating(5);
            setError(null);
          }}
          disabled={submitting}
          className="px-3 py-1 border rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddReview;

import { useParams } from "react-router-dom";
import MovieDetail from "../components/movies/MovieDetail";
import "../assets/styles/MovieDetail.css";

function MovieDetailPage() {
  const { slug } = useParams();
  return (
    <div className="movie-detail-page">
      <MovieDetail movieSlug={slug} />
    </div>
  );
}

export default MovieDetailPage;

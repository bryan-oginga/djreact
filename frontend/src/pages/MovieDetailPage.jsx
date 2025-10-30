import { useParams, Link } from "react-router-dom";
import MovieDetail from "../components/movies/MovieDetail";
import '../assets/styles/MovieDetail.css'


function MovieDetailPage() {
  // This will now be a slug like "avengers-endgame" instead of "1"
  const { id: slug } = useParams();
  
  console.log('MovieDetailPage: URL param slug:', slug);

  return (
    <div className="movie-detail-page">
      <MovieDetail movieSlug={slug} />
    </div>
  );
}

export default MovieDetailPage;
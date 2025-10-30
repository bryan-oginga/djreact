import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import movieService from '../../services/MovieService.js'
import '../../assets/styles/MovieList.css'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies()
        setMovies(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [setMovies])

  if (loading) return <div className="loading">Loading movies...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
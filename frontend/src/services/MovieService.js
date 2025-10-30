import api from './api'

const movieService = {
  getAllMovies: async () => {
    try {
      const response = await api.get('/movies/');
      console.log('Movies fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error.response?.data || error.message);
      throw error;
    }
  },
  getMovieBySlug: async (slug) => {
    try {
      console.log('Fetching movie with slug:', slug);
      const response = await api.get(`/movies/${slug}/`);
      console.log('Movie detail:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie detail:', error.response?.data || error.message);
      throw error;
    }
  },
};
export default movieService;
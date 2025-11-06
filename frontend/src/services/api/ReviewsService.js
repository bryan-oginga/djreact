import api from "./api";

const ReviewService = {
 
  getAllReviewsByMovieSlug: async (movieSlug) => {
    const res = await api.get(`/movies/${movieSlug}/reviews/`);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/reviews/${id}/`);
    return res.data;
  },

  createForMovie: async (movieSlug, data) => {
    const res = await api.post(`/movies/${movieSlug}/reviews/`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/reviews/${id}/`, data);
    return res.data;
  },

  delete: async (id) => {
    await api.delete(`/reviews/${id}/`);
  },
};

export default ReviewService;

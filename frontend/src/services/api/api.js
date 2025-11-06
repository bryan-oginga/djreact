import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// fetch the access token from local storage and attach it to the request headers
// access token is set during login
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access') 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor to handle 401 errors and refresh the token
api.interceptors.response.use(
  (response) => response, async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refresh = localStorage.getItem('refresh')
        if (refresh) {
          const response = await axios.post(
            `${API_BASE_URL}/token/refresh/`,
            { refresh }
          )
          const { access } = response.data
          localStorage.setItem('access', access)
          originalRequest.headers.Authorization = `Bearer ${access}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
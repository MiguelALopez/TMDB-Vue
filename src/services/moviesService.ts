import axios from 'axios'
import type { Movie } from '@/types/movie.ts'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
})

export const getMovies = async (page = 1, language = 'en'): Promise<Movie[]> => {
  const { data } = await api.get(`/movie/now_playing?language=${language}&page=${page}`)
  return data.results
}

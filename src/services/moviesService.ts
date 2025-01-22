import axios from 'axios'
import type { MovieResponse } from '@/types/movie.ts'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
})

export const getMovies = async (page = 1, language = 'en'): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>(`/movie/now_playing?language=${language}&page=${page}`)
  console.log(data)
  return data
}

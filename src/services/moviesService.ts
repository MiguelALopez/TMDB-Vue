import axios from 'axios';
import type { MovieResponse } from '@/types/movie.ts';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const getMovies = async (
  page = 1,
  movieType: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' = 'now_playing',
  language = 'en',
): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>(
    `/movie/${movieType}?language=${language}&page=${page}`,
  );
  return data;
};

export const searchMovie = async (query: string, page = 1): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>(`/search/movie?query=${query}&page=${page}`);
  return data;
};

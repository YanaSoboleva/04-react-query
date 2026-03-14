import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`, 
  },
});

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {

  const response = await movieInstance.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data.results;
};
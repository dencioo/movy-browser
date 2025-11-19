import MOVY_API_BASE_URL from './apiConfig';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchPopularMoviesBackend() {
  try {
    const res = await fetch(`${MOVY_API_BASE_URL}/movies/popular`);

    if (!res.ok) {
        throw new Error("Failed to fetch movies from backend");
    }
    const data = await res.json();
    return data.movies;
  } catch (error) {
    console.error("Error fetching movies from backend", error);
    return [];
  }
}


export async function searchMovies(query, page = 1) {
  if (!query || query.trim() === '') {
    return {
      results: [],
      total_pages: 0,
      total_results: 0
    }
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  )

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  const data = await response.json();
  return data;
}
import MOVYAPI_BASEURL from './apiConfig';

  export async function fetchPopularMoviesBackend() {
    try {
      const res = await fetch(`${MOVYAPI_BASEURL}/movies/popular`);

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
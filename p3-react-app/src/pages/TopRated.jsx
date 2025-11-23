import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';
import { PageLoader } from '../components/Spinner';

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopRatedMovies() {
      try {
        const data = await fetchTopRatedMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching TopRated movies:', error);
      } finally {
        setLoading(false);
      }
    }
    getTopRatedMovies();
  }, []);
  return (
    <main className='py-10 min-h-screen'>
      <div className='p-4 text-white'>
        <h1 className='font-bold text-center mb-6 text-3xl'>Top Rated Movies</h1>

        {loading ? (
          <PageLoader />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </main>
  );
}
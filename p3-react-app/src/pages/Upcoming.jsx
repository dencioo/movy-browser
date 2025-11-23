import { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';
import { PageLoader } from '../components/Spinner';

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getUpcomingMovies() {
      try {
        const data = await fetchUpcomingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching Upcoming movies:', error);
      } finally {
        setLoading(false);
      }
    }
    getUpcomingMovies();
  }, []);
  return (
    <main className='py-10 min-h-screen'>
      <div className='p-4 text-white'>
        <h1 className='font-bold text-center mb-6 text-3xl'>Upcoming Movies</h1>
        
        {loading ? 
          (
            <PageLoader />
          ) : (
            <MovieGrid movies={movies}/>
          )}
      </div>
    </main>
  );
}
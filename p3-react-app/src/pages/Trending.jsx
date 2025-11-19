import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';
import TimeToggle from '../components/TimeToggle';

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [timeSetting, setTimeSetting] = useState('day');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies(timeSetting);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    }
    getTrendingMovies();
  }, [timeSetting]);
  return (
    <main className='py-10 min-h-screen'>
      <div className='p-4 text-white'>
        <h1 className='font-bold text-center mb-2 text-3xl'> Trending</h1>
        <TimeToggle timeSetting={timeSetting} setTimeSetting={setTimeSetting}/>
        
        {loading ? (
          <div className="flex justify-center py-10 text-gray-300">
            Loading...
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </main>
  );
}
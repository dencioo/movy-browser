import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';
import TimeToggle from '../components/TimeToggle';

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [timeSetting, setTimeSetting] = useState('day');
  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies(timeSetting);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }
    getTrendingMovies();
  }, [timeSetting]);
  return (
    <main className='py-10 min-h-screen'>
      <div className='p-4 text-white text-3xl'>
        <h1 className='font-bold text-center mb-2'> Trending</h1>
        <TimeToggle timeSetting={timeSetting} setTimeSetting={setTimeSetting}/>
        <MovieGrid movies={movies}/>
      </div>
    </main>
  );
}
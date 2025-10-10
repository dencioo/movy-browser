import { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getUpcomingMovies() {
      try {
        const data = await fetchUpcomingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching Upcoming movies:', error);
      }
    }
    getUpcomingMovies();
  }, []);
  return (
    <main className='space-y-10 py-10'>
      <div className='p-4 text-white text-3xl'>
        <h1 className='font-bold text-center mb-6'>Upcoming Movies</h1>
        <MovieGrid movies={movies}/>
      </div>
    </main>
  );
}
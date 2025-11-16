import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getTopRatedMovies() {
      try {
        const data = await fetchTopRatedMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching TopRated movies:', error);
      }
    }
    getTopRatedMovies();
  }, []);
  return (
    <main className='py-10 min-h-screen'>
      <div className='p-4 text-white text-3xl'>
        <h1 className='font-bold text-center mb-6'>Top Rated Movies</h1>
        <MovieGrid movies={movies}/>
      </div>
    </main>
  );
}
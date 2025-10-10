import { useEffect, useState } from 'react';
import { fetchNowPlayingMovies } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getNowPlayingMovies() {
      try {
        const data = await fetchNowPlayingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }
    getNowPlayingMovies();
  }, []);
  return (
    <div className='p-4 text-white text-3xl'>
      <h1 className='font-bold text-center mb-5'>🎬 Now Playing</h1>
      <MovieGrid movies={movies}/>
    </div>
  );
}
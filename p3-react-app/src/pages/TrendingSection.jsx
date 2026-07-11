import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Flame, ArrowRight } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { PageLoader } from '../components/Spinner';
import { fetchTrendingMovies } from '../services/movieService';

export default function TrendingSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTrendingMovies('day', 1);
        setMovies(data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className='section-block'>
      <div className='section-header'>
        <Flame size={20} strokeWidth={1.75} className='section-header__icon' />
        <h2 className='section-title'>Trending today</h2>
        <Link to='/trending' className='section-see-all'>
          See all <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>

      {loading ? <PageLoader /> : <MovieGrid movies={movies} />}
    </div>
  );
}
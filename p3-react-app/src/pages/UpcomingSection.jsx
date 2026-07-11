import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CalendarDays, ArrowRight } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { PageLoader } from '../components/Spinner';
import { fetchUpcomingMovies } from '../services/movieService';

export default function UpcomingSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUpcomingMovies(1);
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
        <CalendarDays size={20} strokeWidth={1.75} className='section-header__icon' />
        <h2 className='section-title'>Upcoming</h2>
        <Link to='/upcoming' className='section-see-all'>
          See all <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>

      {loading ? <PageLoader /> : <MovieGrid movies={movies} />}
    </div>
  );
}
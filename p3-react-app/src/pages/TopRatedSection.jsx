import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../services/movieService';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router';
import { PageLoader } from '../components/Spinner';
import MovieGrid from '../components/MovieGrid';

export default function TopRatedSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {

      try {
        const data = await fetchTopRatedMovies(1);
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [])

  return (
    <div className='section-block'>
      <div className='section-header'>
        <Star size={20} strokeWidth={1.75} className='section-header__icon'/>
        <h2 className='section-title'>Top Rated</h2>
        <Link to='/top-rated' className='section-see-all'>
          See all <ArrowRight size={14} strokeWidth={2}/> 
        </Link>
      </div>

        {loading ? <PageLoader/> : <MovieGrid movies={movies} />}
    </div>
  
  )
}
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getWatchlistById } from '../api/watchlistService';
import MovieCard from '../components/MovieCard';

export default function WatchlistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchWatchlistsDetails() {
      try {
        const data = await getWatchlistById(id);
        setWatchlist(data.watchlist);
      } catch (error) {
        console.error('Error fetching watchlist details:', error);

        if (error.message.includes('401')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
  }
    fetchWatchlistsDetails();
  }, [id, navigate]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading</p>;
  }

  if (!watchlist) {
    return <p>Watchlist not found</p>
  }

  return (
    <main className='min-h-screen py-10 text-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <button onClick={() => navigate(-1)} className='mb-4 text-purple-400 hover:text-purple-300'>
          ← Back
        </button>

        <h1 className='text-4xl font-bold mb-6'>{watchlist.name}</h1>

        {(watchlist.movies || []).length === 0 ? (
          <p>No movies in this watchlist yet</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {watchlist.movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}

          </div>
        )}
      </div>
    </main>
  )
}
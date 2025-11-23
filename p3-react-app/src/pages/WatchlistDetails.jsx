import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getWatchlistById, removeMovieFromWatchlist } from '../api/watchlistService';
import { Trash2 } from 'lucide-react'
import { PageLoader } from '../components/Spinner';

export default function WatchlistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    movieId: null,
  })

  const fetchWatchlistsDetails = useCallback(async () => {
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
  }, [id, navigate])
  
  useEffect(() => {
    fetchWatchlistsDetails();
  }, [fetchWatchlistsDetails]);

  const handleRemoveMovie = async (movieId) => {
    setConfirmModal({
      open: true,
      movieId
    })
  }

  const confirmRemoveMovie = async () => {
    try {
      await removeMovieFromWatchlist(id, confirmModal.movieId);
      fetchWatchlistsDetails();
    } catch (error) {
      console.error('Error removing movie:', error);
    } finally {
      setConfirmModal({ 
        open: false,
        movieId: null
      })
    }
  }

  if (loading) {
    return <PageLoader />;
  }

  if (!watchlist) {
    return <p>Watchlist not found</p>
  }

  const MovieItem = ({movie}) => {
    const date = new Date(movie.releaseDate);
    const month = date.toLocaleDateString('default', {month: 'short'});
    const year = date.getFullYear();
    const releaseDate = `${month} ${year}`;

    const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : '/No-Image-Placeholder.svg';

    const starRating = (movie.voteAverage / 2).toFixed(1);

    return (
      <div className='bg-gray-800 text-white rounded p-4 flex flex-col justify-between h-full relative group'>
        <button
          onClick={() => handleRemoveMovie(movie._id)}
          className='absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10'
          title='Remove from watchlist'
          >
          <Trash2 size={16} />
        </button>

        <Link to={`/movie/${movie.tmdbId}`} className="block">
          <img src={imageUrl} alt={movie.title} className='rounded mb-2 w-full'/>
          <div className='flex flex-col flex-grow items-center justify-center text-center'>
            <h2 className='text-lg font-semibold text-center mb-2'>{movie.title}</h2>
            <p className='text-sm text-gray-300 flex justify-center items-center gap-2 mt-auto'>
              <span className='bg-gray-700 px-2 py-0.5 mt-2 rounded-full'>⭐ {starRating}</span>
              <span className="bg-gray-700 px-2 py-0.5 mt-2 rounded-full">📅 {releaseDate}</span>
            </p>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <main className='min-h-screen py-10 text-white'>
      <div className='max-w-6xl mx-auto px-4'>

        {confirmModal.open && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]'>
            <div className='bg-purple-950 p-6 rounded-xl shadow-xl border border-purple-700 max-w-sm w-full text-center'>
              <h2 className='text-xl font-semibold mb-2'>Remove Movie?</h2>
              <p className='text-gray-300 mb-6'>This action cannot be undone</p>

              <div className='flex justify-center gap-4'>
                <button
                  onClick={confirmRemoveMovie}
                  className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'>
                    Remove
                </button>

                <button
                  onClick={() => setConfirmModal({open: false, movieId: null})}
                  className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded'
                  >
                    Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <button onClick={() => navigate(-1)} className='mb-4 text-purple-400 hover:text-purple-300'>
          ← Back
        </button>

        <h1 className='text-4xl font-bold mb-6'>{watchlist.name}</h1>

        {(watchlist.movies || []).length === 0 ? (
          <p>No movies in this watchlist yet</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {watchlist.movies.map(movie => (
              <MovieItem key={movie._id} movie={movie}/>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
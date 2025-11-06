import { useEffect, useState } from 'react';
import { deleteWatchlist, getUserWatchlist } from '../api/watchlistService';
import { useNavigate } from 'react-router';

export default function Watchlists() {
  const [watchlists, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
      try {
        const data = await getUserWatchlist();
        setWatchlist(data.watchlists || []);
      } catch (error) {
        console.error('Error fetching watchlists:', error);
        if (error.message.includes('401') || error.message.includes('403')) {
          navigate('/login'); 
        }
      } finally {
        setLoading(false);
      }
    }

  const handleDeleteWatchlist = async (id) => {
    if (!confirm('Are you sure you want to delete this watchlist?')) {
      return;
    }

    try {
      await deleteWatchlist(id);
      fetchWatchlists();
    } catch (error) {
      console.error('Error deleting watchlist:', error)
    }
  }
  
  
  return (
    <main className='min-h-screen py-10'>
      <div className='max-w-6xl mx-auto px-4 text-white'>
        <h1 className='text-4xl font-bold mb-6'>Your Watchlists</h1>

          {loading ? (
            <p>Loading...</p>
          ) : watchlists.length === 0 ? (
            <p>No watchlist found. Create one from a movie page!</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {watchlists.map((list) => (
                <li
                  key={list._id}
                   className="relative bg-purple-950/50 p-4 rounded-lg border border-purple-700 hover:bg-purple-900/60 transition"
                >
                  <div onClick={() => navigate(`/watchlists/${list._id}`)}
                    className='cursor-pointer'>
                    <h2 className='text-xl font-semibold'>{list.name}</h2>
                    <p className='text-gray-400'>{list.movies.length} movies</p>
                  </div>

                  <button onClick={() => handleDeleteWatchlist(list._id)}
                    className="absolute top-3 right-3 bg-purple-800/60 text-purple-200 hover:bg-purple-700 hover:text-white px-2 py-1 rounded-md transition"
                    title='Delete Watchlist'>
                      ✕
                  </button>
                </li>          
              ))}
            </ul>
          )}
        
      </div>
    </main>
  )
}
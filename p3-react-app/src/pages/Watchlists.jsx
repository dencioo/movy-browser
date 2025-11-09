import { useCallback, useEffect, useState } from 'react';
import { createWatchlist, deleteWatchlist, getUserWatchlist } from '../api/watchlistService';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';

export default function Watchlists() {
  const [watchlists, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const [isCreatingWatchlist, setIsCreatingWatchlist] = useState(false);
  const [newWatchlistLabel, setNewWatchlistLabel] = useState('');



  const fetchWatchlists = useCallback(async ()  => {
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
    }, [navigate]);

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  const handleCreateWatchlist = async (e) => {
    e.preventDefault()
    if (!newWatchlistLabel.trim()) {
      return;
    }

    try {
      await createWatchlist(newWatchlistLabel);
      setNewWatchlistLabel('');
      setIsCreatingWatchlist(false);
      await fetchWatchlists();
    } catch (error) {
      console.error('Error creating watchlist', error);
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
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-4xl font-bold mb-6'>Your Watchlists</h1>
          
          {!isCreatingWatchlist ? (
            <button onClick={() => setIsCreatingWatchlist(true)} className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition'>
              <Plus size={20}/>
              Watchlist
            </button>
          ) : (
            <form onSubmit={handleCreateWatchlist} className='mt-4 flex gap-2'>
              <input type='text' value={newWatchlistLabel}
                onChange={(e) => setNewWatchlistLabel(e.target.value)}
                placeholder='Enter watchlist name...'
                className='flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500'
                autoFocus
              />
              <button type='submit' className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition'>
                Create
              </button>

              <button
                type='button'
                onClick={() => {
                  setIsCreatingWatchlist(false);
                  setNewWatchlistLabel('')
                }}
                className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition'
              >
                Cancel
              </button>
            </form>
          )}

        </div>

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
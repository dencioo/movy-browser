import { useEffect, useState } from 'react';
import { getUserWatchlist } from '../api/watchlistService';
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
                  onClick={() => navigate(`/watchlists/${list._id}`)}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold">{list.name}</h2>
                  <p className="text-gray-400">{list.movies.length} movies</p>
                </li>
              ))}
            </ul>
          )}
        
      </div>
    </main>
  )
}
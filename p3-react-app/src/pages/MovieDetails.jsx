  import { useEffect, useState } from 'react';
  import { Navigate, useNavigate, useParams } from 'react-router';
  import { fetchMovieDetails, fetchMovieProviders } from '../services/movieService';
import { getUserWatchlist } from '../api/watchlistService';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const [providers, setProviders] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [watchlists, setWatchlist] = useState([]);

    useEffect(() => {
      async function fetchDetails(id) {
        try {
          const movieData = await fetchMovieDetails(id)
          setMovie(movieData);

          const providerData = await fetchMovieProviders(id);
          setProviders(providerData)

          // Fetch user's watchlist token if logged in
          const token = localStorage.getItem('token');
            if (token) {
              try {
                const watchlistData = await getUserWatchlist();
                setWatchlist(watchlistData.watchlists || []);
              } catch (error) {
                console.error('Error fetching watchlists:', error)
              }
          }
        } catch (error) {
          console.error('Failed to fetch movie details:', error)
        } finally {
          setLoading(false);
        }
      }

      if (id) {
        fetchDetails(id);
      }
    }, [id]);
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center text-white text-xl">
          Loading...
        </div>
      );
    }

    /*(if (!movie) {
      return <p className='text-center text-white'>Loading...</p>;
    }
      */
    return (
      <div className='min-h-screen bg-gray-900 p-4 text-white relative'
      
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay', 
      }}
      >

        <div className='p-4 text-white'>
          <h1 className='text-2xl font-bold mb-4'>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-104 rounded-md mb-4 shadow-lg mx-auto"
          />
          
          <p className='mb-10 text-3xl text-gray-300'>{movie.tagline}</p>
          <p className='mb-2 text-gray-200'><strong className='text-xl'>Storyline: <br /></strong>{movie.overview}</p>
          <p className='mb-2 text-gray-300'><strong>Release Date: </strong>
          {new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>

          {providers.length > 0 && (
            <div className='mt-6'>
              <h2 className='text-xl font-semibold mb-2'>Available On:</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {providers.map((provider) => (
                  <div key={provider.provider_id} className='flex flex-col items-center text-center'>
                    <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    />
                  <span className='text-sm mt-4'>{provider.provider_name}</span>

                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            className="mb-2 mt-5 px-4 py-2 text-white rounded hover:!bg-gray-600 transition"
          >
          ← Back
          </button>

        </div>
      </div>
    );
  }
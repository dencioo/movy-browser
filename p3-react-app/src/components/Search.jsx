import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { searchMovies } from '../api/movieService';
import MovieGrid from './MovieGrid';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);

    try {
      const data = await searchMovies(searchQuery);
      setMovies(data.results);
      setTotalResults(data.total_results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  }

  return (
    <main className='min-h-screen space-y-10 py-10'>
      <div className='p-4 text-white'>
        <h1 className='text-3xl font-bold text-center mb-6'>Search Movies</h1>

        <form onSubmit={handleSubmit} className='max-w-2xl mx-auto mb-8'>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-40' size={20} />
              <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for movies...'
                className='w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500'
              />              
            </div>
            <button
              type='Submit'
              className='px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition'
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <p className='text-center text-gray-400'>Searching...</p>
        )}

        {!loading && query && movies.length === 0 && (
          <p className='text-center text-gray-400'>No movies found for "{query}"</p>
        )}

        {!loading && movies.length > 0 && (
          <>
            <p className='text-center text-gray-400 mb-4'>
              Found {totalResults} results for "{query}"
            </p>
            <MovieGrid movies={movies}/>
          </>
        )}
      </div>
    </main>
  )
}
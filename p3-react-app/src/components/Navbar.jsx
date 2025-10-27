import { Link, useLocation, useNavigate } from 'react-router';
import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({token, setToken}) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Safely encode user input for the URL (handles spaces & special characters)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  let authLinks;
  if (token) {
    authLinks = ( 
      <>
        <Link to="/watchlists" className="text-white hover:text-gray-300 font-bold">
          My Watchlists
        </Link>
        <button onClick={handleLogout} className="font-bold hover:text-gray-300 bg-red-500 px-3 py-1 rounded-full">
          Logout
        </button>
      </>
    );
  } else {
    authLinks = (
      <>
        <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full transition">
          Login
        </Link>
        <Link to="/register" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-3 py-1 rounded-full transition">
          Register
        </Link>
      </>
    )
  }
  
  return (
    <nav className="p-4 text-white bg-gray-800 flex flex-wrap items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className='text-white hover:text-gray-300 font-bold'>Home</Link>
        <Link to="/top-rated" className='text-white hover:text-gray-300 font-bold'>Top Rated</Link>
        <Link to="/upcoming" className='text-white hover:text-gray-300 font-bold'>Upcoming</Link>
        <Link to="/trending" className='text-white hover:text-gray-300 font-bold'>Trending</Link>
      </div>

      {location.pathname !== '/search' && (
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </form>
      )}

      <div className="flex items-center gap-4">
        {authLinks}
      </div>
    </nav>    
  );
}
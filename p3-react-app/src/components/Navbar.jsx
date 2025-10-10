import { Link } from 'react-router';

export default function Navbar({token, setToken}) {

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  let authLinks;
  if (token) {
    authLinks = ( 
      <button onClick={handleLogout} className="font-bold hover:text-gray-300 bg-red-500">
        Logout
      </button>
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
      <nav className="p-4 space-x-4 text-white bg-gray-800">
        <Link to="/" className='text-white hover:text-gray-300 font-bold'>Home</Link>
        <Link to="/top-rated" className='text-white hover:text-gray-300 font-bold'>Top Rated</Link>
        <Link to="/upcoming" className='text-white hover:text-gray-300 font-bold'>Upcoming</Link>
        <Link to="/trending" className='text-white hover:text-gray-300 font-bold'>Trending</Link>
        {authLinks}
      </nav>    
  )
}
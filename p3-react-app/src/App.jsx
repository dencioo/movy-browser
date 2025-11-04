import { useState } from 'react';
import './App.css'
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { addMovieToWatchlist, getUserWatchlist, removeMovieFromWatchlist, syncMovieToBackend } from './api/watchlistService.js';

window.getUserWatchlist = getUserWatchlist;
window.addMovieToWatchlist = addMovieToWatchlist;
window.removeMovieFromWatchlist = removeMovieFromWatchlist;
window.syncMovieToBackend = syncMovieToBackend;

function App() {

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }

    setToken(newToken)
  }

  return (
    <div className='bg-gray-950'>
      <Header token={token} setToken={updateToken}/>
      <AppRoutes setToken={updateToken}/>
    </div>
  )
}

export default App;

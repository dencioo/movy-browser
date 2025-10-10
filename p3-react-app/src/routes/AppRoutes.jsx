import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import TopRated from '../pages/TopRated';
import Upcoming from '../pages/Upcoming';
import MovieDetails from '../pages/MovieDetails';
import Trending from '../pages/Trending';
import Login from '../pages/Login';
import Register from '../pages/Register';


const AppRoutes = ({setToken}) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/top-rated' element={<TopRated />} />
      <Route path='/upcoming' element={<Upcoming />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      <Route path='/trending' element={<Trending />} />
      <Route path='/login' element={<Login setToken={setToken}/>} />
      <Route path='/register' element={<Register setToken={setToken}/>} />
    </Routes>
  )
}

export default AppRoutes;
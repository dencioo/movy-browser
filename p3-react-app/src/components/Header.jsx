import Navbar from './Navbar';
import logo from '../assets/logo.png'
import { Link } from 'react-router';


export default function Header({token, setToken}) {
  return (
    <header className='flex items-center justify-between px-4 py-2 shadow-md bg-gray-900 dark:bg-gray-900 sticky top-0 z-1'>
      <div className='flex items-center space-x-3'>
        <Link to='/'>
          <img src={logo} className=" w-auto h-16 object-contain" />
        </Link>
        <Link to='/'>
          <h1 className='text-4xl font-bold text-white'>Movy Browser</h1>
        </Link>
      </div>  
      <Navbar token={token} setToken={setToken}/> 
    </header>
  )
}
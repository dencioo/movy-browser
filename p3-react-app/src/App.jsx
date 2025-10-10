import { useState } from 'react';
import './App.css'
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <div className='bg-gray-950'>
      <Header token={token} setToken={setToken}/>
      <AppRoutes setToken={setToken}/>
    </div>
  )
}

export default App;

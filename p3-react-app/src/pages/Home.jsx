import { useEffect, useState } from 'react'
import ScrollTopButton from '../components/ScrollTopButton'
import NowPlaying from './NowPlaying'
import Popular from './Popular'

export default function Home() {
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    
    <main className='py-10 min-h-screen'>
      <header>
        <p className='text-lg text-center text-gray-400 italic'>
          Today is {currentDate}</p>
      </header>

      {loading ? (
          <div className="flex justify-center py-10 text-gray-300">
            Loading...
          </div>
        ) : (
          <>
            <section>
              <NowPlaying />
            </section>

            <section>
              <Popular />
            </section>
          </>
        )}

      <ScrollTopButton />
    </main>
    
  )
}
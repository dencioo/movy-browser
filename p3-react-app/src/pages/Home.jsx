import ScrollTopButton from '../components/ScrollTopButton'
import NowPlaying from './NowPlaying'
import Popular from './Popular'

export default function Home() {

  const currentDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    
    <main className='py-10 min-h-screen'>
      <header>
        <p className='text-lg text-center text-gray-400 italic'>
          Today is {currentDate}</p>
      </header>

      <section>
        <NowPlaying />
      </section>
      <section>
        <Popular />
      </section>

      <ScrollTopButton />
    </main>
    
  )
}
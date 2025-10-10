import MovieCard from './MovieCard';

export default function MovieGrid({movies}) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
 
    </div>
  )
}
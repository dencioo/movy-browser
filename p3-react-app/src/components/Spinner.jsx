export default function Spinner({ size = 'lg', color = 'purple'}) {
  const sizeClasses = {
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
    xxl: 'w-24 h-24 border-6'
  };

  const colorClasses = {
    purple: 'border-purple-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent'
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      role="status"
      aria-label='Loading'
    />
  )
}

export function PageLoader() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Spinner size='xxl' color='purple' />
    </div>
  )
}

export function WatchlistCardSkeleton() {
  return (
    <li className='bg-purple-950/50 p-4 rounded-lg border border-purple-700 animate-pulse min-h-[140px] md:min-h-[180px]'>
      <div className='flex items-center'>
        <div className='flex-1 text-center space-y-2'>
          {/* title skeleton*/}
          <div className='h-8 bg-purple-800/50 rounded w-3/4 mx-auto'></div>
          {/* movie skeleton*/}
          <div className='h-5 bg-purple-800/50 rounded w-1/2 mx-auto'></div>
        </div>
        {/* action buttons skeleton*/}
        <div className='flex flex-col gap-2 ml-2'>
          <div className='w-10 h-10 bg-purple-800/60 rounded-md'></div>
          <div className='w-10 h-10 bg-purple-800/60 rounded-md'></div>
        </div>
      </div>
    </li>
  )
}

export function WatchlistGridLoader({ count = 3}) {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {Array.from({ length: count }).map((_, i) => (
        <WatchlistCardSkeleton key={i} />
      ))}
    </ul>
  )
}
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
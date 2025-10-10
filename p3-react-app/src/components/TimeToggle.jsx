export default function TimeToggle({timeSetting, setTimeSetting}) {
  const buttons = [
    {label: 'Today', value: 'day'},
    {label: 'This Week', value: 'week'}
  ]
  return (
    <div className='flex justify-center mb-4 space-x-4 text-sm'>
      {buttons.map((btn) => {
        const isActive = timeSetting === btn.value;
        const baseClasses = 'px-4 py-2 rounded';
        let activeClasses = "";

        if (isActive) {
          activeClasses = '!bg-gray-800 text-white';
        } else {
          activeClasses = '!bg-gray-400 text-black';
        }

        return (
          <button key={btn.value} onClick={() => setTimeSetting(btn.value)} className={`${baseClasses} ${activeClasses}`} aria-pressed={isActive}>

            {btn.label}
          </button>
        )
      })}
    </div>
  )
}
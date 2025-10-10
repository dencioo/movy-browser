import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setIsVisible(window.scrollY > 1000);
    }
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  }, []);

  if (!isVisible) {
    return null;
  }
  

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior:'smooth'});
  }

  const baseClass = 'fixed bottom-8 right-8 z-1 transition-opacity duration-500';
  const visibleClass = 'opacity-100';
  const hiddenClass = 'opacity-0 pointers-events-none';
  const buttonClass = isVisible
    ? `${baseClass} ${visibleClass}`
    : `${baseClass} ${hiddenClass}`
  return (
    <button onClick={scrollToTop} className={`${buttonClass} bg-gray-800 hover:bg-gray-700 text-white`}><ArrowUp size={32} /></button>
  )
}
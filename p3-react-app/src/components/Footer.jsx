import { Clapperboard } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <Link to='/' className='footer__logo'>
          <div className='footer__logo-icon'>
            <Clapperboard size={16} strokeWidth={1.75}/>
          </div>
          <span>
            Movy<span>.</span>
          </span>
        </Link>

        <p> 
          &copy; {year} Movy Browser. All rights reserved.
        </p>

        <p> 
          Built by{' '}
          <a
            href='https://github.com/deyuun'
            target='_blank'
            rel='noopener noreferrer'
          >
            Dean Harley Pal
          </a>
          {' '}· deyuun
        </p>

        <p>
          Movie data provided by{' '}
          <a
            href='https://www.themoviedb.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}
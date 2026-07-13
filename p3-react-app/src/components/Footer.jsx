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
          <span className='footer__wordmark'>
            Movy<span className='footer__dot'>.</span>
          </span>
        </Link>

        <p className='footer__copy'> 
          &copy; {year} Movy Browser. All rights reserved.
        </p>

        <p className='footer__author'> 
          Built by{' '}
          <a
            href='https://github.com/deyuun'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__tmdb-link'
          >
            Dean Harley Pal
          </a>
          {' '}· @deyuun
        </p>

        <p className='footer__tmdb'>
          Movie data provided by{' '}
          <a
            href='https://www.themoviedb.org'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__tmdb-link'
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}
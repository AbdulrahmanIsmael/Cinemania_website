import { useEffect } from 'react';
import { useFetchWithUrl } from '../../hooks/useFetchWithUrl';
import {
  handleScrollLeft,
  handleScrollRight,
} from '../../helpers/handleScroll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import loading from '../../assets/images/data-loading.gif';

export function MoviesPosters({ scrollShowcase }) {
  const [moviesQuery, imageUrlQuery] = useFetchWithUrl(
    'popular',
    'https://api.themoviedb.org/3/movie/popular',
    { language: 'en-US', page: 1 }
  );

  useEffect(() => {
    if (moviesQuery.isSuccess && imageUrlQuery.isSuccess) {
      const moviesList = document.querySelector('.home__showcase__postersList');
      const listItemWidth = document.querySelector(
        '.home__showcase__postersList> li'
      ).offsetWidth;

      scrollShowcase(moviesList, listItemWidth);
    }
  }, [moviesQuery, imageUrlQuery]);

  function handleScroll(scrollInDir) {
    const moviesList = document.querySelector('.home__showcase__postersList');
    const listItemWidth = document.querySelector(
      '.home__showcase__postersList> li'
    ).offsetWidth;

    scrollInDir(moviesList, listItemWidth);
  }

  return (
    <section className='home__showcase'>
      <ul className='home__showcase__postersList'>
        {moviesQuery.isLoading || imageUrlQuery.isLoading ? (
          <img src={loading} alt='movies loading' />
        ) : (
          moviesQuery.data.data.results.map(movie => {
            return (
              <li
                key={movie.id}
                className='home__showcase__postersList__poster'
              >
                <img
                  src={`
                    ${
                      imageUrlQuery.data.data.images.base_url
                    }${imageUrlQuery.data.data.images.poster_sizes.find(
                    size => size === 'original'
                  )}${movie.poster_path}
                  `}
                  alt={`${movie.original_title} poster`}
                />
                <div id='home__showcase__postersList__poster__details'>
                  <h2>{movie.original_title}</h2>
                  <p>{movie.overview}</p>
                </div>
              </li>
            );
          })
        )}
      </ul>
      <div
        className='home__showcase__rightRow'
        onClick={() => handleScroll(handleScrollRight)}
      >
        <ArrowForwardIcon />
      </div>
      <div
        className='home__showcase__leftRow'
        onClick={() => handleScroll(handleScrollLeft)}
      >
        <ArrowBackIcon />
      </div>
    </section>
  );
}

export function HomeCelebs() {
  const [celebsQuery, imageUrlQuery] = useFetchWithUrl(
    'celebs',
    'https://api.themoviedb.org/3/trending/person/day',
    { language: 'en-US' }
  );

  function handleScroll(scrollInDir) {
    const celebsList = document.querySelector('.home__celebs__list');
    const listItemWidth =
      document.querySelector('.home__celebs__list> li').offsetWidth * 2;

    scrollInDir(celebsList, listItemWidth);
  }

  return (
    <section className='home__celebs'>
      <h2>Trending Celebs</h2>
      <ul className='home__celebs__list'>
        {celebsQuery.isLoading ? (
          <img src={loading} alt='celebs loading' />
        ) : (
          celebsQuery.data.data.results.map(celeb => {
            if (celeb.profile_path) {
              return (
                <li key={celeb.id} className='home__celebs__list__celeb'>
                  <img
                    src={`${
                      imageUrlQuery.data.data.images.base_url
                    }${imageUrlQuery.data.data.images.profile_sizes.find(
                      size => size === 'w185'
                    )}${celeb.profile_path}`}
                    alt={`${celeb.name} image`}
                  />
                  <h2>{celeb.name}</h2>
                </li>
              );
            }
          })
        )}
      </ul>
      <div
        className='home__celebs__rightRow'
        onClick={() => handleScroll(handleScrollRight)}
      >
        <ArrowForwardIcon />
      </div>
      <div
        className='home__celebs__leftRow'
        onClick={() => handleScroll(handleScrollLeft)}
      >
        <ArrowBackIcon />
      </div>
    </section>
  );
}

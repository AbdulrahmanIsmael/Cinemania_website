import { useEffect } from 'react';
import { useFetchWithUrl } from '../../hooks/useFetchWithUrl';
import {
  handleScrollLeft,
  handleScrollRight,
} from '../../helpers/handleScroll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import loading from '../../assets/images/data-loading.gif';
import celebPerson from '../../assets/images/celeb.png';

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

      scrollShowcase(
        moviesList,
        listItemWidth,
        moviesQuery.data.data.results.length
      );
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

export function TopCelebs() {
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
            } else {
              return (
                <li key={celeb.id} className='home__celebs__list__celeb'>
                  <img src={celebPerson} alt={`${celeb.name} image`} />
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

export function SpecialMovie() {
  const [upcomingMoviesQuery, imageUrlQuery] = useFetchWithUrl(
    'top',
    'https://api.themoviedb.org/3/movie/top_rated',
    { language: 'en-US', page: '1' }
  );

  const random = Math.trunc(Math.random() * 19);

  return (
    <section className='home__special'>
      {upcomingMoviesQuery.isSuccess && imageUrlQuery.isSuccess ? (
        <div className='home__special__topShow'>
          <img
            src={`${
              imageUrlQuery.data.data.images.base_url
            }${imageUrlQuery.data.data.images.poster_sizes.find(
              size => size === 'original'
            )}${upcomingMoviesQuery.data.data.results[random].poster_path}`}
            alt={`${upcomingMoviesQuery.data.data.results[random].original_title} poster`}
          />

          <div className='home__special__topShow__details'>
            <h2>
              {upcomingMoviesQuery.data.data.results[random].original_title}
            </h2>
            <p>{upcomingMoviesQuery.data.data.results[random].overview}</p>
            <h3
              style={{
                color:
                  upcomingMoviesQuery.data.data.results[random].vote_average < 5
                    ? 'red'
                    : upcomingMoviesQuery.data.data.results[random]
                        .vote_average > 5 &&
                      upcomingMoviesQuery.data.data.results[random]
                        .vote_average < 8
                    ? 'yellow'
                    : 'green',
              }}
            >
              {upcomingMoviesQuery.data.data.results[random].vote_average}
            </h3>
          </div>
        </div>
      ) : (
        <img src={loading} alt='special movie loading' />
      )}
    </section>
  );
}

export function Subscribe() {
  return (
    <section className='home__sub'>
      <h2>Subscribe for more news</h2>
      <form>
        <input type='email' name='email' id='email' />
        <button
          onClick={e => {
            e.preventDefault();
          }}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

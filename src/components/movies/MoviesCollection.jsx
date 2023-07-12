import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import loading from '../../assets/images/data-loading.gif';

export function FilterSystem({ section, setFilteredOptions }) {
  const handleFilter = () => {
    let sortOption = document.querySelectorAll(
      `.${section}__filter__sort  li  input`
    );
    let ratingOption = document.querySelectorAll(
      `.${section}__filter__rating  li input`
    );
    let yearsOptions = document.querySelectorAll(
      `.${section}__filter__years  li input`
    );

    let sortValue = 'popular';
    let ratingValue = '0';
    let yearsValue = [];

    for (let x = 0; x < sortOption.length; x++) {
      if (sortOption[x].checked) {
        sortValue = sortOption[x].value;
        break;
      }
    }

    for (let i = 0; i < ratingOption.length; i++) {
      if (ratingOption[i].checked) {
        ratingValue = ratingOption[i].value;
        break;
      }
    }

    yearsValue = Array.from(yearsOptions)
      .filter(option => option.checked)
      .map(option => option.value);

    setFilteredOptions({
      sort: sortValue,
      rating: ratingValue,
      years: yearsValue,
    });
  };

  return (
    <section className={`${section}__filter`}>
      <ul className={`${section}__filter__sort`}>
        <h2>Sort By</h2>
        <li>
          <input type='radio' name='sort' value='popular' />
          <span>Popular</span>
        </li>
        <li>
          <input type='radio' name='sort' value='now_playing' />
          <span>Newest</span>
        </li>
        <li>
          <input type='radio' name='sort' value='top_rated' />
          <span>Top Rated</span>
        </li>
        <li>
          <input type='radio' name='sort' value='upcoming' />
          <span>Upcoming</span>
        </li>
      </ul>
      <ul className={`${section}__filter__rating`}>
        <h2>Rating</h2>
        <li>
          <input type='radio' name='rating' value='5' />
          <span>5.0 Or Higher</span>
        </li>
        <li>
          <input type='radio' name='rating' value='6' />
          <span>6.0 Or Higher</span>
        </li>
        <li>
          <input type='radio' name='rating' value='7' />
          <span>7.0 Or Higher</span>
        </li>
        <li>
          <input type='radio' name='rating' value='8' />
          <span>8.0 Or Higher</span>
        </li>
        <li>
          <input type='radio' name='rating' value='9' />
          <span>9.0 Or Higher</span>
        </li>
      </ul>
      <ul className={`${section}__filter__years`}>
        <h2>Years</h2>
        <li>
          <input type='checkbox' name='years' value='2005' />
          <span>2005 - 2010</span>
        </li>
        <li>
          <input type='checkbox' name='years' value='2010' />
          <span>2010 - 2015</span>
        </li>
        <li>
          <input type='checkbox' name='years' value='2015' />
          <span>2015 - 2020</span>
        </li>
        <li>
          <input type='checkbox' name='years' value='2020' />
          <span>2020 Or Newer</span>
        </li>
      </ul>

      <button className={`${section}__filter__btn`} onClick={handleFilter}>
        Find
      </button>
    </section>
  );
}

export function MoviesList({ filteredOptions }) {
  const [moviesList, setMoviesList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const moviesQuery = useQuery(
    ['filteredMovies', filteredOptions],
    async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${filteredOptions.sort}`,
        params: {
          language: 'en-US',
          page: String(Math.trunc(Math.random() * 100 + 1)),
        },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
        },
      };

      const response = await axios.request(options);

      try {
        const result = response?.data?.results;
        let filteredResult = result.filter(
          movie => +movie.vote_average >= +filteredOptions.rating
        );
        if (filteredOptions.years.length !== 0) {
          filteredResult = filteredResult.filter(movie => {
            const movieYear = +movie.release_date.slice(0, 4);

            const filteredYears = filteredOptions.years;
            let yearsDec = false;
            for (let y = 0; y < filteredYears.length; y++) {
              if (
                movieYear >= +filteredYears[y] &&
                movieYear < +filteredYears[y] + 5
              ) {
                yearsDec = true;
                break;
              } else {
                yearsDec = false;
              }
            }

            return yearsDec;
          });
        }
        setMoviesList(filteredResult);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    {
      enabled: !!filteredOptions.sort,
    }
  );

  const searchedImagesQuery = useQuery(
    ['movies', 'search', searchValue],
    async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          query: searchValue,
          include_adult: 'false',
          language: 'en-US',
          page: Math.trunc(Math.random() * 100 + 1),
        },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
        },
      };

      const response = await axios.request(options);

      try {
        const result = response?.data?.results;
        setMoviesList(result);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    { enabled: !!searchValue }
  );

  const imageUrlQuery = useQuery(['imageUrl'], async () => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/configuration',
      params: {},
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
      },
    };

    const res = await axios.request(options);

    try {
      return res;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    console.log(moviesList);
    if (imageUrlQuery.isSuccess) console.log(imageUrlQuery.data.data);
  }, [moviesList]);

  return (
    <section className='movies__list'>
      <form
        className='movies__list__search'
        onSubmit={e => {
          e.preventDefault();
          setSearchValue(e.target.search.value);
        }}
      >
        <label htmlFor='search'>Search for movies</label>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search For Movies...'
        />
        {/* <input
          type='submit'
          value='Search'
          id='search--btn'
        /> */}
      </form>
      <div className='movies__list__body'>
        {moviesList.length === 0 &&
        !moviesQuery.isLoading &&
        !searchedImagesQuery.isLoading ? (
          <div
            style={{
              fontSize: '2rem',
              color: '#ffd100',
              fontFamily: "'Roboto Slab', serif",
              paddingTop: '3em',
            }}
          >
            No Results
          </div>
        ) : null}
        {moviesQuery.isLoading ||
        imageUrlQuery.isLoading ||
        searchedImagesQuery.isLoading ? (
          <img src={loading} alt='movies loading' />
        ) : (
          <ul>
            {moviesList.map(movie => {
              return (
                <li key={movie.id}>
                  <img
                    src={
                      imageUrlQuery.data.data.images.base_url +
                      imageUrlQuery.data.data.images.poster_sizes.find(
                        size => size === 'original'
                      ) +
                      movie?.poster_path
                    }
                    alt={movie.original_title}
                    loading='lazy'
                  />
                  <h2>{movie.original_title}</h2>
                  <div
                    style={{
                      backgroundColor:
                        movie.vote_average < 6
                          ? 'red'
                          : movie.vote_average >= 6 && movie.vote_average < 8
                          ? 'yellow'
                          : 'green',
                      color:
                        movie.vote_average >= 6 &&
                        movie.vote_average < 8 &&
                        '#202020',
                    }}
                  >
                    {movie.vote_average.toFixed(1)}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

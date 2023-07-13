import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import loading from '../../assets/images/data-loading.gif';

export function FilterSystem({ setFilteredOptions, sort }) {
  const handleFilter = () => {
    let sortOption = document.querySelectorAll(
      '.shows__filter__sort  li  input'
    );
    let ratingOption = document.querySelectorAll(
      '.shows__filter__rating  li input'
    );
    let yearsOptions = document.querySelectorAll(
      '.shows__filter__years  li input'
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
    <section className='shows__filter'>
      <ul className='shows__filter__sort'>
        <h2>Sort By</h2>
        <li>
          <input type='radio' name='sort' value={sort.popular.value} />
          <span>{sort.popular.label}</span>
        </li>
        <li>
          <input type='radio' name='sort' value={sort.newest.value} />
          <span>{sort.newest.label}</span>
        </li>
        <li>
          <input type='radio' name='sort' value={sort.topRated.value} />
          <span>{sort.topRated.label}</span>
        </li>
        <li>
          <input type='radio' name='sort' value={sort.upcoming.value} />
          <span>{sort.upcoming.label}</span>
        </li>
      </ul>
      <ul className='shows__filter__rating'>
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
      <ul className={`shows__filter__years`}>
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

      <button className='shows__filter__btn' onClick={handleFilter}>
        Find
      </button>
    </section>
  );
}

export function ShowsList({ filteredOptions, showType, dataType }) {
  const [showsList, setShowsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const showsQuery = useQuery(
    ['shows', showType, filteredOptions],
    async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${dataType}/${filteredOptions.sort}`,
        params: {
          language: 'en-US',
          page: 1,
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
          show => +show.vote_average >= +filteredOptions.rating
        );
        if (filteredOptions.years.length !== 0) {
          filteredResult = filteredResult.filter(show => {
            const showYear = +show.release_date.slice(0, 4);

            const filteredYears = filteredOptions.years;
            let yearsDec = false;
            for (let y = 0; y < filteredYears.length; y++) {
              if (
                showYear >= +filteredYears[y] &&
                showYear < +filteredYears[y] + 5
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
        setShowsList(filteredResult);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    {
      enabled: !!filteredOptions.sort,
    }
  );

  const searchedShowsQuery = useQuery(
    ['shows', 'search', showType, searchValue],
    async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/${dataType}`,
        params: {
          query: searchValue,
          include_adult: 'false',
          language: 'en-US',
          page: 1,
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
        setShowsList(result);
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

  return (
    <section className='shows__list'>
      <form
        className='shows__list__search'
        onSubmit={e => {
          e.preventDefault();
          setSearchValue(e.target.search.value);
        }}
      >
        <label htmlFor='search'>Search for {showType}</label>
        <input
          type='search'
          name='search'
          id='search'
          placeholder={`Search for ${showType}...`}
        />
      </form>
      <div className='shows__list__body'>
        {showsList.length === 0 &&
        !showsQuery.isLoading &&
        !searchedShowsQuery.isLoading ? (
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
        {showsQuery.isLoading ||
        imageUrlQuery.isLoading ||
        searchedShowsQuery.isLoading ? (
          <img src={loading} alt={`${showType} loading`} />
        ) : (
          <ul>
            {showsList.map(show => {
              return (
                <li
                  key={show.id}
                  title={show.overview}
                  onClick={e => e.target.classList.toggle('expand')}
                >
                  <img
                    src={
                      imageUrlQuery.data.data.images.base_url +
                      imageUrlQuery.data.data.images.poster_sizes.find(
                        size => size === 'original'
                      ) +
                      show?.poster_path
                    }
                    alt={show.original_title || show.name}
                    loading='lazy'
                  />
                  <h2>{show.original_title || show.name}</h2>
                  <div
                    style={{
                      backgroundColor:
                        show.vote_average < 6
                          ? 'red'
                          : show.vote_average >= 6 && show.vote_average < 8
                          ? 'yellow'
                          : 'green',
                      color:
                        show.vote_average >= 6 &&
                        show.vote_average < 8 &&
                        '#202020',
                    }}
                  >
                    {show.vote_average.toFixed(1)}
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

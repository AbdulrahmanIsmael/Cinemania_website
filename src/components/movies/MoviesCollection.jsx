import { useEffect } from 'react';

export function FilterSystem({ section, setFilteredOptions }) {
  const handleFilter = () => {
    let sortOption = document.querySelectorAll(
      `.${section}__filter__sort  li  input`
    );
    let ratingOptions = document.querySelectorAll(
      `.${section}__filter__rating  li input`
    );
    let decadeOptions = document.querySelectorAll(
      `.${section}__filter__decade  li input`
    );

    for (let x = 0; x < sortOption.length; x++) {
      if (sortOption[x].checked) {
        sortOption = sortOption[x].value;
      }
    }

    ratingOptions = Array.from(ratingOptions)
      .filter(option => option.checked)
      .map(option => option.value);
    decadeOptions = Array.from(decadeOptions)
      .filter(option => option.checked)
      .map(option => option.value);

    setFilteredOptions({
      sort: sortOption,
      rating: ratingOptions,
      decade: decadeOptions,
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
          <input type='checkbox' name='rating' value='5' />
          <span>5.0 Or Higher</span>
        </li>
        <li>
          <input type='checkbox' name='rating' value='6' />
          <span>6.0 Or Higher</span>
        </li>
        <li>
          <input type='checkbox' name='rating' value='7' />
          <span>7.0 Or Higher</span>
        </li>
        <li>
          <input type='checkbox' name='rating' value='8' />
          <span>8.0 Or Higher</span>
        </li>
        <li>
          <input type='checkbox' name='rating' value='9' />
          <span>9.0 Or Higher</span>
        </li>
      </ul>
      <ul className={`${section}__filter__decade`}>
        <h2>Decade</h2>
        <li>
          <input type='checkbox' name='decade' value='2005-2010' />
          <span>2005 - 2010</span>
        </li>
        <li>
          <input type='checkbox' name='decade' value='2010-2015' />
          <span>2010 - 2015</span>
        </li>
        <li>
          <input type='checkbox' name='decade' value='2015-2020' />
          <span>2015 - 2020</span>
        </li>
        <li>
          <input type='checkbox' name='decade' value='2020' />
          <span>2020 Or Newer</span>
        </li>
      </ul>

      <button className={`${section}__filter__btn`} onClick={handleFilter}>
        Filter
      </button>
    </section>
  );
}

export function MoviesList({ filteredOptions }) {
  useEffect(() => {
    console.log(filteredOptions);
  }, [filteredOptions]);
  return <div></div>;
}

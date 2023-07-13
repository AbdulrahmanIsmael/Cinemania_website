import { useContext, useState } from 'react';
import '../shows/shows.scss';
import NavLinks from '../NavLinks/NavLinks';
import { FilterSystem, ShowsList } from '../shows/showsCollection';
import { loggedContext } from '../../App';

function Series() {
  const logged = useContext(loggedContext);
  const [filteredOptions, setFilteredOptions] = useState({
    sort: null,
    rating: '0',
    years: [],
  });

  return (
    <section className='shows'>
      <NavLinks logged={logged} />
      <h1>Tv Series</h1>
      <FilterSystem
        setFilteredOptions={setFilteredOptions}
        sort={{
          popular: {
            value: 'popular',
            label: 'Popular',
          },

          newest: {
            value: 'airing_today',
            label: 'Airing Today',
          },

          topRated: {
            value: 'top_rated',
            label: 'Top Rated',
          },

          upcoming: {
            value: 'on_the_air',
            label: 'On The Air',
          },
        }}
      />
      <ShowsList
        filteredOptions={filteredOptions}
        dataType={'tv'}
        showType={'series'}
      />
    </section>
  );
}

export default Series;

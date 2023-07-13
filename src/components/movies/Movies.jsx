import { useContext, useState } from 'react';
import { loggedContext } from '../../App';
import '../shows/shows.scss';
import NavLinks from '../NavLinks/NavLinks';
import { FilterSystem, ShowsList } from '../shows/showsCollection';

function Home() {
  const logged = useContext(loggedContext);
  const [filteredOptions, setFilteredOptions] = useState({
    sort: null,
    rating: '0',
    years: [],
  });

  return (
    <section className='shows'>
      <NavLinks logged={logged} />
      <h1>Movies</h1>
      <FilterSystem
        setFilteredOptions={setFilteredOptions}
        sort={{
          popular: {
            value: 'popular',
            label: 'Popular',
          },

          newest: {
            value: 'now_playing',
            label: 'Now Playing',
          },

          topRated: {
            value: 'top_rated',
            label: 'Top Rated',
          },

          upcoming: {
            value: 'upcoming',
            label: 'Upcoming',
          },
        }}
      />
      <ShowsList
        filteredOptions={filteredOptions}
        showType={'movies'}
        dataType={'movie'}
      />
    </section>
  );
}

export default Home;

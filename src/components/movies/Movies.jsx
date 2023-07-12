import { useContext, useState } from 'react';
import './movies.scss';
import NavLinks from '../NavLinks/NavLinks';
import { FilterSystem, MoviesList } from './MoviesCollection';
import { loggedContext } from '../../App';

function Home() {
  const logged = useContext(loggedContext);
  const [filteredOptions, setFilteredOptions] = useState({
    sort: null,
    rating: '0',
    years: [],
  });

  return (
    <div className='movies'>
      <NavLinks logged={logged} />
      <FilterSystem
        section={'movies'}
        setFilteredOptions={setFilteredOptions}
      />
      <MoviesList filteredOptions={filteredOptions} />
    </div>
  );
}

export default Home;

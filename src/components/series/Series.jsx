import { useContext } from 'react';
import './series.scss';
import NavLinks from '../NavLinks/NavLinks';
import { FilterSystem } from '../movies/MoviesCollection';
import { loggedContext } from '../../App';

function Series() {
  const logged = useContext(loggedContext);

  return (
    <section className='series'>
      <NavLinks logged={logged} />
      <FilterSystem section={'series'} />
    </section>
  );
}

export default Series;

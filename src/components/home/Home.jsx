import { useContext } from 'react';
import './home.scss';
import {
  MoviesPosters,
  TopCelebs,
  SpecialMovie,
  Subscribe,
} from './HomeCollection';
import NavLinks from '../NavLinks/NavLinks';
import { loggedContext } from '../../App';

function Home() {
  const logged = useContext(loggedContext);

  return (
    <div className='home'>
      <NavLinks logged={logged} />
      <MoviesPosters />
      <TopCelebs />
      <SpecialMovie />
      <Subscribe />
    </div>
  );
}

export default Home;

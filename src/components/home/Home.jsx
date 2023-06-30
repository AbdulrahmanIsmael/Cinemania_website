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

  function scrollShowcase(list, item, num) {
    const intervalScroll = setInterval(() => {
      list.scrollBy({
        left: item,
        behavior: 'smooth',
      });
    }, 6000);

    setTimeout(() => {
      clearInterval(intervalScroll);
    }, 6000 * num);
  }

  return (
    <div className='home'>
      <NavLinks logged={logged} />
      <MoviesPosters scrollShowcase={scrollShowcase} />
      <TopCelebs />
      <SpecialMovie />
      <Subscribe />
    </div>
  );
}

export default Home;

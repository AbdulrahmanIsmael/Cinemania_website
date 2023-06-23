import './home.scss';
import { MoviesPosters, HomeCelebs } from './HomeCollection';
import NavLinks from '../NavLinks/NavLinks';

function Home() {
  function scrollShowcase(list, item) {
    const intervalScroll = setInterval(() => {
      list.scrollBy({
        left: item,
        behavior: 'smooth',
      });
    }, 6000);
  }

  return (
    <div className='home'>
      <NavLinks />
      <MoviesPosters scrollShowcase={scrollShowcase} />
      <HomeCelebs />
    </div>
  );
}

export default Home;

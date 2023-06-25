import './home.scss';
import {
  MoviesPosters,
  TopCelebs,
  AdSection,
  Subscribe,
} from './HomeCollection';
import NavLinks from '../NavLinks/NavLinks';

function Home() {
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
      <NavLinks />
      <MoviesPosters scrollShowcase={scrollShowcase} />
      <TopCelebs />
      <AdSection />
      <Subscribe />
    </div>
  );
}

export default Home;

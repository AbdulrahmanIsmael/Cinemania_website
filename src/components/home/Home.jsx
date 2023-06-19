import './home.scss';
import { ImgNav } from './HomeCollection';
import NavLinks from '../NavLinks/NavLinks';

function Home() {
  return (
    <div className='home'>
      <NavLinks />
      <ImgNav />
    </div>
  );
}

export default Home;

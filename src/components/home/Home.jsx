import './home.scss';
import ImgNav from './ImgNav';
import HomeNavLinks from './HomeNavLinks';

function Home() {
  return (
    <div className='main__content__home'>
      <HomeNavLinks />
      <ImgNav />
    </div>
  );
}

export default Home;

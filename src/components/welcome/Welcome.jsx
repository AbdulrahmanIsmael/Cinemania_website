import './welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className='main__content__welcome'>
      <h2>Welcome To Cinemania</h2>
      <p>Your guide for a better experience</p>
      <Link className='main__content__welcome__btn' to='/home'>
        Discover More
      </Link>
    </div>
  );
}

export default Welcome;

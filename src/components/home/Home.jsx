import './home.scss';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className='main__content__home'>
      <nav className='main__content__home__navLinks'>
        <ul>
          <li>
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/movies'>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/series'>TV Series</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;

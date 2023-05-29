import { NavLink } from 'react-router-dom';

function HomeNavLinks() {
  return (
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
  );
}

export default HomeNavLinks;

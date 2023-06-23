import { NavLink } from 'react-router-dom';
import './navLinks.scss';

function NavLinks() {
  return (
    <nav className='navLinks'>
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

export default NavLinks;
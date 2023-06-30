import { NavLink } from 'react-router-dom';
import './navLinks.scss';

function NavLinks({ logged }) {
  return (
    <nav className='navLinks'>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          {logged ? (
            <NavLink to='/movies'>Movies</NavLink>
          ) : (
            <NavLink to='/signin'>Movies</NavLink>
          )}
        </li>
        <li>
          {logged ? (
            <NavLink to='/series'>TV Series</NavLink>
          ) : (
            <NavLink to='/signin'>TV Series</NavLink>
          )}
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;

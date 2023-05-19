import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/images/Logo.png';

function Navbar() {
  return (
    <nav className='header__navbar'>
      <div>
        <h1>
          C
          <span>
            <img src={logo} alt='brand / logo' />
          </span>
          nemania
        </h1>
      </div>

      <ul className='header__navbar__navList'>
        <li className='header__navbar__navList__navItem'>
          <Link to='/signup' id='signUp'>
            sign up
          </Link>
        </li>
        <li className='header__navbar__navList__navItem'>
          <Link to='/signin' id='signIn'>
            sign in
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

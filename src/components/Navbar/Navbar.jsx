import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/images/Logo.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const [mobUser, setMobUser] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 678) setMobUser(true);
  });

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
            {mobUser ? (
              <PersonAddIcon sx={{ fontSize: '3.2rem' }} />
            ) : (
              'sign up'
            )}
          </Link>
        </li>
        <li className='header__navbar__navList__navItem'>
          <Link to='/signin' id='signIn'>
            {mobUser ? <LoginIcon sx={{ fontSize: '3.2rem' }} /> : 'sign in'}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

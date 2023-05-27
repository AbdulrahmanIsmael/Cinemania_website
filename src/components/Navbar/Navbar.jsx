import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/images/Logo.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar({ isLogged, setIsLogged }) {
  const navigate = useNavigate();
  const [mobUser, setMobUser] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 678) setMobUser(true);
  });

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
    navigate('/signup', { replace: true });
  };

  return (
    <nav className='header__navbar'>
      <div>
        <Link to='/'>
          <h1>
            C
            <span>
              <img src={logo} alt='brand / logo' />
            </span>
            nemania
          </h1>
        </Link>
      </div>

      <ul className='header__navbar__navList'>
        {isLogged && JSON.parse(localStorage.getItem('user')).password ? (
          <>
            <li className='header__navbar__navList__navItem'>
              <h2>
                <PersonIcon />
                {JSON.parse(localStorage.getItem('user')).username}
              </h2>
            </li>

            <li className='header__navbar__navList__navItem'>
              <button type='button' id='logOut' onClick={handleLogOut}>
                {mobUser ? (
                  <LogoutIcon sx={{ fontSize: '3.2rem' }} />
                ) : (
                  'Log Out'
                )}
              </button>
            </li>
          </>
        ) : (
          <>
            <li className='header__navbar__navList__navItem'>
              <Link to='/signup' id='signUp'>
                {mobUser ? (
                  <PersonAddIcon sx={{ fontSize: '3.2rem' }} />
                ) : (
                  'Sign Up'
                )}
              </Link>
            </li>
            <li className='header__navbar__navList__navItem'>
              <Link to='/signin' id='signIn'>
                {mobUser ? (
                  <LoginIcon sx={{ fontSize: '3.2rem' }} />
                ) : (
                  'Sign In'
                )}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

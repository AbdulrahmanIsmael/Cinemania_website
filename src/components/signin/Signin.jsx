import { useState } from 'react';
import { useNavigate } from 'react-router';
import ErrorInput from '../ErrorInput';
import './signin.scss';

function Signin({ setIsLogged, setShowLoading }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = e => {
    e.preventDefault();

    const { email, password } = JSON.parse(localStorage.getItem('user')) || {
      email: null,
      password: null,
    };

    if (
      !email ||
      !password ||
      inputs.email !== email ||
      inputs.password !== password
    ) {
      setError(true);
    } else {
      setIsLogged(true);
      setShowLoading(true);
      // navigate('/home', { replace: true });
    }
  };

  const handleEmailInput = e => {
    setInputs(prevInputs => {
      return { ...prevInputs, email: e.target.value };
    });
    setError(false);
  };
  const handlePasswordInput = e => {
    setInputs(prevInputs => {
      return { ...prevInputs, password: e.target.value };
    });
    setError(false);
  };

  return (
    <div className='main__content__signin'>
      <div className='main__content__signin_form'>
        <form onSubmit={handleSignIn}>
          <legend>Sign In</legend>
          {error && (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '-1.5em',
              }}
            >
              <ErrorInput color='#FFD100'>
                Invalid Email or Password!
              </ErrorInput>
            </div>
          )}

          <div>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={handleEmailInput}
              id='email'
              placeholder='Enter Your Email'
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              id='password'
              value={inputs.password}
              onChange={handlePasswordInput}
              placeholder='Enter Your Password'
            />
          </div>

          <button type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;

import { useState } from 'react';
import ErrorInput from '../ErrorInput';
import './signin.scss';

function Signin({ setShowLoading, setLogged }) {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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

    if (!inputs.email && !inputs.password) {
      setError(true);
      setErrorMsg('Please fill the following inputs in order to sign in!');
    } else if (
      !email ||
      !password ||
      inputs.email !== email ||
      inputs.password !== password
    ) {
      setError(true);
      setErrorMsg('Invalid Email or Password!');
    } else {
      const { username, email, password } = JSON.parse(
        localStorage.getItem('user')
      );
      localStorage.setItem(
        'user',
        JSON.stringify({ username, email, password, logged: true })
      );
      setShowLoading(true);
      setLogged(true);
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
              <ErrorInput color='#FFD100'>{errorMsg}</ErrorInput>
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

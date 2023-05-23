import { useState } from 'react';
import './signup.scss';
import ErrorInput from '../../helpers/ErrorInput';

/* Defining the inital errors state value */
const initialWrongInputs = {
  username: false,
  email: false,
  password: false,
};

function Signup() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(initialWrongInputs);

  const handleSignUp = e => {
    e.preventDefault();

    /* Regex patterns */
    const usernameRegex = /(?<!\W)([A-Z]+|[a-z]{3,}|\d{2,})(?!\W)/g;
    const emailRegex = /(\w+)@([a-z]+)\.([a-z]{2,})/gi;
    const passwordRegex = /(?<!\W)([A-Z]+|[a-z]{5,}|\d{2,})(?!\W)/g;

    /* Matching with the user inputs */
    const matchedUsername = inputs.username.match(usernameRegex);
    const matchedEmail = inputs.email.match(emailRegex);
    const matchedPassword = inputs.password.match(passwordRegex);

    /* Checking Validation */
    const checkUsernaveValidation =
      inputs.username.length >= 6 &&
      matchedUsername &&
      matchedUsername.length >= 3;
    const checkEmailValidation = matchedEmail;
    const checkPasswordValidation =
      inputs.password.length >= 8 &&
      matchedPassword &&
      matchedPassword.length >= 3;

    if (!checkUsernaveValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, username: true };
      });
    if (!checkEmailValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, email: true };
      });
    if (!checkPasswordValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, password: true };
      });

    /* Adding the user information to the redux store and then to the localStorage + moving to the sign in page, all of that happens just if all the checks is true*/
  };

  return (
    <div className='main__content__signup'>
      <div className='main__content__signup_form'>
        <form onSubmit={handleSignUp}>
          <legend>Register</legend>
          <div>
            <input
              type='text'
              name='username'
              value={inputs.username}
              onChange={e => {
                setInputs(prevInputs => {
                  return { ...prevInputs, username: e.target.value };
                });

                setErrors(prevErrors => {
                  return { ...prevErrors, username: false };
                });
              }}
              id='username'
              placeholder='Enter A Username'
            />
            {errors.username && (
              <ErrorInput color='#FFD100'>
                Invalid Username. Requires at least: 1 capital letter, 3 small
                letter, 2 number, with minimum 6 characters.
              </ErrorInput>
            )}
          </div>

          <div>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={e => {
                setInputs(prevInputs => {
                  return { ...prevInputs, email: e.target.value };
                });

                setErrors(prevErrors => {
                  return { ...prevErrors, email: false };
                });
              }}
              id='email'
              placeholder='Enter An Email'
            />
            {errors.email && (
              <ErrorInput color='#202020'>
                The email address you entered is not in the correct format.
                Please enter a valid email address.
              </ErrorInput>
            )}
          </div>

          <div>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={e => {
                setInputs(prevInputs => {
                  return { ...prevInputs, password: e.target.value };
                });

                setErrors(prevErrors => {
                  return { ...prevErrors, password: false };
                });
              }}
              id='password'
              placeholder='Enter A Password'
            />
            {errors.password && (
              <ErrorInput color='#202020'>
                Invalid Password. Requires at least: 1 capital letter, 5 small
                letter, 2 number, with minimum 8 characters.
              </ErrorInput>
            )}
          </div>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

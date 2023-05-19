import './signup.scss';

function Signup() {
  return (
    <div className='main__content__signup'>
      <div className='main__content__signup_form'>
        <form>
          <legend>Register</legend>
          <div>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter A Username'
            />
          </div>

          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter An Email'
            />
          </div>

          <div>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter A Password'
            />
          </div>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import './signin.scss';

function Signin() {
  return (
    <div className='main__content__signin'>
      <div className='main__content__signin_form'>
        <form>
          <legend>Sign In</legend>
          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter Your Email'
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              id='password'
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

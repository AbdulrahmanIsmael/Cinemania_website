import './welcome.scss';

function Welcome() {
  return (
    <div className='main__content__welcome'>
      <h2>Welcome To Cinemania</h2>
      <p>Your guide for a better experience</p>
      <button className='main__content__welcome__btn' type='button'>
        Discover More
      </button>
    </div>
  );
}

export default Welcome;

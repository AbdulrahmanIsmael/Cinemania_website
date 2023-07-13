import { useContext } from 'react';
import { loggedContext } from '../../App';
import './about.scss';
import NavLinks from '../NavLinks/NavLinks';

function About() {
  const logged = useContext(loggedContext);

  return (
    <section className='about'>
      <NavLinks logged={logged} />
      <h1>About Us</h1>
      <p>
        Welcome to Cinemania, your ultimate destination for all things movies
        and TV series! We pride ourselves on providing an immersive platform
        where you can dive into the fascinating world of entertainment. Our
        website showcases the latest trending movies, popular TV series, and
        renowned celebrities. Explore our extensive collection of top-rated
        films and series, and easily filter your choices based on ratings to
        find the perfect match for your preferences. You can also subscribe to
        cinemania in order to keep up-to-date with the latest news about your
        favourite movies or celebrities. Sign up now to join us and embark on an
        unforgettable cinematic journey like never before!
      </p>
      <section className='about__features'>
        <div id='trending'>Trending shows!</div>
        <div id='finding'>Find some exciting movies</div>
        <div id='exploring'>Explore the best celebs on the stage right now</div>
        <div id='news'>Subscribe and Get exciting news!</div>
      </section>
    </section>
  );
}

export default About;

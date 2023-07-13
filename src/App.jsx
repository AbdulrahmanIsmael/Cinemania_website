import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLoading } from './hooks/useLoading';
import Navbar from './components/Navbar/Navbar';
import Welcome from './components/welcome/Welcome';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Movies from './components/movies/Movies';
import Series from './components/series/Series';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Loading from './components/Loading';

export const loggedContext = createContext(null);

function App() {
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem('user'))?.logged || false
  );
  const [showLoading, setShowLoading] = useState(false);

  useLoading(showLoading, setShowLoading, '/home');

  return (
    <>
      <loggedContext.Provider value={logged}>
        {showLoading ? (
          <Loading />
        ) : (
          <>
            <header className='header'>
              <Navbar logged={logged} setLogged={setLogged} />
            </header>
            <main className='main__content'>
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/series' element={<Series />} />
                <Route path='/about' element={<About />} />
                <Route path='/' element={<Welcome />} />
                <Route
                  path='/signin'
                  element={
                    <Signin
                      setShowLoading={setShowLoading}
                      setLogged={setLogged}
                    />
                  }
                />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            </main>
          </>
        )}
      </loggedContext.Provider>
      <Footer currentYear={new Date().getFullYear()} />
    </>
  );
}

export default App;

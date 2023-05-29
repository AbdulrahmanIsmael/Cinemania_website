import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLoading } from './hooks/useLoading';
import Navbar from './components/navbar/Nav.jsx';
import Welcome from './components/welcome/Welcome';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Loading from './components/Loading';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useLoading(showLoading, setShowLoading, '/home');

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <>
          <header className='header'>
            <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
          </header>
          <main className='main__content'>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/' element={<Welcome />} />
              <Route
                path='/signin'
                element={
                  <Signin
                    setIsLogged={setIsLogged}
                    setShowLoading={setShowLoading}
                  />
                }
              />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;

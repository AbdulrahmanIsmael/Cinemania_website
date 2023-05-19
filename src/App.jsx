import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Welcome from './components/welcome/Welcome';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';

function App() {
  return (
    <>
      <header className='header'>
        <Navbar />
      </header>
      <main className='main__content'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

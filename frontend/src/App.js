import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import Games from './pages/Games';
import Results from './pages/Results';
import Home from './pages/Home';
import Stats from './pages/Stats';
import League from './pages/League';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="App-main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games/>} />
            <Route path='/results' element={<Results/>} />
            <Route path='/stats' element={<Stats/>} />
            <Route path='/league' element={<League/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </main>
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;

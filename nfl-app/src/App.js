import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import Games from './pages/Games';
import Home from './pages/Home';
import Stats from './pages/Stats';
import League from './pages/League';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games' element={<Games/>} />
          <Route path='/stats' element={<Stats/>} />
          <Route path='/league' element={<League/>} />
        </Routes>
        <Navbar />
        </header>
        <BottomNavbar />
      </div>
      </Router>
  );
}

export default App;

import './css/App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieInfo from './pages/MovieInfo';
import {Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';

function App() {


  
  return (
    <div>
      <NavBar />
   <main className="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movie-info/:id" element={<MovieInfo />} />
    </Routes>
   </main>
   </div>
  )
}

export default App

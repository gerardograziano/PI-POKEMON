import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Create from './components/Create/Create';
import About from './components/About/About';
import ErrorPage from './components/ErrorPage/ErrorPage';

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/pokemons" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Details />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;

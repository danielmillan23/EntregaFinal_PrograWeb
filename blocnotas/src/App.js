import React from 'react';
import "./App.css";
import Home from "./components/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/nav";
import Login from './components/login/login';
import { useNavigate } from 'react-router-dom';
import Registro from './components/registro/registro';
import ParticleBg from './components/ParticleBg';
function App() {
  return (
    <div className="App">
      <ParticleBg />
      <Router>

        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<InitialRedirect />} />
        </Routes>
      </Router>
    </div>
  );
}

function InitialRedirect() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return null;
}

export default App;
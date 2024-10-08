import React from 'react';
import logo from './logo.svg'; 
import PokeAPI from './pokeAPI';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokeAPI />
      </header>
    </div>
  );
}

export default App;


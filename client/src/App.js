import React from 'react';

//Component Imports
import Home from './components/home/home.js';
import Navigation from './components/navigation/navigation.js';
import Stores from './components/stores/stores.js';


//CSS Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
    </div>
  );
}

export default App;

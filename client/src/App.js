import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation.js';
import Stores from './components/stores/stores.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Stores />
    </div>
  );
}

export default App;

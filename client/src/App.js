//Dependencies 
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


//Component
import Home from './components/home/home.js';
import Navigation from './components/navigation/navigation.js';
import Stores from './components/stores/stores.js';


//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/stores">
            <Stores />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

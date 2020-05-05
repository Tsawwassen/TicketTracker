//Dependencies 
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


//Component
import Home from './components/home/home.js';
import Navigation from './components/navigation/navigation.js';
import Stores from './components/stores/stores.js';
import Tickets from './components/tickets/tickets.js';
import Parts from './components/parts/parts.js';


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
           <Route path="/parts">
            <Parts />
          </Route>
           <Route path="/tickets">
            <Tickets />
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

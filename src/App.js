import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.jpg';

import Category from './Category';
import Home from './Home';
import FourZeroFour from './FourZeroFour';
import Nav from './Nav';


const App = () => {
  return (
    <Router>
      <div id="outer-container">
        <header className="rs-hd">
          <Nav />
          <Link to="/"><img className="logo" src={logo} alt="Rob Schuster" /></Link>
        </header>
        <main id="page-wrap">
          <Switch>
            <Route path="/:category" component={Category} />
            <Route path="/" component={Home} />
            <Route component={FourZeroFour} />
          </Switch>
        </main>
        <footer className="rs-ft">
          &copy; {new Date().getFullYear()} Rob Schuster. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;

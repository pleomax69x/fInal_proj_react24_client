import React from 'react';
import './App.css';
import 'modern-normalize/modern-normalize.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './components/pages/register';
import Login from './components/pages/login';
import Project from './components/pages/project';
import Header from './components/Header';
import s from './container.module.css';

function App() {
  return (
    <Router>
      <div className={s.container}>
        <Header />

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/register">Home</Link>
              </li>
              <li>
                <Link to="/login">About</Link>
              </li>
              <li>
                <Link to="/projects">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/projects">
              <Project />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
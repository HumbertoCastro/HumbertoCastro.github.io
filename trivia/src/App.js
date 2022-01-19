import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Trivia from './pages/Trivia';

import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './components/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/trivia" component={ Trivia } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}

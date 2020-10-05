import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/welcome" component={HomePage} />
        <Route path="/browse" component = {NotFoundPage} />
        <Route path="/wishlist" component={HomePage} />
        <Route path="/myprofile" component = {NotFoundPage} />
        <Route path="/login" component = {NotFoundPage} />
        <Route path="/register" component = {RegistrationPage} />
      </Switch>
    </Router>
  );
}

export default App;

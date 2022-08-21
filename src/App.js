import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useState, useEffect } from 'react';
import Generate from './pages/Generate';

function App() {
  
  // change user to null and loggedIn user to false initially
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      // check for local storage bearer token and send one auth call to server
    }
  }, [])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} loggedIn={loggedIn} />} />
        <Route exact path="/login" element={<Auth user={user} loggedIn={loggedIn} />} />
        <Route exact path="/generate" element={<Generate user={user} loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;

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
  
<<<<<<< HEAD
  // change user to null and loggedIn user to false initially
  const [user, setUser] = useState(null);
=======
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
>>>>>>> 7d17fe03e087fe1b1e21c0dfb18bbde94d021f59
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn || !token) {
      // check for local storage bearer token and send one auth call to server
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
        setToken(token);
      }

      const user = localStorage.getItem('creds');
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, [])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} loggedIn={loggedIn} setUser={setUser} setLoggedIn={setLoggedIn} token={token}/>} />
        <Route exact path="/login" element={<Auth user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route exact path="/generate" element={<Generate user={user} token={token} loggedIn={loggedIn} setUser={setUser} setLoggedIn={setLoggedIn}  />} />
      </Routes>
    </Router>
  );
}

export default App;

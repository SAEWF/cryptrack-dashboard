import React, { useState } from 'react'
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import './Login.scss';
import { baseUrl } from '../shared/baseUrl';

const ariaLabel = { 'aria-label': 'description' };

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [loading, setLoading] = useState(false);

  const signupUser = async (user) => {
    // console.log("user", user);
    return await fetch(baseUrl + 'users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(response => {
      // console.log('response : ', response);
      if(response.status===200){
        document.getElementById("message").innerHTML = "User created successfully !! Kindly Login !";
      }
      else{
        document.getElementById("message").innerHTML = "Error creating user";
      }
    }
    )
    .catch(error => console.log(error.message));
  }     

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (confirmPassword !== password) {
        alert("Password and Confirm Password does not match!");
        return;
      }
      await signupUser({ username, password, firstname, lastname });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="signup-container">
      <div className="row bold">
        SIGNUP
      </div>
      <form className="body" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="label">
              First Name
            </div>
            <Input
              className="input"
              placeholder="Eg - Raghav"
              inputProps={ariaLabel}
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <div className="label">
              Last Name
            </div>
            <Input
              className="input"
              placeholder="Eg - Mukati"
              inputProps={ariaLabel}
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="label">
          Email
        </div>
        <div className="row">
          <Input value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Enter your email"
            inputProps={ariaLabel}
            required
          />
        </div>
        <div className="label">
          Password
        </div>
        <div className="row">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            placeholder="Enter Password"
            inputProps={ariaLabel}
            required
          />
        </div>
        <div className="label">
          Confirm Password
        </div>
        <div className="row">
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            type="password"
            placeholder="Enter Password"
            inputProps={ariaLabel}
            required
          />
        </div>
        <div className="bold">
          {!loading ? <button type="submit">SIGNUP</button> : <CircularProgress className="progress" />}
        </div>
      </form>
      <div className="message" id="message"></div>
    </div>
  )
};

export default Signup;
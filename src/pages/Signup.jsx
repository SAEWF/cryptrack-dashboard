import React, { useState } from 'react'
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import './Login.scss';

const ariaLabel = { 'aria-label': 'description' };

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (confirmPassword !== password) {
        alert("Password and Confirm Password does not match!");
        return;
      }
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

    </div>
  )
};

export default Signup;
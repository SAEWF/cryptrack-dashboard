import React, { useState } from 'react'
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import './Login.scss';
import { baseUrl } from '../shared/baseUrl';
import { useNavigate } from "react-router-dom";

const ariaLabel = { 'aria-label': 'description' };

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const LoginUser = async (user) => {
        return await fetch(baseUrl + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response => {
            console.log('response : ', response);
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(user));
                props.setLoggedIn(true);
                props.setUser(user);
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                console.log(error);
            }
        })
        .catch(error => console.log(error.message));
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            await LoginUser({ username, password });
            setLoading(false);
            navigate('/', { replace: true });
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className="login-container">
            <div className="row bold">
                LOGIN
            </div>
            <form className="body" onSubmit={handleSubmit}>
                <div className="label">
                    Email
                </div>
                <div className="row">
                    <Input
                        value={username}
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
                <div className="row">
                    {!loading ? <button type="submit" >LOGIN</button> : <CircularProgress className="progress" />}
                </div>
            </form>

        </div>
    )
};

export default Login;
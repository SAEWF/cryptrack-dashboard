import React, { useState } from 'react'
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import './Login.scss';

const ariaLabel = { 'aria-label': 'description' };

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            console.log(username, password);
            setLoading(false);
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
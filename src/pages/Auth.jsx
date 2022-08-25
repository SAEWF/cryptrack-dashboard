import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import './Auth.scss';

const Auth = (props) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    
    useEffect(() => {
        if (props.loggedIn&&props.user) {
            navigate('/');
        }
    }, []);
    
    return (
        <>
            <Header loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} user={props.user}/>
            <div className="auth-container">
                <div className="mode-switch">
                    <span className={mode==='login' ? 'selected login' : 'login'} onClick={() => setMode('login')}> Login</span>
                    <span className={mode === 'signup' ? 'selected signup' : 'signup'} onClick={() => setMode('signup')}> Signup</span>
                </div>
                {mode === 'login' ? <Login setLoggedIn={props.setLoggedIn} setUser={props.setUser} /> : <Signup />}
            </div>
        </>
    )
};

export default Auth;
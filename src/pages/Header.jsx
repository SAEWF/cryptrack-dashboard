import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({ loggedIn, user }) => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate('/')}>Admin Dashboard</div>
            {!loggedIn||!user ?
                <div className="login-button" onClick={() => navigate('/login')}>Login / Signup</div>
                :
                <div className="login-button" onClick={() => navigate('/generate')}> Generate API Key </div>
            }
        </div>
    )
};

export default Header
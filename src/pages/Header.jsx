import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('creds');
        props.setUser(null);
        props.setLoggedIn(false);
        navigate('/login');
    }
    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate('/')}>Admin Dashboard</div>
            {!props.loggedIn||!props.user ?
                <div className="login-button" onClick={() => navigate('/login')}>Login / Signup</div>
                :
                <>
                    <div className="logout-button" onClick={handleLogout}>Logout</div>
                    <div className="login-button" onClick={() => navigate('/generate')}> Generate API Key </div>
                </>
            }
        </div>
    )
};

export default Header
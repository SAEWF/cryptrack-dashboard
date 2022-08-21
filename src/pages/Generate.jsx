import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './Header';
import './Generate.scss';

const Generate = (props) => {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!props.loggedIn || !props.user) {
            navigate('/login')
        }

        // @shubhank fetch api keys from server

    }, []);

    const handleGenerate = () => {
        try {
            setLoading(true);
            // @shubhank generate api keys from server
            // setKey();
            // setSecret();
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <Header loggedIn={props.loggedIn} user={props.user} />
            <div className="generate-container">
                {key && secret ?
                    <div className="generated-apis">
                        <span>Your API Keys:</span>
                        <div className="table">
                            <div className="row">
                                <div className="col title">API Key</div>
                                <div className="col title">API Secret</div>
                            </div>
                            <div className="row">
                                <div className="col">{key}</div>
                                <div className="col">{secret}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="generate-button">
                        {!loading ? <button onClick={handleGenerate}>GENERATE API KEY</button> : <CircularProgress />}
                    </div>
                }
                    
            </div>
        </>
    )
};

export default Generate
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './Header';
import './Generate.scss';
import { baseUrl } from '../shared/baseUrl';

const Generate = (props) => {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.loggedIn === false || props.user === null) {
            navigate('/login');
        }
    }, [props.loggedIn, props.user, navigate]);

    useEffect(() => {
        if (!props.loggedIn || !props.user) {
            navigate('/login')
        }

        // @shubhank fetch api keys from server
        const fetchKeys = async () => {
            setLoading(true);
            const response = await fetch(baseUrl+'users/generateAPIKey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({username: props.user['username']})
            });
            const data = await response.json();
            console.log(data);
            setKey(data.apiKey);
            setSecret(data.apiSecret);
            setLoading(false);
        }

        fetchKeys();
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
            <Header loggedIn={props.loggedIn} user={props.user} setUser={props.setUser} setLoggedIn={props.setLoggedIn}/>
            <div className="generate-container">
                {key && secret ?
                    <div className="generated-apis">
                        <span>Your API Keys:</span>
                        <br />
                        <table>
                            <tr>
                                <th>API Key</th>
                                <th>API Secret</th>
                            </tr>
                            <tr>
                                <td>{key}</td>
                                <td>{secret}</td>
                            </tr>
                        </table>
                    </div>
                    :
                    <div className="generate-button">
                        {
                            !key && !loading ?
                                <button className="button" onClick={handleGenerate}>Generate API Keys</button>
                                : loading && !key ?
                                <CircularProgress />
                                : key ?
                                <div>API Keys generated: {key}</div>
                                : null

                        }
                    </div>
                }
                    
            </div>
        </>
    )
};

export default Generate
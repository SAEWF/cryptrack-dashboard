import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'; 
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Header from './Header';
import './Home.scss';
import { baseUrl } from '../shared/baseUrl';
const ariaLabel = { 'aria-label': 'description' };

const Home = (props) => {
    const navigate = useNavigate();
    
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [msg, setMsg] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);

    // once integrate with server, remove this hardcoded data to empty array
    const [trackedData, setTrackedData] = useState([]);
    const [expanded, setExpanded] = useState(-1)

    useEffect(() => {
        if (props.loggedIn === false || props.user === null) {
            navigate('/login');
        }
    }, []);
    
    const handleTrack = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            // @shubhank fetch tracking data using user, msg and time payload and
            const response = await fetch(baseUrl+'users/generateAPIKey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({username: props.user['username']})
            });
            const data1 = await response.json();
            console.log(data1);
            const key = data1.apiKey;
            const secret = data1.apiSecret;
            const resp = await fetch(baseUrl+'track',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': key, 
                    'apisecret': secret, 
                    'username': props.user.username
                },
                body: JSON.stringify({msg,sender,receiver,time})
            });
            const data = await resp.json();
            console.log(data);
            setTrackedData(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setTrackedData([]);
            console.log(err);
        }
    }
    
    return (
        <>
            <Header loggedIn={props.loggedIn} user={props.user} setUser={props.setUser} setLoggedIn={props.setLoggedIn}/>
            <div className="home-container">
                <div className="head">TRACK</div>
                <form className="inputs" onSubmit={handleTrack} >
                    <Input
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        className="input"
                        placeholder="Enter Sender email"
                        inputProps={ariaLabel}
                        required
                    />
                    <Input
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="input"
                        placeholder="Enter Receiver email"
                        inputProps={ariaLabel}
                        required
                    />
                    <Input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="input"
                        placeholder="Enter Message to Track"
                        inputProps={ariaLabel}
                        required
                    />
                    <Input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="input"
                        placeholder="Enter Time (in seconds)"
                        inputProps={ariaLabel}
                        required
                    />
                    <button type="submit">{!loading ? 'TRACK' : 'Tracking....'}</button>
                </form>
                <div className="track-container">
                    {loading ?
                        <div className="track-progress">
                            <CircularProgress className="progress" />
                        </div>
                        :
                        <div className="track-data">
                            {trackedData.map((data, idx) => {
                                return (
                                    <>
                                        <div className="row" key={data.time + data.user}>
                                            {expanded !== idx ?
                                                <span className='icon' onClick={() => { setExpanded(idx) }} >
                                                    <AddIcon />
                                                </span>
                                                :
                                                <span className='icon' onClick={() => { setExpanded(-1) }}>
                                                    <RemoveIcon />
                                                </span>}
                                        
                                            <div className="msg">
                                                <div className="user">
                                                    {data.sender}
                                                </div>
                                                <div className={`content ${expanded !== idx ? 'hide' : ''}`}>
                                                    <div className="data">Receiver: {data.receiver}</div>
                                                    <div className="data"><div className="key">Message: </div><span className="data" dangerouslySetInnerHTML={{__html: data.msg}}></span></div>
                                                    <div className="data">Time: {data.time&&new Date(parseInt(data.time)).toString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`down ${idx === trackedData.length - 1 ? 'hide' : ''}`}>
                                            <KeyboardDoubleArrowDownIcon />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </>
    )
};

export default Home;
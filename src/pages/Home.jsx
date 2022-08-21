import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'; 
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Header from './Header';
import './Home.scss';
const ariaLabel = { 'aria-label': 'description' };

const Home = (props) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState('');
    const [msg, setMsg] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);

    // once integrate with server, remove this hardcoded data to empty array
    const [trackedData, setTrackedData] = useState([
        {
            user: "raghav@gmail.com",
            msg: "Hello Raghav how are you?",
            time: Date.now().toLocaleString()
        },
        {
            user: "mukati@gmail.com",
            msg: "Hello Raghav how are you?",
            time: Date.now().toLocaleString()
        },
        {
            user: "gurjar@gmail.com",
            msg: "Hello Raghav how are you?",
            time: Date.now().toLocaleString()
        },
        {
            user: "deepak@gmail.com",
            msg: "Hello Raghav how are you?",
            time: Date.now().toLocaleString()
        }
    ]);
    const [expanded, setExpanded] = useState(-1)

    useEffect(() => {
        if (props.userLoggedIn === false || props.user === null) {
            navigate('/login');
        }
    }, []);
    
    const handleTrack = (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            // @shubhank fetch tracking data using user, msg and time payload and
            // setTrackedData() as an array;
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <Header loggedIn={props.loggedIn} user={props.user} />
            <div className="home-container">
                <div className="head">TRACK</div>
                <form className="inputs" onSubmit={handleTrack} >
                    <Input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="input"
                        placeholder="Enter User email"
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
                                                    {data.user}
                                                </div>
                                                <div className={`content ${expanded !== idx ? 'hide' : ''}`}>
                                                    <div className="data">Message: {data.msg}</div>
                                                    <div className="data">Time: {data.time}</div>
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
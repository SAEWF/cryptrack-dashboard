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
import GoogleMapReact from 'google-map-react';
const ariaLabel = { 'aria-label': 'description' };
const metadataKeys = { fileUrl: 'fileUrl', file_id: 'fileId', file_name: 'fileName', latitude: 'latitude', longitude: 'longitude', msg: 'Enter Message', receiver: "Enter Receiver Email", sender: "Enter Sender Email", time: "Enter time in milliseconds" };
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Home = (props) => {
    const navigate = useNavigate();
    
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [msg, setMsg] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [type, setType] = useState('');

    // once integrate with server, remove this hardcoded data to empty array
    const [trackedData, setTrackedData] = useState([]);
    const [expanded, setExpanded] = useState(-1)
    const [formData, setFormData] = useState({ fileUrl: '', file_id: '', file_name: '', latitude: '', longitude: '', msg: '', receiver: "", sender: "", time: "" });

    useEffect(() => {
        if (props.loggedIn === false || props.user === null) {
            navigate('/login');
        }
    }, []);
    
    const handleTrack = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            let jsonBody = formData;
            jsonBody = { ...jsonBody, attachmentData: { fileUrl: formData.fileUrl, file_id: formData.file_id, file_name: formData.file_name, latitude: formData.latitude, longitude: formData.longitude } };
            delete jsonBody.fileUrl;
            delete jsonBody.file_id;
            delete jsonBody.file_name;
            // @shubhank fetch tracking data using user, msg and time payload and
            // const response = await fetch(baseUrl+'users/generateAPIKey', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + props.token
            //     },
            //     body: JSON.stringify({username: props.user['username']})
            // });
            // const data1 = await response.json();
            // console.log(data1);
            // const key = data1.apiKey;
            // const secret = data1.apiSecret;
            console.log(jsonBody);
            const response = await fetch(baseUrl + 'track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'L.W6w9.XpGOYb1iKGfhmW3q0',
                    'apisecret': 'QrwygxP8_32GTSjuXayl_TrAJOuYiGvBYLzb',
                    'username': 'saewf@nitw.com'
                },
                body: JSON.stringify(jsonBody),
            });
            const data = await resp.json();
            if (JSON.stringify(data) == '{}')
                setTrackedData([]);
            else
                setTrackedData(data);
            // console.log(data);
            setType(getType(data[0]?.attachmentData?.fileUrl));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setTrackedData([]);
            console.log(err);
        }
    }
    
    const handleChange = (key, value) => {
        setFormData(prev => { return { ...prev, [key]: value } })
    };

    const getInputs = () => {
        let inputs = [];
        for (let k in metadataKeys) {
            inputs.push(<li>{k}: <input value={formData[k]} key={k} onChange={(e) => handleChange(k, e.target.value)} placeholder={metadataKeys[k]} /></li>)
        }
        return <ul>
            {inputs.map(i => i)}
        </ul>;
    }
    const getType = (input) => {
        if (!input) return;
        let ext = input.split('.')
        let img_extensions = ['jpeg', 'jpg', 'png', 'gif', 'tiff'];
        let vid_extensions = ['mp4', 'mkv'];
        if (img_extensions.includes(ext[ext.length - 1]))
            return 'img';
        else if (vid_extensions.includes(ext[ext.length - 1]))
            return 'video';
        return 'file';
    };

return (
        <>
            <Header loggedIn={props.loggedIn} user={props.user} setUser={props.setUser} setLoggedIn={props.setLoggedIn} />
            <div className="home-container">
                <div className="head">TRACK</div>
                <form className="inputs" onSubmit={handleTrack} >
                    {/* <Input
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
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="input"
                        placeholder="Enter Latitude"
                        inputProps={ariaLabel}
                        required
                    />
                    <Input
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="input"
                        placeholder="Enter Longitude"
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
                    /> */}
                    {getInputs()}
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
                                console.log(data);
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
                                                    {console.log(data.fileUrl)}
                                                    <div className="data">Receiver: {data.receiver}</div>
                                                    <div className="data">Message: {data.msg}</div>
                                                    <div className="data">Time: {data.time}</div>
                                                    <div style={{ height: '40vh', width: '40%' }}>
                                                    <GoogleMapReact
                                                        bootstrapURLKeys={{ key: "AIzaSyCbW_osHSoG74xi7iTxwbZI3Wdrra51iZ8" }}
                                                        defaultCenter={{lat: 31.2444468,lng: 75.7022454}}
                                                        defaultZoom={11}
                                                    >
                                                        <AnyReactComponent
                                                            lat={59.955413}
                                                            lng={30.337844}
                                                            text="My Marker"
                                                        />
                                                    </GoogleMapReact>
                                                    </div>
                                                    <div className="data"><div className="key">Message: </div><span className="data" dangerouslySetInnerHTML={{ __html: data.msg }}></span></div>
                                                    <div className="data">Time: {data.time && new Date(parseInt(data.time)).toString()}</div>
                                                    <div className="data">fileUrl: <a href={data?.attachmentData?.fileUrl}>{data?.attachmentData?.fileUrl}</a></div>
                                                    {
                                                        type === 'img' ?
                                                            <img style={{ height: '100px', width: '100px' }} className="data" src={data?.attachmentData?.fileUrl} />
                                                            :
                                                            type === 'video' ?
                                                                (<video width="320" height="240" controls>
                                                                    <source src={data?.attachmentData?.fileUrl} type="video/mp4" />
                                                                </video>)
                                                                :
                                                                <a href={data?.attachmentData?.fileUrl} target="_blank" >{ data?.attachmentData?.file_name}</a>
                                                    }
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
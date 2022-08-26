import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'; 
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Header from './Header';
import './Home.scss';
import { baseUrl } from '../shared/baseUrl';
const ariaLabel = { 'aria-label': 'description' };
// const metadataKeys = { fileUrl: 'fileUrl', file_id: 'fileId', file_name: 'fileName', latitude: 'latitude', longitude: 'longitude', msg: 'Enter Message', receiver: "Enter Receiver Email", sender: "Enter Sender Email", time: "Enter time in milliseconds" };
const defaultValues = { key: '', value: '' };
const Home = (props) => {
    const navigate = useNavigate();
    
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [msg, setMsg] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    // once integrate with server, remove this hardcoded data to empty array
    const [trackedData, setTrackedData] = useState([]);
    const [expanded, setExpanded] = useState(-1)
    const [count, setCount] = useState(3);
    const [formData, setFormData] = useState([defaultValues, defaultValues, defaultValues]);

    useEffect(() => {
        if (props.loggedIn === false || props.user === null) {
            navigate('/login');
        }
    }, []);
    
    const handleTrack = async (e) => {
        try {
            e.preventDefault();
            console.log(formData);
            let newData = {};
            for (let k in formData) {
                if (formData[k].key)
                    newData[formData[k].key] = formData[k].value;
            }
            console.log(newData);
            setLoading(true);
            let jsonBody = newData;
            jsonBody = { ...jsonBody, attachmentData: { fileUrl: newData.fileUrl, file_id: newData.file_id, file_name: newData.file_name } };
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
            const resp = await fetch(baseUrl + 'track', {
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
    
    const handleChange = (key, value, type) => {
        let temp = formData[key];
        setFormData(prev => { return { ...prev, [key]: { ...temp, [type]: value } } });
    };

    const addNewCount = () => {
        setCount(prev => prev + 1);
        setFormData(d => {
            let temp = d;
            temp[count] = defaultValues;
            console.log(temp);
            return temp;
        })
        // temp.push(defaultValues);
        // setFormData(temp);
    }

    const getInputs = () => {
        let inputs = [];
        inputs.push(
            <li className="row solid">
                <div className="col">KEY</div>
                <div className="col">VALUE</div>
                {/* <ClearIcon /> */}
            </li>
        );
        for (let k = 0; k < count; k++) {
            inputs.push(<li className="row">
                <input className="col" value={formData[k].key} key={k + 'key'} onChange={(e) => handleChange(k, e.target.value, 'key')} placeholder='KEY' />
                <input className="col" value={formData[k].value} key={k + 'value'} onChange={(e) => handleChange(k, e.target.value, 'value')} placeholder='VALUE' />
                {/* <ClearIcon /> */}
            </li>)
        }
        return <ul className="input-form">
            {inputs.map(i => i)}
            {<button className="row" onClick={addNewCount}>ADD NEW</button>}
            <button className="row" type="submit">{!loading ? 'TRACK' : 'Tracking....'}</button>
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
                <div className="home-left">
                    <form className="inputs" onSubmit={handleTrack} >
                        {getInputs()}
                    </form>
                    
                </div>
                <div className="home-right">
                    {/* Right */}
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
                                                        {console.log(data.fileUrl)}
                                                        <div className="data">Receiver: {data.receiver}</div>
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
                                                                    <a href={data?.attachmentData?.fileUrl} target="_blank" >{data?.attachmentData?.file_name}</a>
                                                        }
                                                        {/* <img style={{height: '100px', width: '100px'}} className="data" src={data?.attachmentData?.fileUrl} /> */}
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
            </div>
        </>
    )
};

export default Home;
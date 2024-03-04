import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'

export default function Confirm(props) {
    const [profile, setProfile] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getProfile();
        console.log(profile);
    }, [])

    const getProfile = async () => {
        await axios
            .get(
                `${import.meta.env.VITE_API_ROOT}/profile/${props.loginInfo.username}`
            )
            .then((res) => {
                setProfile(res.data);
            })
    }

    const deleteProfile = async () => {
        await axios
        .delete(
            `${import.meta.env.VITE_API_ROOT}/profiles/${props.loginInfo.username}`
        )
        .catch(err => {
            setErrorMessage('There was an error deleting your data.  Please try again later, or contact marketappwm@gmail.com for any problems.')
            console.log(err);
        });
        await axios
        .delete(
            `${import.meta.env.VITE_API_ROOT}/users/${props.loginInfo.username}`
        )
        .then(() => {
            props.setView({output: true})
        })
        .catch(err => {
            setErrorMessage('There was an error deleting your data.  Please try again later, or contact marketappwm@gmail.com for any problems.')
            console.log(err);
        })
    }

    return (
        <div id="confirm">
            <h2>Are you sure you want to delete this account?</h2>
            <div className='row'>
                <p>This action is </p>
                <p style={{color: 'red', fontWeight: 'bold'}}>&nbsp;IRREVERSIBLE.</p>
            </div>
            <div id="profile">
                <img id="profile-picture" src={`https://marketappwm-django-api.link${profile.profile_picture}`}></img>
                <div id="profile-description">
                    <h3>{profile.username}</h3>
                    {profile.date && (<h5>Date Created: {profile.date}</h5>)}
                </div>
            </div>
            <div id="delete-buttons">
                <button id="yes" onClick={deleteProfile}>YES</button>
                <button id="no" onClick={() => {
                    props.setView({input: true})
                }}>NO</button>
            </div>
            {errorMessage && (<p id="error-message">{errorMessage}</p>)}
        </div>
    )
}

// Confirm.propTypes = {
//     input: PropTypes.boolean,
//     confirm: PropTypes.boolean,
//     output: PropTypes.boolean
// }
import { useState } from 'react';
import axios from "axios";
import './App.css'

export default function Input(props) {

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const verifyUser = async (e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_API_ROOT)
        await axios
        .post(
            `${import.meta.env.VITE_API_ROOT}/users/login/`,
            loginInfo,
        )
        .then(response => {
            if (response.data.login) {
                props.setLoginInfo({
                    username: loginInfo.username,
                    password: loginInfo.password
                })
                props.setView({confirm: true})
            } else {
            setErrorMessage('Invalid Login Credentials.  Please try again.');
            }
        })
        .catch((err) => console.log(err));
    }


    return (
        <div id='input'>
            <h2>Please enter your user information</h2>
            <form>
                <div className='row'>
                    <label htmlFor='username'>Enter your username: </label>
                    <input id="username" placeholder='Username' onChange={(e) => {
                        setLoginInfo({...loginInfo, username: e.target.value})}
                    }/>
                </div>
                <div className='row'>
                    <label htmlFor='password'>Enter your password: </label>
                    <input id="password" type="password" placeholder='Password' onChange={(e) => {
                        setLoginInfo({...loginInfo, password: e.target.value})}
                    }/>
                </div>
                <button onClick={verifyUser}>Next</button>
            </form>
            {errorMessage && (<p id="error-message">{errorMessage}</p>)}
        </div>
    )
}
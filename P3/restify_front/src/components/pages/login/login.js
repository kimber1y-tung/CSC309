import "./login.css";
import React, {useLayoutEffect, useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";
import {mutate} from "swr";
import {useUser} from "../../../hooks/useUser";


function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user } = useUser()
    useLayoutEffect(() => {
        if (user) {
            // console.log("shouild not ")
            navigate("/");
        }
    });

    async function loginHander(e) {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/accounts/user/login/', {
            username,
            password,
        }).then((response) => {  // promise
            const { data } = response;
            const accessToken = data.access;
            if (accessToken) {
                Cookies.set('access_token', accessToken);
                mutate('/auth');
                navigate("/user");
            }
        }).catch((e) => {
            // console.log(e);
            // console.log('login error');
            window.alert("login error!")
        });

        // try {
        //     const response = await axios.post('http://127.0.0.1:8000/accounts/user/login/', {
        //         username,
        //         password,
        //     });
        //     console.log(response)
        // } catch (e) {
        //     console.log('login error');
        // }



    }

    return(<><div>
        <div id="gridcontainerlogin">
            <div id="pic-container">
            <img className='login-image' src="/login-image.jpeg" alt="sign-up-image" />
                {/* <img id='login-image' src="https://acquarestaurantandbar.com/images/banner-bby-restaurant1.jpg"> */}
            </div>
            <div className="login-container">
                <form>
                    <span className="login-form-title" style={{"caretColor": "transparent"}}>Log In</span>
                    <div className="form-group-log">
                      <input type="username" onChange={(e)=>{setUsername(e.target.value)}} value={username} className="form-control" name="username" placeholder="Username" required />
                      {/* <label>Username: </label> */}
                    </div>
                    <div className="form-group-log">
                      <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}className="pwd form-control" name="pwd" placeholder="Password" required />
                      {/* <label >Password: </label> */}
                      {/* <!--TODO: add a show password button later when js is allowed--> */}
                    </div>
                    <button onClick={loginHander} className="btn btn-primary login-button" >Login</button>
                </form>
            </div>
        </div>
        <footer className="aboutsection">
            <div className="footer-top">
                Restify
            </div>
            <div className="footer-bot">
                <ul className="bot-list">
                    <li><a href="">Why Restify?</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">Terms and Conditions</a></li>
                </ul>
            </div>
        </footer>
    </div></>)
}

export default Login;
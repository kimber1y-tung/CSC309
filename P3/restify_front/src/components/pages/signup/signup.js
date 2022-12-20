import "./signup.css";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";
function Signup(){

  const [username, setUsername] = useState('');
  const [first_name, setFirst] = useState('');
  const [last_name, setLast] = useState('');
  const [phone_num, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');

  const navigate = useNavigate();
  async function signupHander(e) {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/accounts/user/signup/', {
        username,
        first_name,
        last_name,
        email,
        phone_num,
        password1: pw1,
        password2: pw2,
        avatar: null,
    }).then((response) => {  
        const { data } = response;
        // const accessToken = data.access;
        // if (accessToken) {
        //     Cookies.set('access_token', accessToken);
        //     navigate("/");
        // }
        window.alert("Signup Successful!");
        navigate("/login");
    }).catch((e) => {
        // if (pw1 != pw2):
          // window.alert("Passowrds dont match");
        // console.log(e);
        // console.log('login error');
        window.alert("Signup Error! Please check the info entered!");
    });

}



    return (<div>
    <div className="gridcontainer">
    <div className="pic-container">
    <img className='sign-up-image' src="/sign-up-image.jpeg" alt="sign-up-image" />
        {/* <img className='sign-up-image' src="http://lobbyrestaurant.ca/lobby/wp-content/uploads/2017/03/room1.jpg"> */}
    </div>
    <div className="sign-up-container">
        <form>
            <span className="sign-up-form-title" style={{"caretColor": "transparent"}}>Sign Up for Restify</span>

            <div className="form-group">
              <input type="username" onChange={(e)=>{setUsername(e.target.value)}} value={username} className="form-control"  placeholder="Username" required />
            </div>

            <div className="form-group">
              <input type="first_name" onChange={(e)=>{setFirst(e.target.value)}} value={first_name} className="form-control"  placeholder="First Name" required />
            </div>

            <div className="form-group">
              <input type="last_name" onChange={(e)=>{setLast(e.target.value)}} value={last_name} className="form-control"  placeholder="Last Name" required />
            </div>

            <div className="form-group">
              <input type="phone" onChange={(e)=>{setPhone(e.target.value)}} value={phone_num} className="form-control"  placeholder="Phone Number" required />
            </div>

            <div className="form-group">
              <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control"  placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="password" onChange={(e)=>{setPw1(e.target.value)}} value={pw1} className="form-control"  placeholder="Password" required />
            </div>
            <div className="form-group">
              <input type="password" onChange={(e)=>{setPw2(e.target.value)}} value={pw2} className="form-control"  placeholder="Comfirm your password" required />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input terms-check"  required />
                <label style={{"caretColor": "transparent"}} className="form-check-label" >I agree with Restify's <a href="">Terms and Conditions</a>.</label>
              </div>
            <small style={{"caretColor": "transparent"}} className="privacy-notice form-text text-muted">We value your privacy. <br /> Your personal information will not be shared.</small>
            <button onClick={signupHander} className="btn btn-primary sign-up-button">Submit</button>
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
</footer></div>)
}

export default Signup;
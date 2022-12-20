// user page

// thanks to ZiiMakc from https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

import './user.css'
import Cookies from 'js-cookie';
import React, { useState, useEffect, useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FormData from 'form-data'

function UserProfile(){
    const [data, setdata] = useState(null)
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [icon, setAvatar] = useState('');
    const [modified , setModified] = useState(0);
    let navigate = useNavigate();

    const fetchMyAPI = useCallback(async() =>  {

        try {
            let res = await fetch(`http://localhost:8000/accounts/user/${Cookies.get('userid')}`)
            res = await res.json()
            setdata(res)

          } catch (e) {
              console.log(e)
            navigate("/login", { replace: true });
      }
    
      
    
    },[])

    async function updateHander(e) {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('first_name', first_name ? first_name : data.first_name);
        form_data.append('last_name', last_name ? last_name : data.last_name);
        form_data.append('email', email ? email : data.email);
        form_data.append('phone_num', phone ? phone : data.phone_num);
        form_data.append('username', data.username);
        if (icon){
          form_data.append('avatar', icon);
        }
        axios({
            method: 'put',
            url: 'http://localhost:8000/accounts/user/edit/',
            data: form_data,
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
                'content-type': 'multipart/form-data'
              }
          }).then((response) => {
            fetchMyAPI()
            setModified(1)
          }).catch((e)=> {
              console.log(e)
          })
    }

    useEffect(() => {
        fetchMyAPI()
        // if (!data){
        //     navigate("/login", { replace: true });
        // }

    }
        , [fetchMyAPI])

    function restSetting(e){
      navigate('rest-setting')
    }
    return (
    <>
    {data?(
<div className="container" id="main_container">
    <div className="title_container" id="profile_form_title">
        Profile
    </div>
    <div className="form_container" id="profile_form_container">
        <form>
            <label className="form-label">First Name</label>
            <div className="form-group">
              <input type="text" className="form-control" name="First-Name" onChange={(e)=>{setFirst(e.target.value)}} defaultValue={data.first_name} required></input>
            </div>
            <label className="form-label">Last Name</label>
            <div className="form-group">
              <input type="text" className="form-control" name="Last-Name" onChange={(e)=>{setLast(e.target.value)}} defaultValue={data.last_name} required></input>
            </div>
            <label className="form-label">Email</label>
            <div className="form-group">
              <input type="email" className="form-control" name="email" onChange={(e)=>{setEmail(e.target.value)}} defaultValue={data.email} required></input>
            </div>
            <label className="form-label">Phone Number</label>
            <div className="form-group">
              <input type="tel" className="form-control" name="phone" onChange={(e)=>{setPhone(e.target.value)}} defaultValue={data.phone_num} pattern="[0-9]{3,4}-[0-9]{3}-[0-9]{4}" required>
              </input></div>
            <label className="form-label">Avatar</label><br></br>
            <img id="avatar_showcase" src={data.avatar}></img>
            <div className="form-group">
                <input type="file" id="avatar_upload" name="avatar" onChange={(e)=>{setAvatar(e.target.files[0])}} accept="image/*"></input>
            </div>
            {modified ? (<p style={{ color: "green"}}><b>Your changes have beed saved.</b></p>): (<></>)}
            <small>All fields are required for effect to take place.</small><br/>
            <button onClick={updateHander} type="submit" id="buttons" className="btn btn-primary" >Confirm</button>
            </form>
            <br/><br/><br/>
            <button onClick={(e)=>restSetting(e)} id="buttons" className="btn btn-primary" >Manage my Restaurant</button>
    </div></div>
    ):(navigate("/login", { replace: true }))}
    </>);

}



export default UserProfile;
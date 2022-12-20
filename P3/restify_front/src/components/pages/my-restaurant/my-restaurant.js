import Cookies from 'js-cookie';
import React, { useState, useEffect, useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FormData from 'form-data'
import './my-restaurant.css'

function MyRestaurant(){

    const [name, setName] = useState('');
    const [pos, setPos] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [icon, setLogo] = useState('');
    const [modified , setModified] = useState(0);

    const[rest, setRest] = useState(null);

const fetchMyAPI = useCallback(async() =>  {

    try {
        let res = await fetch(`http://localhost:8000/restaurants/get-user-rest/${Cookies.get('userid')}`)
        res = await res.json()
        setRest(res)

      } catch (e) {
          console.log(e)
  }

  

},[])

useEffect(() => {
  fetchMyAPI()

}
  , [fetchMyAPI])

async function updateHander(e) {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('name', name ? name : rest.name);
    form_data.append('address', address ? address : rest.address);
    form_data.append('postal_code', pos ? pos : rest.postal_code);
    form_data.append('phone_num', phone ? phone : rest.phone_num);
    // form_data.append('username', data.username);
    if (icon){
      form_data.append('logo', icon);
    }
    axios({
        method: 'put',
        url: 'http://localhost:8000/restaurants/update_restaurants/',
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

async function createHandler(e){
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('name', name);
    form_data.append('address', address);
    form_data.append('postal_code', pos);
    form_data.append('phone_num', phone);
    form_data.append('logo', icon);

    axios({
        method: 'post',
        url: 'http://localhost:8000/restaurants/create_restaurants/',
        data: form_data,
        headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
            'content-type': 'multipart/form-data'
          }
      }).then((response) => {
        fetchMyAPI()
      }).catch((e)=> {
          console.log(e)
      })
}



return(<>
{rest?(

<div className="container" id="main_container">
      
      
      <div className="title_container" id="restaurant_form_title">
           My Restaurant
      </div>
      <div className="form_container" id="restaurant_form_container">
          <form>
              <label className="form-label">Name</label>
              <div className="form-group">
                <input type="text" className="form-control" name="name" onChange={(e)=>{setName(e.target.value)}} defaultValue={rest.name} required></input>
              </div>
              <label className="form-label">Address</label>
              <div className="form-group">
                <input type="text" className="form-control" name="address" onChange={(e)=>{setAddress(e.target.value)}} defaultValue={rest.address} required></input>
              </div>
              <label className="form-label">Postal Code</label>
              <div className="form-group">
                <input type="text" className="form-control" name="postal" onChange={(e)=>{setPos(e.target.value)}} defaultValue={rest.postal_code} pattern="[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}" required></input>
              </div>
              <label className="form-label">Phone Number</label>
              <div className="form-group">
                <input type="tel" className="form-control" name="phone" onChange={(e)=>{setPhone(e.target.value)}} defaultValue={rest.phone_num} pattern="\([0-9]{3,4}\)-[0-9]{3}-[0-9]{4}" required></input>
              </div>
              <label className="form-label">Logo</label><br></br>
              <img id="avatar_showcase" src={`http://localhost:8000${rest.logo}`} width="20%"></img>
              <div className="form-group">
                  <input type="file" id="avatar_upload" name="avatar" onChange={(e)=>{setLogo(e.target.files[0])}} accept="image/*"></input>
              </div>
              
              {modified ? (<p style={{ color: "green"}}><b>Your changes have beed saved.</b></p>): (<></>)}
              <small>All fields are required for effect to take place.</small><br/>
              <button onClick={updateHander} type="submit" id="buttons" className="btn btn-primary" >Confirm</button>
          </form>
      </div>

      
</div>

):(<div className="container" id="main_container">
      
      
<div className="title_container" id="restaurant_form_title">
     Add Restaurant
</div>
<div className="form_container" id="restaurant_form_container">
    <form>
        <label className="form-label">Name</label>
        <div className="form-group">
          <input type="text" className="form-control" name="name" onChange={(e)=>{setName(e.target.value)}} required></input>
        </div>
        <label className="form-label">Address</label>
        <div className="form-group">
          <input type="text" className="form-control" name="address" onChange={(e)=>{setAddress(e.target.value)}} required></input>
        </div>
        <label className="form-label">Postal Code</label>
        <div className="form-group">
          <input type="text" className="form-control" name="postal" onChange={(e)=>{setPos(e.target.value)}} pattern="[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}" required></input>
        </div>
        <label className="form-label">Phone Number</label>
        <div className="form-group">
          <input type="tel" className="form-control" name="phone" onChange={(e)=>{setPhone(e.target.value)}} pattern="\([0-9]{3,4}\)-[0-9]{3}-[0-9]{4}" required></input>
        </div>
        <label className="form-label">Logo</label><br></br>
        <img id="avatar_showcase" width="20%"></img>
        <div className="form-group">
            <input type="file" id="avatar_upload" name="avatar" onChange={(e)=>{setLogo(e.target.files[0])}} accept="image/*" required></input>
        </div>
        {modified ? (<p style={{ color: "green"}}><b>Your changes have beed saved.</b></p>): (<></>)}
        <small>All fields are required for effect to take place.</small><br/>
        <button onClick={createHandler} type="submit" id="buttons" className="btn btn-primary" >Confirm</button>
    </form>
</div>

</div>)}



</>
)


}

export default MyRestaurant
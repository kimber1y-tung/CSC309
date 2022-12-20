import Cookies from 'js-cookie';
import React, { useState, useEffect, useCallback, useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FormData from 'form-data'
import './my-restaurant.css'

let PageSize = 10;

function Menu() {
    const[page, setPage] = useState(1);
    const[rest, setRest] = useState(null);
    const[menu, setMenu] = useState(0);
    const[items, setItems] = useState(null);
    const[next, setNext] = useState(false);
    const[prev, setPrev] = useState(false);
    let id=0;

    

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
    
    async function GetMenu(e) {
        e.preventDefault();
        axios({
            method: 'get',
            url: `http://localhost:8000/restaurants/get_restaurant_menu/${rest.id}?page=${page}`,
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
              }
          }).then((response) => {
              setPage(page)
            if (response.data.next != null){
                setNext(true)
            }
            else {
                setNext(false)
            }
            if (response.data.previous != null){
                setPrev(true)
            }
            else {
                setPrev(false)
            }
            setItems(response.data.results)
            setMenu(1)

          }).catch((e)=> {
              console.log(e)
          })
    }

    async function GetMenuNext(e) {
        e.preventDefault();
        setPage(page+1)
        axios({
            method: 'get',
            url: `http://localhost:8000/restaurants/get_restaurant_menu/${rest.id}?page=${page+1}`,
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
              }
          }).then((response) => {
              setPage(page+1)
            if (response.data.next != null){
                setNext(true)
            }
            else {
                setNext(false)
            }
            if (response.data.previous != null){
                setPrev(true)
            }
            else {
                setPrev(false)
            }
            setItems(response.data.results)
            setMenu(1)

          }).catch((e)=> {
              console.log(e)
          })
    }
    async function GetMenuPrev(e) {
        e.preventDefault();
        axios({
            method: 'get',
            url: `http://localhost:8000/restaurants/get_restaurant_menu/${rest.id}?page=${page-1}`,
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
              }
          }).then((response) => {
              setPage(page-1)
            if (response.data.next != null){
                setNext(true)
            }
            else {
                setNext(false)
            }
            if (response.data.previous != null){
                setPrev(true)
            }
            else {
                setPrev(false)
            }
            setItems(response.data.results)
            setMenu(1)

          }).catch((e)=> {
              console.log(e)
          })
    }

    return (<>{fetchMyAPI}
        {rest?(<><div className="container" id="main_container">
    <div className="title_container" id="menu_form_title">
    Menu
    <br/>
</div>
<div className="form_container" id="menu_form_container">
    {menu ? (<></>):(<button id="buttons" className="btn btn-light" onClick={GetMenu}>Load Menu</button>)}
    <form>
    <ul id="menu">
        {items?(items.map(item => {
            id++;
            return (
                <li key={id}>Name: {item.name}<br/>
                image: <img src={item.img} width="20%"></img><br/>
                Price: {item.price}</li>
                
            );
          })):(<></>)}      
    </ul>
    {prev?(<button className='btn btn-light' onClick={GetMenuPrev}>Prev</button>):(<button className='btn btn-light' disabled>Prev</button>)}
    {next?(<button className='btn btn-light' onClick={GetMenuNext}>Next</button>):(<button className='btn btn-light' disabled>Next</button>)}
    <button id="buttons" className="btn btn-primary">Add</button>
    </form>
</div></div></>):(<></>)}</>)
}
export default Menu;
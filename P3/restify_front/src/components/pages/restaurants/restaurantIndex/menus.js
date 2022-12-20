import React from "react";
import style from '../src/restaurants.css'
import {useEffect, useState} from "react";
import Star from "./star";
import { useLocation } from "react-router-dom"

const Menus = () => {
    const sampleLocation = useLocation();
    let pagenum = sampleLocation.pathname.split("/")[3]
    const [restaurantMenuDetail, setRestaurantMenuDetail] = useState({})
    const [restaurantDetail, setrestaurantDetail] = useState({})
    console.log("check debug")
    useEffect( ()=> {
        fetch(`http://127.0.0.1:8000/restaurants/get_restaurant_menu/${pagenum}`)
            .then(response => response.json())
            .then(res => setRestaurantMenuDetail(res))
        fetch(`http://127.0.0.1:8000/restaurants/get_restaurants/${pagenum}`)
            .then(response => response.json())
            .then(json => {
                setrestaurantDetail(json)
            })
    },[pagenum])
    return (<>
        <div>
            <meta charSet="UTF-8"/>
            <title>Restaurants</title>
            <div id="background">
                <div id="info_div">
                    <div id="info_left">
                        <h1 id="restaurant_name"></h1>
                        <h1 id="restaurant_address">Postcode : </h1>
                        <h1 id="restaurant_address2">Address : 27 King's College Cir, Toronto, ON M5S 1A1 </h1>
                        <h1 id="restaurant_phone"></h1>
                        <button type="button" className="btn btn-outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                 className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path
                                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fillRule="evenodd"
                                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            3,000 follow
                        </button>

                    </div>
                    <div id="info_right">
                        <img
                            src={restaurantDetail.logo}
                            width="40%" height="auto" id="macdonald"/>
                    </div>
                </div>
                <div id="food_drinks">
                    <div className="container" id="popular_food">
                        <div className="row">
                            <div className="col-md-11">
                                <h1>Popular Food</h1>
                            </div>
                            <div className="col-md-1">
                                <input type="button" defaultValue="All food>>" className="button"/>
                            </div>
                        </div>
                    </div>
                    <div id="recommend_food" className="composing">
                        <div id="menu" className="pic_composing">
                            {restaurantMenuDetail.results && restaurantMenuDetail.results.map(
                                (menu,index) =>{
                                    return <>
                                        <div id="first_food" key={index}>
                                            <img
                                                src={menu.img}
                                                width="80%"/>
                                            <h6>{menu.name}</h6>
                                            <h6>CA${menu.price}</h6>
                                        </div>
                                    </>
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}
export default Menus
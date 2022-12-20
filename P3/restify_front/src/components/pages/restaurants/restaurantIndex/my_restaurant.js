import React from "react";
import style from '../src/restaurants.css'
import {useEffect, useState, useCallback} from "react";
import Star from "./star";
import {Link, Redirect, useLocation} from 'react-router-dom';
import Cookies from "js-cookie";
import { withRouter } from 'react-router-dom'
import axios from "axios";
const My_restaurant = ({restaurant_id}) => {
    const [restaurantMenuDetail, setRestaurantMenuDetail] = useState({})
    const [restaurantDetail, setrestaurantDetail] = useState({})
    const [restaurantBlogDetail, setRestaurantBlogDetail] = useState({})
    const [restaurantCommentDetail, setRestaurantCommentDetail] = useState({})
    const [restaurantFollower, setRestaurantFollowerDetail] = useState({})
        const[rest, setRest] = useState(null);
    let userToken = "Bearer "
    userToken += "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMTgwMzUwLCJpYXQiOjE2NTAyODAzNTAsImp0aSI6IjhkMDlhNjc0OTJjZTRkYTBhOWUxYjc5NWM1MzEzYWQ4IiwidXNlcl9pZCI6NDV9.T-SvlbOge1rVIPHzk07L2jJ0PpNlFR-bfyCCanAAJAU"

    


    function refresh(){
        fetch(`http://127.0.0.1:8000/restaurants/get_followed/${restaurant_id}`)
            .then(response => response.json())
            .then(json => {
                setRestaurantFollowerDetail(json)
            })
    }

    function followerRestaurant(){
        let restaurant = restaurant_id;
        axios.put("http://127.0.0.1:8000/social_network/follow/",{
            restaurant
        },{
            method: 'put',
            headers :{
                'Authorization' : userToken,
                'Content-Type': 'application/json',
            }
        }).then(res => console.log(res))
        window.alert("Successfully followed!")
        refresh();
    }

    function likeRestaurant(){
        let restaurant = restaurant_id;
        axios.put("http://127.0.0.1:8000/social_network/like_restaurant/",{
            restaurant
        },{
            method: 'put',
            headers :{
                'Authorization' : userToken,
                'Content-Type': 'application/json',
            }
        }).then(res => console.log(res))
        window.alert("Liked!")
        refresh();
    }

    function likeComment(){
        let restaurant = restaurant_id;
        axios.put("http://127.0.0.1:8000/social_network/like_restaurant/",{
            restaurant
        },{
            method: 'put',
            headers :{
                'Authorization' : userToken,
                'Content-Type': 'application/json',
            }
        }).then(res => console.log(res))
        window.alert("Successfully followed!")
        refresh();
    }


    function dislikeRestaurant(){
        let restaurant = restaurant_id;
        axios.put("http://127.0.0.1:8000/social_network/unlike_restaurant/",{
            restaurant
        },{
            method: 'put',
            headers :{
                'Authorization' : userToken,
                'Content-Type': 'application/json',
            }
        }).then(res => console.log(res))
        window.alert("Disliked!")
        refresh();
    }

    const fetchMyAPI = useCallback(async() =>  {

        try {
            let res = await fetch(`http://localhost:8000/restaurants/get-user-rest/${Cookies.get('userid')}`)
            res = await res.json()
            setRest(res)
            restaurant_id = res.id
            fetch(`http://127.0.0.1:8000/restaurants/get_restaurant_menu/${res.id}`)
            .then(response => response.json())
            .then(res => setRestaurantMenuDetail(res))
        fetch(`http://127.0.0.1:8000/restaurants/get_restaurants/${res.id}`)
            .then(response => response.json())
            .then(json => {
                setrestaurantDetail(json)
            })
        fetch(`http://127.0.0.1:8000/restaurants/get_blogs/${res.id}`)
            .then(response => response.json())
            .then(json => {
                setRestaurantBlogDetail(json)
            })
        fetch(`http://127.0.0.1:8000/restaurants/get_comments/${res.id}}`)
            .then(response => response.json())
            .then(json => {
                setRestaurantCommentDetail(json)
            })

        fetch(`http://127.0.0.1:8000/restaurants/get_followed/$${res.id}`)
            .then(response => response.json())
            .then(json => {
                setRestaurantFollowerDetail(json)
            })
    
          } catch (e) {
              console.log(e)
      }
    
      
    
    },[])





    useEffect( ()=> {
        fetchMyAPI()
        
        

    },[restaurant_id])
    return (<>
        <div>
            <meta charSet="UTF-8"/>
            <title>Restaurants</title>
            
            <div id="background">
                <div id="info_div">
                    <div id="info_left">
                    <h1 id="restaurant_name">{restaurantDetail.name}</h1>
                        <h2 id="restaurant_address2">Address : {restaurantDetail.address} </h2>
                        <h3 id="restaurant_phone">{restaurantDetail.phone_num}</h3>
                        <h1 id="restaurant_phone"></h1>
                        <button type="button" className="btn btn-outline-primary"
                                onClick={followerRestaurant}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                 className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path
                                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fillRule="evenodd"
                                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            {restaurantFollower && restaurantFollower.follower} follow
                        </button>

                        <button type="button" className="btn btn-outline-success"
                            onClick={likeRestaurant}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                 className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                <path
                                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                            </svg>
                            {restaurantFollower && restaurantFollower.like_num} like
                        </button>

                        <button type="button" className="btn btn-outline-secondary" onClick={dislikeRestaurant}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                 className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                <path
                                    d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                            </svg>
                            {restaurantFollower && restaurantFollower.dislike_num} dislike
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
                                <Link to={`/restaurant/all_menu/${restaurant_id}`}>
                                    <input type="button" defaultValue="All food>>" className="button"/>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div id="recommend_food" className="composing">
                        <div id="menu" className="pic_composing">
                            <div id="first_food">
                                <img
                                    src={restaurantMenuDetail.results && restaurantMenuDetail.results[1].img}
                                    width="80%"/>
                                <h6>{restaurantMenuDetail.results && restaurantMenuDetail.results[1].name}</h6>
                                <h6>CA${restaurantMenuDetail.results && restaurantMenuDetail.results[1].price}</h6>
                            </div>
                            <div id="second_food">
                                <img
                                    src={restaurantMenuDetail.results && restaurantMenuDetail.results[2].img}
                                    width="80%"/>
                                <h6>{restaurantMenuDetail.results && restaurantMenuDetail.results[2].name}</h6>
                                <h6>CA${restaurantMenuDetail.results && restaurantMenuDetail.results[2].price}</h6>
                            </div>
                            <div id="third_food">
                                <img
                                    src={restaurantMenuDetail.results && restaurantMenuDetail.results[3].img}
                                    width="80%"/>
                                <h6>{restaurantMenuDetail.results && restaurantMenuDetail.results[3].name}</h6>
                                <h6>CA${restaurantMenuDetail.results && restaurantMenuDetail.results[3].price}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="blogs">
                    <div className="container" id="popular_blog">
                        <div className="row">
                            <div className="col-md-11">
                                <h1>Popular Blog</h1>
                            </div>
                            <div className="col-md-1">

                                <Link to={`/restaurant/all_blog/${restaurant_id}`}>
                                    <button className="blog_button">
                                        <a href="blog.html" style={{textDecoration: 'none'}}>All blog&gt;&gt;</a>
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div id="blog_section" className="composing">
                        <div id="post_list" className="pic_composing">
                            {/*{restaurantMenuDetail.results && restaurantMenuDetail.results[2].img}*/}
                            {restaurantBlogDetail.results && restaurantBlogDetail.results.map( (blog,index) =>
                            {
                                return<>
                                    <div className="card" id="first_post" key={index}>
                                        <img src={restaurantMenuDetail && restaurantMenuDetail.results && restaurantMenuDetail.results[4 + index].img}
                                             width="100%" height="auto"/>
                                        <div className="card-body">
                                            <div className="blog_title">
                                                <h3>
                                                    <h6>{blog.title}</h6>
                                                </h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <img
                                                        src={blog.poster_avatar}
                                                        className="rounded-circle" alt="Cinque Terre"/>
                                                    <h5>{blog.poster_name}</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <button type="button" className="btn btn-outline-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                             fill="currentColor" className="bi bi-hand-thumbs-up"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                        </svg>

                                                        {blog.likes_num} like
                                                    </button>
                                                    <button type="button" className="btn btn-outline-secondary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                             fill="currentColor" className="bi bi-hand-thumbs-down"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                        </svg>
                                                        {blog.dislikes_num} dislike
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            )}
                        </div>
                    </div>
                </div>

                <div id="comments">
                    <div className="container" id="popular_comment">
                        <div className="row">
                            <div className="col-md-11">
                                <h1>Popular Comments</h1>
                            </div>
                            <div className="col-md-1">
                                <Link to={`/restaurant/all_comment/${restaurant_id}`}>
                                    <input type="button" defaultValue="All Comments>>" className="button"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {restaurantCommentDetail.results && restaurantCommentDetail.results.map( (comment,index) =>{
                        if(index > 5){
                            return <></>
                        }
                        return <>
                            <div className="card" id="first_comment" key={index}>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <Star num={comment.score}/>
                                        </div>
                                        <div className="col-md-2">
                                            <p>{comment.date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img
                                                src={comment.poster_avatar}
                                                className="rounded-circle" alt="Cinque Terre"/>
                                            <h5>{comment.poster_name}</h5>

                                        </div>
                                        <div className="col-md-10">
                                            <p>{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8"/>
                                        <div className="col-md-2">
                                            <button type="button" className="btn btn-outline-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={60} height={16}
                                                     fill="currentColor" className="bi bi-hand-thumbs-up"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                </svg>
                                                <br/>
                                                {comment.likes_num + " like"}
                                            </button>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" className="btn btn-outline-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={16}
                                                     fill="currentColor" className="bi bi-hand-thumbs-down"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                </svg>
                                                {comment.dislikes_num + " dislike"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    })
                    }
                    <div className="card" id="first_comment">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </div>
                                <div className="col-md-2">
                                    <p>{restaurantCommentDetail.results && restaurantCommentDetail.results[0].date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2">
                                    <img
                                        src="https://img1.baidu.com/it/u=3985576582,42348778&fm=253&fmt=auto&app=138&f=JPEG?w=320&h=320"
                                        className="rounded-circle" alt="Cinque Terre"/>
                                    <h5>{restaurantCommentDetail.results && restaurantCommentDetail.results[0].poster_name}</h5>

                                </div>
                                <div className="col-md-10">
                                    <p>{restaurantCommentDetail.results && restaurantCommentDetail.results[0].content}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8"/>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-outline-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                             fill="currentColor" className="bi bi-hand-thumbs-up"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                        </svg>
                                        {restaurantCommentDetail.results && restaurantCommentDetail.results[0].likes_num} like
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-outline-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                             fill="currentColor" className="bi bi-hand-thumbs-down"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                        </svg>
                                        {restaurantCommentDetail.results && restaurantCommentDetail.results[0].dislikes_num} dislike
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-2">
                                    <img
                                        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F15%2F20180115165139_VY8yW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647191898&t=ef30d33b709f2b960cafdabd6c7447a2"
                                        className="rounded-circle" alt="Cinque Terre"/>
                                    <h5>Tom</h5>
                                </div>
                                <div className="col-md-8">
                                    <p>Thx for sharing!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="write_comment">
                    <div className="container">
                        <div>
                            <form>
                                    <textarea className="text_box" id="multi-line_box"
                                              placeholder="Tell us about how you like our restaurant"
                                              defaultValue={""}/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="button" className="btn btn-info" id="submit_comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                 fill="currentColor" className="bi bi-chat-right-dots"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                                <path
                                                    d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}
export default My_restaurant
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signup from './components/pages/signup/signup';
import Login from './components/pages/login/login';
import Nav from './components/nav/navigation_bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './components/pages/user/user';
import RestaurantIndex from "./components/pages/restaurants/restaurantIndex";
import My_restaurant from "./components/pages/restaurants/restaurantIndex/my_restaurant";
import Menus from "./components/pages/restaurants/restaurantIndex/menus";
import Comments from "./components/pages/restaurants/restaurantIndex/comments";
import Blogs from "./components/pages/restaurants/restaurantIndex/blogs";
import Logout from "./components/pages/login/logout"
import EachRestaurant from "./components/pages/restaurants/restaurantIndex/eachRestaurant";
import BlogContent from './components/pages/blog/blog';
import MyRestaurant from "./components/pages/my-restaurant/my-restaurant"
import Menu from "./components/pages/my-restaurant/menu"
function App() {
    return (
    <div className="App">
      {/* <h1>Welcome to React Router!</h1> */}
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/signup" element={<><Nav /><Signup /></>} />
        <Route path="/feed" element={<><Nav /></>} />
        {/*<Route path="/my-restaurant" element={<><Nav /><MyRestaurant/><Menu/></>} />*/}
        <Route path="/restaurant/all_menu/:id" element={<Menus/>}/>
        <Route path="/restaurant/all_comment/:id" element={<Comments/>}/>
        <Route path="/restaurant/all_blog/:id" element={<Blogs/>}/>
          <Route path="/restaurant/:id" element={<><Nav /><EachRestaurant/></>}/>
        <Route path="/user" element={<><Nav /><UserProfile/></>} />
        {/* <Route path="about" element={<About />} /> */}
        <Route path="/login" element={<><Nav /><Login /></>} />
        <Route path="/logout" element={<Logout />} />
          <Route path="/my-restaurant" element={
              <>
                  <Nav />
                  <My_restaurant restaurant_id={60}/>
              </>
          } >
          </Route>
          <Route path="user/rest-setting" element={<><Nav /><MyRestaurant /><Menu  /></>} />
        <Route path="/blog/:id" element={<><Nav /><BlogContent /></>} />
      </Routes>
    </div>
  );
}
export default App;

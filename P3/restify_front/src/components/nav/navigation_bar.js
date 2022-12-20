import React, {useState} from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import Cookies from "js-cookie";
import axios from "axios";
import {mutate} from "swr";
import {useUser} from "../../hooks/useUser";

function Nav_() {
  const { user } = useUser();
  const navigate = useNavigate();

  async function getUser() {
    if (Cookies.get("access_token")){
    axios({
        method: "get",
        url: 'http://localhost:8000/accounts/user/edit',
        headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
      }).then((res) => {
        Cookies.set('userid', res.data['id'])
        // setId(res.data['id'])
      }
        )
    }
        
  }

    const logoutHandler = () => {
      if (Cookies.get('access_token')) {
          Cookies.remove('access_token')
          Cookies.remove('userid')
          mutate('/auth');
          window.alert("Logout successful! Please click on Login to Login!")
          navigate("/login");
      }
    }
  
    return (<Navbar bg="light" expand="lg">
    <Container>
    <Navbar.Brand as={NavLink} to='/'><img src="/logo.png" alt="image" height="50" width="50"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/feed">Feed</Nav.Link>
            {Cookies.get('access_token') ? (<Nav.Link as={NavLink} to="/my-restaurant">My Restaurant</Nav.Link>):(<Nav.Link as={NavLink} to="/my-restaurant" disabled>My Restaurant</Nav.Link>)}
            <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
            {/* {Cookies.get('access_token') ? (<Nav.Link as={NavLink} to="/logout"><b style={{color: 'darkred'}}><u>Logout</u></b></Nav.Link>) : (<Nav.Link as={NavLink} to="/login">Login</Nav.Link>)} */}
            {Cookies.get('access_token') ? (<Nav.Link onClick={logoutHandler}><b style={{color: 'darkred'}}><u>Logout</u></b></Nav.Link>) : (<Nav.Link as={NavLink} to="/login">Login</Nav.Link>)}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
        <FormControl
          type="search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Nav.Link as={NavLink} to='/user' onMouseEnter={(e)=>{getUser()}}><img src="/user_icon.png" alt="image" height="50" width="50"/></Nav.Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
    
    
}

    


export default Nav_;


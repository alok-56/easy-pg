import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.jpeg'
import './Navbar.css'
import { ToastContainer, toast } from "react-toastify";

const Navpage = () => {
    const [lat, setlat] = useState('')
    const [lon, setlon] = useState('')
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     console.log(position.coords.latitude)
        //     console.log(position.coords.longitude)
        // });
        let data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            setLoad(true)
        }
    }, [])
    function logout() {
        localStorage.clear();
        setLoad(false);
        toast("login out succuessfully")
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div>
                <Navbar collapseOnSelect expand="md" style={{ backgroundColor: "black" }} variant="dark"  >
                    <Container>
                        <Navbar.Brand id="link" style={{ fontSize: "20px" }} href="/"><h2>EasyPg</h2></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="m-auto" >
                                <Nav.Link><NavLink id="link" to="/">Home</NavLink></Nav.Link>
                                <Nav.Link><NavLink id="link" to="/Rooms">Rooms</NavLink></Nav.Link>
                                <Nav.Link><NavLink id="link" to="/mess" >Download App</NavLink></Nav.Link>
                                {
                                    load ? <Nav.Link><NavLink id="link" to="/Signin" onClick={logout}>Logout</NavLink></Nav.Link>
                                        : <Nav.Link><NavLink id="link" to="/Signup" >Sign in</NavLink></Nav.Link>
                                }
                            </Nav>
                            <Nav>

                                <Nav.Link><NavLink id="link" to="/profile">Profile</NavLink></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

export default Navpage;
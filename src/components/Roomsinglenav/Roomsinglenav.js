import React from "react";
import './Roomsinglenav.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import Roomsingle from "../Roomsingle/Roomsingle";
import Footer from "../Footer/Footer";
import logo from './images/logo.jpeg'



const Roomsinglenav = () => {
    return (
        <div>
            <div id="roomnav">
                <div className="container-fluid ">
                    <div className="row text-center">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6  mt-2 ">
                            <h4><img width={100} src={logo}></img></h4>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6 col-6  mt-2 text-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ borderRadius: "50%",backgroundColor:"aqua" }}>
                                    <i class="fa-solid fa-user"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link id="link" style={{ color: "black" }} to="/profile">profile</Link></Dropdown.Item>
                                    <Dropdown.Item><Link id="link" style={{ color: "black" }} to="/">home</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Roomsingle></Roomsingle>
            <Footer></Footer>
        </div>
    )
}

export default Roomsinglenav;
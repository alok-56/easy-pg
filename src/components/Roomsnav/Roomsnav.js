import React, { useState } from "react";
import "./Roomsnav.css"
import Dropdown from 'react-bootstrap/Dropdown';
import Roomslist from "../Roomslist/Roomslist";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import logo from './images/logo.jpeg'

const Roomsnav = () => {
    const[dta,setDta]=useState('')
    return (
        <div>
            <div id="roomnav">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-9 order-first mt-2 ">
                            <h4><img width={100} src={logo}></img></h4>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 order-last mt-2">
                            <div id="search">
                                <span><input value={dta} onChange={(e)=>setDta(e.target.value)} type="text" placeholder="Enetr location/college/school"></input><span id="btn"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3 col-md-3 col-3 order-lg-last mt-2 text-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ borderRadius: "50%",backgroundColor:"aqua" }}>
                                    <i class="fa-solid fa-user"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link id="link" style={{color:"black"}} to="/profile">profile</Link></Dropdown.Item>
                                    <Dropdown.Item><Link id="link" style={{color:"black"}}  to="/">home</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Roomsnav;
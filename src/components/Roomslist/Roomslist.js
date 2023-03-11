import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './images/logo.jpeg'
import { Link, useNavigate } from "react-router-dom";
import b1 from "./images/rooms.jpg"
import './Roomslist.css'
import "./Roomsnav.css"
import Footer from "../Footer/Footer";

const Roomslist = () => {
    const [room, SetRoom] = useState('')
    const [se, setSe] = useState('')
    const navigate = useNavigate();
    

    useEffect(() => {
        AllRoom();
    }, [])
    const AllRoom = async () => {
        let data = await fetch(`http://localhost:4500/room/roomlist`);
        data = await data.json();
        SetRoom(data);
    }
    const search = async (event) => {
        let key=event.target.value;
        console.log(key)
        if (key) {
            let result = await fetch(`http://localhost:4500/room/searchroom/${key}`);
            result = await result.json();
            if (result) {
                SetRoom(result)
            }
        }
        else {
            AllRoom()
        }
    }
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
                                <span><input onChange={search} type="text" placeholder="Enetr location/college/school"></input><span id="btn"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3 col-md-3 col-3 order-lg-last mt-2 text-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ borderRadius: "50%", backgroundColor: "aqua" }}>
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

            <div className="container mt-2">
                <div className="row">
                    <div className="col-12" id="roomlist">
                        {
                            room && room.length > 0 ?
                                room.slice(0).reverse().map((item) => (
                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12 ">
                                            <div id="img">
                                                <img className="img-fluid" src={b1} alt="roomlist"></img>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                            <div id="info">
                                                <div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                        <div>
                                                            <span><span style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>Rs {item.Fullroomprice}</span> <span style={{ fontSize: "12px" }}>onwards</span></span><br></br>
                                                            <span><span style={{ fontWeight: "bold", fontSize: "15px" }}>{item.roomname} / </span> <span style={{ fontSize: "12px" }}>in {item.address}</span>  </span><br></br>
                                                            <span><span style={{ fontWeight: "bold", fontSize: "15px" }}> {item.district}</span> {item.state}</span>
                                                        </div>
                                                        <div>
                                                            <span id="girls">{item.Preferred}</span>
                                                        </div>
                                                    </div>

                                                    <hr></hr>
                                                    <div id="cont">
                                                        <span><span>Single room</span><br></br><span style={{ fontWeight: "bold", fontSize: "15px" }}>{item.Fullroomprice}</span></span>
                                                        <span><span>Single bed</span><br></br><span style={{ fontWeight: "bold", fontSize: "15px" }}>{item.Siglebedprice}</span></span>

                                                    </div>
                                                    <hr></hr>
                                                </div>
                                                <div>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <button className="btn btn-danger" onClick={() => navigate('/Rooms/single/' + item._id)}>View details</button><Link id="link" to="/Rooms/single + item._id"></Link>
                                                    <button className="btn btn-danger">Owner info</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                        }
                    </div>

                </div>
            </div>
            <Footer></Footer>
            {/* <div className="container mt-2">
                <div className="row">
                    <div className="col-12" id="roomlist">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div id="img">
                                    <img className="img-fluid" src={b1}></img>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                <div id="info">
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                                            <div>
                                                <span><span style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>Rs 2000</span> <span style={{ fontSize: "12px" }}>onwards</span></span><br></br>
                                                <span><span style={{ fontWeight: "bold", fontSize: "15px" }}>Indrasan PG / Paying Guest</span> <span style={{ fontSize: "12px" }}>in Kailash nagar</span>  </span><br></br>
                                                <span><span style={{ fontWeight: "bold", fontSize: "15px" }}> 61 km</span> from bhilai</span>
                                            </div>
                                            <div>
                                                <span id="girls">girls</span>
                                            </div>

                                        </div>

                                        <hr></hr>
                                        <div id="cont">
                                            <span><span>Single room</span><br></br><span style={{ fontWeight: "bold", fontSize: "15px" }}>2466</span></span>
                                            <span><span>twins share</span><br></br><span style={{ fontWeight: "bold", fontSize: "15px" }}>2466</span></span>

                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button className="btn btn-danger"><Link id="link" to="/Rooms/single">View details</Link></button>
                                        <button className="btn btn-danger">Onwer info</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}

        </div>
    )
}

export default Roomslist;
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import r1 from "./images/pg1.jfif"
import r2 from "./images/pg2.jfif"
import r3 from "./images/pg3.jfif"
import { Link } from 'react-router-dom';
import "./Toppg.css"

const Toppg = () => {
    return (
        <div>
            <div className='container mt-3'>
                <h2>Top Rooms</h2>
                <div className='row mt-4'>
                    <Carousel >
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={r1}
                                alt="First slide"
                                style={{ height: "300px" }}
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={500}>
                            <img
                                className="d-block w-100"
                                src={r3}
                                alt="Second slide"
                                style={{ height: "300px" }}
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={r2}
                                alt="Third slide"
                                style={{ height: "300px" }}
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <div>
                <div className='container mt-4'>
                    <h4>Find a PG & mess Away from your Home</h4>
                    <div className='row mt-2'>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-12 mt-2'>
                            <div id='pg1'>
                                <div>
                                    <p style={{ color: "#fff", fontSize: "20px", position: "relative", top: "70px", fontWeight: "bold", textAlign: "center" }}>Students Friendly pg</p>
                                    <span id='expo' style={{ color: "red",fontWeight:"bold" }}><Link id="link" to="/rooms" style={{color:"red",fontWeight:"bold",fontSize:"25px"}}>Explore</Link>
                                        <i style={{ marginTop: "8px", marginLeft: "10px", fontSize: "20px" }} class="fa-solid fa-greater-than"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-12 mt-2'>
                            <div id='pg2'>
                                <p style={{ color: "#fff", fontSize: "25px", position: "relative", top: "70px", textAlign: "center", fontWeight: "bold" }}>Pg for Boys</p>
                                <span id='expo' style={{ color: "red", fontWeight:"bold" }}><Link id="link" to="/rooms" style={{color:"red",fontWeight:"bold",fontSize:"25px"}}>Explore</Link>
                                    <i style={{ marginTop: "8px", marginLeft: "10px", fontSize: "20px" }} class="fa-solid fa-greater-than"></i></span>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-12 mt-2'>
                            <div id='pg3'>
                                <p style={{ color: "#fff", fontSize: "25px", position: "relative", top: "70px", textAlign: "center", fontWeight: "bold" }}>Pg for girls</p>
                                <span id='expo' style={{ color: "red",fontWeight:"bold" }}><Link id="link" to="/rooms" style={{color:"red",fontWeight:"bold",fontSize:"25px"}}>Explore</Link>
                                    <i style={{ marginTop: "8px", marginLeft: "10px", fontSize: "20px" }} class="fa-solid fa-greater-than"></i></span>
                            </div>

                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-12 mt-2'>
                            <div id='pg4'>
                                <p style={{ color: "#fff", fontSize: "25px", position: "relative", top: "70px", textAlign: "center", fontWeight: "bold" }}>Students Flat</p>
                                <span id='expo' style={{ color: "red",fontWeight:"bold" }}><Link id="link" to="/rooms" style={{color:"red",fontWeight:"bold",fontSize:"25px"}}>Explore</Link>
                                    <i style={{ marginTop: "8px", marginLeft: "10px", fontSize: "20px" }} class="fa-solid fa-greater-than"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toppg;
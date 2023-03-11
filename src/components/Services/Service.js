import React from "react";
import { Link } from "react-router-dom";
import room from './images/rooms.jpeg'
import mess from './images/mess.jpg'
import "./service.css"

const Service = () => {
    return (
        <div>
            <div id="ser">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-last order-md-last order-sm-first order-first">
                            <img style={{ height: "300px", width: "100%", borderRadius: "5px" }} src={room}></img>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-5 text-center">
                            <h3 style={{ fontWeight: "bold" }}>Online Pg Facility For Students</h3>
                            <p style={{ fontSize: "13px" }}>Third home is hasste-free Solution to Finding the Perfect Pg
                                for Students in bhilai Chhattisgarsh..We Provide an Online
                                platform For Students to Search For the available pg For theor
                                respective needs and make Bookings.We help Students to Find their
                                third home with ease.
                            </p>
                            <button className="btn btn-danger" style={{ fontWeight: "bold" }}><Link id="link" to="/rooms">Search pg</Link></button>
                        </div>
                    </div>
                    {/* <div className="row mt-3" >
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-5 text-center order-lg-none order-md-none order-sm-last order-last ">
                            <h3 style={{ fontWeight: "bold" }}>pg rooms we provide</h3>
                            <p style={{fontSize:"13px"}}> pg rooms we provide pg rooms we provide pg rooms we provide
                                we provide pg rooms we provide pg rooms we provide
                                we provide pg rooms we provide pg rooms we provide
                            </p>
                            <button className="btn btn-danger" style={{fontWeight:"bold"}}>Search mess</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-last " >
                            <img style={{ height: "300px", width: "100%", borderRadius: "5px" }} src={mess}></img>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Service;
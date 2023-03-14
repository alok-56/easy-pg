import React from "react";
import why from './images/why.jpg';
import './Whyus.css';

const Whyus = () => {
    return (
        <div id="why">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                        <img height={350} width={350} style={{ borderRadius: "5px" }} id="im" src={why}></img>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-3">
                        <div id="why_head">
                            <div id="heading">
                                <h3 style={{ fontWeight: "bold" }}>Who we are and What You get<br></br> From us</h3>
                                <p style={{ fontSize: "13px" }}>Third Home is a bussiness based in bhilai,chhattisgarh that provides a comprehensive online platform
                                    to help students to find the perfect pg accommodation..We understand that finding a comfortable and affordable place to stay is a common problem
                                    faced by many College students thats why we have developed a user-friendly platform that given stdents access to range of pg services from locating the perfect
                                    accommodation to getting in touchwith landloads..</p>
                            </div>
                            <div id="list">
                                <ul>
                                    <li style={{ fontSize: "15px", fontWeight: "bold" }}>Price of Pg Rooms Are Best in the Market</li>
                                    <li style={{ fontSize: "15px", fontWeight: "bold" }}>Get Pg rooms or Flat or Hostel Near your College or School</li>
                                    <li style={{ fontSize: "15px", fontWeight: "bold" }}>Packages price are avialable For students who wants to stay for long time </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Whyus;
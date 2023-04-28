import React from "react";
import why from './images/why.jpg';
import './Whyus.css';

const Whyus = () => {
    return (
        <div id="why">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 text-center">
                        <img height={350} width={350} style={{ borderRadius: "5px" }} id="im" src={why}></img>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-3">
                        <div id="why_head">
                            <div id="heading">
                                <h3 style={{ fontWeight: "bold" }}>Who we are and What You get<br></br> From us</h3>
                                <p style={{ fontSize: "13px" }}>Easy Pg is a business located in Bhilai, Chhattisgarh,
                                    that offers an extensive online platform to aid students in finding the ideal PG
                                    accommodation. The company aims to simplify the process of finding the perfect PG for
                                    students who are new to the city and don't have any prior knowledge of the area.</p>
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
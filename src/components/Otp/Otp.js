import React from "react";
import "./Otp.css"
import { Link } from "react-router-dom";

const Otp = (props) => {
    return (
        <div id="sign_head">
            <div className="container">
                <div className="row">
                    <div className="col " style={{ marginTop: "150px" }}>
                        <div id="form">
                            <div id="logo">
                                <h5 className="text-center">Verification code</h5>
                                <p className="text-center">We have send you Verification code to your gmail</p>
                            </div>
                            <div id="info">
                                <div id="info_head">
                                    <input type="text"></input>
                                    <input type="text"></input>
                                    <input type="text"></input>
                                    <input type="text"></input>
                                    <input type="text"></input>
                                </div>
                                <button className="btn btn-primary mt-3 w-100"><Link to="/Setpass" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none" }}>Verfiy</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Otp;
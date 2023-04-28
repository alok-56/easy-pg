import React from "react";
import { Link } from "react-router-dom"
import './Navbar.css'

const Header = () => {
    return (
        <div id='head'>
            <div id='head_content'>
                <h1 style={{ fontWeight: "bold",color:"white" }}>We Help Students To Find Pg Easy!!</h1>
                <p style={{ fontSize: "20px",fontWeight:"bold" }}>Find India’s best Pg and Hostels
                    near you</p>
                <div>
                    <button className='btn btn-dark' style={{ fontWeight: "bold" }}><Link id="link" to="/rooms">Search pg</Link></button>
                    <p className="mt-4" style={{fontSize:"15px",fontWeight:"bold"}}> Easy Pg is a one-stop-shop for students seeking PG accommodation</p>
                    {/* <button className='btn btn-danger m-2' style={{ fontWeight: "bold" }}><Link id="link" to="/mess">Search mess</Link></button> */}
                </div>
            </div>
        </div>
    )
}

export default Header;
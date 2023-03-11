import React from "react";
import {Link} from "react-router-dom"
import './Navbar.css'

const Header = () => {
    return (
        <div id='head'>
            <div id='head_content'>
                <h1 style={{ fontWeight: "bold" }}>We Help Students to Find Third Home</h1>
                <p style={{ fontSize: "20px" }}>search pg near your location</p>
                <div>
                    <button className='btn btn-danger' style={{ fontWeight: "bold" }}><Link id="link" to="/rooms">Search pg</Link></button>
                    {/* <button className='btn btn-danger m-2' style={{ fontWeight: "bold" }}><Link id="link" to="/mess">Search mess</Link></button> */}
                </div>
            </div>
        </div>
    )
}

export default Header;
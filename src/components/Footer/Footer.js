import React from "react";
import './Footer.css'

const Footer=()=>{
    return(
        <div id="fot" className="mt-2">
           <div className="container mt-2">
            <div className="row text-center">
                <div className="col-12">
                    <span style={{margin:"5px",fontSize:"25px"}}><a href="https://www.instagram.com/easy__pg/?igshid=MzRlODBiNWFlZA%3D%3D"><i class="fa-brands fa-instagram"></i></a></span><span style={{margin:"5px",fontSize:"25px"}}><i class="fa-brands fa-linkedin"></i></span><span style={{margin:"5px",fontSize:"25px"}}><i class="fa-brands fa-square-twitter"></i></span>
                    <p style={{fontSize:"15px"}}>About Disclaimer Privacy policy<br></br>
                     <p style={{fontSize:"10px"}}>Terms and condition </p></p>
                </div>
            </div>
           </div>
        </div>
    )
}

export default Footer;
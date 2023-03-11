import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Setpass.css"
import logo from './images/logo.jpeg'
const Setpass = () => {
    const [password, setPassword] = useState('');
    const [compassword, setCompassword] = useState('')
    const navigate=useNavigate()
    const[email,setEmail]=useState('')

    const changepass = async () => {
        let email = JSON.parse(localStorage.getItem('user')).email;
        console.log(email)
        if (password == compassword) {

            let result = await fetch('http://localhost:4500/Aut/forgot', {
                method: "put",
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (result) {
                navigate('/')
            }

        }
        else{
            alert("password doesnot matched");
        }


    }
    return (
        <div id="sign_head4">
            <div className="container">
                <div className="row">
                    <div className="col " style={{ marginTop: "120px" }}>
                        <div id="form4">
                            <div id="logo4">
                                <h4 className="text-center"><img width={100} src={logo}/></h4>
                            </div>
                            <div id="info4">
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter New password" ></input>
                                <input type="password" value={compassword} onChange={(e) => { setCompassword(e.target.value) }} placeholder="Enter conform password" ></input>
                                <button onClick={changepass} className="btn btn-primary mt-3 w-100">Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Setpass;
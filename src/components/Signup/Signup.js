import React, { useState } from "react";
import "./Signup.css"
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logo.jpeg'
import { SpinnerRoundOutlined } from 'spinners-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";




const Signup = () => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [number, SetNumber] = useState('');
    const [password, SetPassword] = useState('');
    const [load, SetLoad] = useState(false);
    const [otpp, setOtpp] = useState('')
    const [veri, setVeri] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const signup = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/Aut/email/${email}`)
        data = await data.json()
        if (data.email) {
            toast("already Have account")
            return false
        }
        else {
            setLoading(true)
            let otp = Math.floor(Math.random() * 100000);
            setOtpp(otp);
            let result = await fetch('https://easy-ser.vercel.app/Aut/verification', {
                method: "post",
                body: JSON.stringify({ email, otp }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json()
            if (result) {
                toast("OTP SEND successfully");
                setLoading(false)
                SetLoad(true);
            }

        }

    }
    const fun = async () => {
        setLoading(true)
        if (veri == otpp) {
            let result = await fetch(`https://easy-ser.vercel.app/Aut/signup`, {
                method: 'post',
                body: JSON.stringify({ name, number, email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            result = await result.json();
            if (result) {
                setLoading(false)
                navigate('/signin')
            }
            else {
                toast("email already used")
            }
        }
        else {
            toast("wrong otp")
            setLoading(false)
        }
    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            {
                load ? <div id="sign_head">
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
                                            <input type="text" style={{ textAlign: "center", borderRadius: "5px", padding: "5px" }} value={veri} onChange={(e) => setVeri(e.target.value)}></input>
                                        </div>


                                        <button className="btn btn-primary mt-2 w-100" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none" }} onClick={fun}>
                                            {
                                                loading ? <div style={{ textAlign: "center" }}>
                                                    <SpinnerRoundOutlined size={30} thickness={100} speed={133} color="#36ad47" />
                                                </div> : <span>Verfiy</span>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div id="sign_head5">
                    <div className="container">
                        <div className="row ">
                            <div className="col" style={{ marginTop: "100px" }}>
                                <div id="form5">
                                    <div id="logo5">
                                        <h4 className="text-center"><img width={100} src={logo} /></h4>
                                    </div>
                                    <div id="info5">
                                        <input type="text" value={name} onChange={(e) => SetName(e.target.value)} placeholder="Enter Your name" ></input>
                                        <input type="number" value={number} onChange={(e) => SetNumber(e.target.value)} placeholder="Enter Your number" ></input>
                                        <input type="email" value={email} onChange={(e) => SetEmail(e.target.value)} placeholder="Enter Your email" ></input>
                                        <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)} placeholder="Enter Your password" ></input>

                                        <button onClick={signup} className="btn btn-primary mt-3 w-100">
                                            {
                                                loading ? <div style={{ textAlign: "center" }}>
                                                    <SpinnerRoundOutlined size={30} thickness={100} speed={133} color="rgba(172, 57, 59, 1)" secondaryColor="rgba(57, 172, 102, 1)" />
                                                </div> : <span> Sign Up</span>
                                            }

                                        </button>
                                    </div>
                                    <div id="bot5" className="mt-3">
                                        <span>Aready have account/<Link to="/Signin" style={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}>Login </Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }

        </div>

    )
}
export default Signup;
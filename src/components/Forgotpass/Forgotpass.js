import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Otp from "../Otp/Otp";
import "./Forgotpass.css";
import logo from "./images/logo.jpeg";
import { SpinnerRoundOutlined } from "spinners-react";

const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(false);
  const [veri, setVeri] = useState("");
  const [load, setLoad] = useState(false);
  const [otpp, setOtpp] = useState("");
  const [loading, setLoading] = useState(false);
  const [passset, setPassset] = useState(false);
  const [password, setPassword] = useState("");
  const [compassword, setCompassword] = useState("");
  const navigate = useNavigate();

  async function fun() {
    // const Email = JSON.parse(localStorage.getItem('user')).email;
    let data = await fetch(`https://easy-ser.vercel.app/Aut/email/${email}`);
    data = await data.json();
    if (data.email) {
      setLoading(true);
      let otp = Math.floor(Math.random() * 100000);
      setOtpp(otp);
      let result = await fetch("https://easy-ser.vercel.app/Aut/verification", {
        method: "post",
        body: JSON.stringify({ email, otp }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        setData(true);
      }
    } else {
      alert("incorrect email");
    }
  }
  const verify = async () => {
    if (veri == otpp) {
      setPassset(true);
      setData(false);
    } else {
      setLoad(true);
    }
  };
  const changepass = async () => {
    if (password == compassword) {
      let result = await fetch("https://easy-ser.vercel.app/Aut/forgot", {
        method: "put",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (result) {
        navigate("/Signin");
      }
    } else {
      alert("password doesnot matched");
    }
  };
  return (
    <div>
      {data ? (
        <div id="sign_head">
          {load ? (
            <span
              style={{
                marginTop: "440px",
                backgroundColor: "red",
                textAlign: "center",
              }}
            >
              Incorrect otp
            </span>
          ) : null}
          <div className="container">
            <div className="row">
              <div className="col " style={{ marginTop: "150px" }}>
                <div id="form">
                  <div id="logo">
                    <h5 className="text-center">Verification code</h5>
                    <p className="text-center">
                      We have send you Verification code to your gmail
                    </p>
                  </div>
                  <div id="info">
                    <div id="info_head">
                      <input
                        type="text"
                        value={veri}
                        onChange={(e) => setVeri(e.target.value)}
                      ></input>
                      {/* <input type="text" value={otp1} onChange={(e)=>setOtp1(e.target.value)}></input>
                                                <input type="text" value={otp2} onChange={(e)=>setOtp2(e.target.value)}></input>
                                                <input type="text" value={otp3} onChange={(e)=>setOtp3(e.target.value)}></input>
                                                <input type="text" value={otp4} onChange={(e)=>setOtp4(e.target.value)}></input>
                                                <input type="text" value={otp5} onChange={(e)=>setOtp5(e.target.value)}></input> */}
                    </div>
                    <button
                      className="btn btn-primary mt-3 w-100"
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                      onClick={verify}
                    >
                      Verfiy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : passset ? (
        <div id="sign_head4">
          <div className="container">
            <div className="row">
              <div className="col " style={{ marginTop: "120px" }}>
                <div id="form4">
                  <div id="logo4">
                    <h2 className="text-center" style={{ fontSize: 30 }}>
                      EasyPg
                    </h2>
                  </div>
                  <div id="info4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Enter New password"
                    ></input>
                    <input
                      type="password"
                      value={compassword}
                      onChange={(e) => {
                        setCompassword(e.target.value);
                      }}
                      placeholder="Enter conform password"
                    ></input>
                    <button
                      onClick={changepass}
                      className="btn btn-primary mt-3 w-100"
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="sign_head1">
          <div className="container">
            <div className="row">
              <div className="col " style={{ marginTop: "190px" }}>
                <div id="form1">
                  <div id="logo1">
                    <h2 className="text-center" style={{ fontSize: 30 }}>
                      EasyPg
                    </h2>
                  </div>
                  <div id="info1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your email"
                    ></input>
                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={fun}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {loading ? (
                        <div style={{ textAlign: "center" }}>
                          <SpinnerRoundOutlined
                            size={30}
                            thickness={100}
                            speed={133}
                            color="#36ad47"
                          />
                        </div>
                      ) : (
                        <span>Otp</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Forgotpass;

import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.jpeg";
import { SpinnerRoundOutlined, SpinnerCircularFixed } from "spinners-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [load, SetLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(true);

  const navigate = useNavigate();

  const signin = async () => {
    if (email && password) {
      setLoading(true);
      let result = await fetch(`https://easy-ser.vercel.app/Aut/signin`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      } else {
        setLoading(false);
        toast("Wrong detail");
      }
    }else{
        toast("Empty details")
    }
  };
  return (
    <div>
      <ToastContainer />
      {spin ? (
        <div id="sign_head2">
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ marginTop: "120px" }}>
                <div id="form2">
                  <div id="logo2">
                    <h2 className="text-center" style={{ fontSize: 30 }}>
                      EasyPg
                    </h2>
                  </div>
                  <div id="info2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => SetEmail(e.target.value)}
                      placeholder="Enter Your email"
                    ></input>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => SetPassword(e.target.value)}
                      placeholder="Enter Your password"
                    ></input>

                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={signin}
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
                        <span>Sign in</span>
                      )}
                    </button>
                  </div>
                  <div id="bot2">
                    <div
                      className="m-2"
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        fontWeight: "bold",
                      }}
                    >
                      <p>
                        <Link to="/Forgot">Forgot password</Link>
                      </p>
                    </div>
                    <span>
                      New user/
                      <Link
                        to="/Signup"
                        style={{ fontWeight: "bold", textDecoration: "none" }}
                      >
                        Sign up
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "300px",
          }}
        >
          <SpinnerCircularFixed
            size={50}
            thickness={200}
            speed={133}
            color="rgba(172, 57, 59, 1)"
            secondaryColor="rgba(57, 172, 102, 1)"
          />
        </div>
      )}
    </div>
  );
};
export default Login;

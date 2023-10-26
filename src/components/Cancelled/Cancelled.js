import React, { useEffect, useState } from "react";
import Navpage from "../Navbar/Navbar";
import Head from "./images/headbag.jpg";
import "./Cancelled.css";
import { useParams } from "react-router-dom";

import { SpinnerRoundOutlined } from "spinners-react";

const Cancelled = () => {
  const params = useParams();
  const [cancel, SetCancel] = useState("");
  const [status, setStatus] = useState();
  const [loads, setLoads] = useState(true);

  useEffect(() => {
    CancelBook();
  }, []);
  const CancelBook = async () => {
    let data = await fetch(
      `https://easy-ser.vercel.app/roombooking/cancelbooking/${params.id}`
    );
    data = await data.json();
    SetCancel(data.data);
    setLoads(false);
  };

  return (
    <div id="cancel">
      <Navpage></Navpage>
      {loads ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "200px",
          }}
        >
          <SpinnerRoundOutlined
            size={100}
            thickness={100}
            speed={103}
            color="#36ad47"
          />
        </div>
      ) : (
        <div className="container mt-3 text-center">
          {cancel && cancel.length > 0 ? (
            cancel
              .slice(0)
              .reverse()
              .map((item) => (
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "5px",
                    marginTop: "10px",
                    border: "1px solid black",
                  }}
                >
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <img
                          width={100}
                          className="img-fluid"
                          src={item.roomimg}
                          alt="Rooms"
                        ></img>
                        <div>
                          <span style={{ fontSize: "12px" }}>
                            {item.name}, {item.address}, {item.district}
                          </span>
                          <br></br>
                          <span style={{ fontSize: "12px" }}>
                            {item.roomtype}
                          </span>
                          <br></br>
                          <span
                            style={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            {new Date(item.canceldate).getDate()}/
                            {new Date(item.canceldate).getMonth() + 1}/
                            {new Date(item.canceldate).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6 col-6 mt-2 text-center">
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          Paid Total :
                          <span style={{ fontSize: "10px" }}>
                            {" "}
                            {item.price}
                          </span>
                        </span>
                        <br></br>
                        <span style={{ fontWeight: "bold" }}>
                          Stay time :
                          <span style={{ fontSize: "10px" }}> 22 months</span>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-4">
                      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                        Status :
                      </span>
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {item.status}
                      </span>
                      <br></br>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <span>Not Yet cancelled</span>
          )}
        </div>
      )}

      {/* <div className="container mt-3 text-center">
                <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <img width={100} className="img-fluid" src={Head} alt="Rooms"></img>
                                <div>
                                    <span style={{ fontSize: "12px" }}>Saxena Boys Hostel, Bhilai, Durg</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Single beds</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Booked on 2 nov 2022</span><br></br>
                                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>Cancelled on 2 nov 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6 col-6 mt-2 text-center">
                            <div>
                                <span style={{ fontWeight: "bold" }}>Paid Total :<span style={{ fontSize: "10px" }}> 5000</span></span><br></br>
                                <span style={{ fontWeight: "bold" }}>Stay time :<span style={{ fontSize: "10px" }}> 22 months</span></span>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-4">
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold", marginLeft: '5px' }}>Cancelled</span><br></br>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3 text-center">
                <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <img width={100} className="img-fluid" src={Head} alt="Rooms"></img>
                                <div>
                                    <span style={{ fontSize: "12px" }}>Saxena Boys Hostel, Bhilai, Durg</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Single beds</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Booked on 2 nov 2022</span><br></br>
                                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>Cancelled on 2 nov 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6 col-6 mt-2 text-center">
                            <div>
                                <span style={{ fontWeight: "bold" }}>Paid Total :<span style={{ fontSize: "10px" }}> 5000</span></span><br></br>
                                <span style={{ fontWeight: "bold" }}>Stay time :<span style={{ fontSize: "10px" }}> 22 months</span></span>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-4">
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold", marginLeft: '5px' }}>Cancelled</span><br></br>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3 text-center">
                <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <img width={100} className="img-fluid" src={Head} alt="Rooms"></img>
                                <div>
                                    <span style={{ fontSize: "12px" }}>Saxena Boys Hostel, Bhilai, Durg</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Single beds</span><br></br>
                                    <span style={{ fontSize: "12px" }}>Booked on 2 nov 2022</span><br></br>
                                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>Cancelled on 2 nov 2023</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6 col-6 mt-2 text-center">
                            <div>
                                <span style={{ fontWeight: "bold" }}>Paid Total :<span style={{ fontSize: "10px" }}> 5000</span></span><br></br>
                                <span style={{ fontWeight: "bold" }}>Stay time :<span style={{ fontSize: "10px" }}> 22 months</span></span>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-4">
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold", marginLeft: '5px' }}>Cancelled</span><br></br>
                        </div>
                    </div>
                </div> */}
      {/* // </div> */}
    </div>
  );
};
export default Cancelled;

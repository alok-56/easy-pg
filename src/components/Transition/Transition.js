import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from "react-router-dom";
import Navpage from "../Navbar/Navbar";
import './Transition.css'

const Transition = () => {
    const params = useParams();
    const [data, setData] = useState('')
    useEffect(() => {
        getbook()
    }, [])

    const getbook = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/userbookinglist/${params.id}`);
        data = await data.json();
        setData(data)
    }


    return (
        <div>
            <Navpage></Navpage>
            <div className="container mt-3 text-center">
                {
                    data && data.length > 0 ?
                        data.slice(0).reverse().map((item) => (
                            <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-8 mt-lg-0 mt-md-0 mt-sm-0 mt-0">
                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            <div>
                                                <span style={{ fontSize: "12px" }}>{item.roomname}, {item.state}, {item.district}</span><br></br>
                                                <span style={{ fontSize: "10px", fontWeight: "bold" }}>Booking id: {item._id}</span><br></br>
                                                <span style={{ fontSize: "10px" }}>Ownwer id : {item.sellerId}</span><br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-4 mt-2 text-center">
                                        <div>
                                            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Amount : <span style={{ fontSize: "10px" }}> {item.price}</span></span><br></br>
                                            <span style={{ fontWeight: "bold", fontSize: "14px" }}>Month : <span style={{ fontSize: "10px" }}>July</span></span><br></br>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-8 mt-lg-2 mt-md-2 mt-sm-0 mt-0 ">
                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            <div>
                                                <span style={{ fontSize: "12px" }}>date : {item.date}</span><br></br>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Transition id
                                                    </Dropdown.Toggle>
                                                    <  Dropdown.Menu>
                                                        {
                                                            item.transitionId.length > 0 ?
                                                                item.transitionId.slice(0).reverse().map((item) => (

                                                                    <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>

                                                                )) : null
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-6 col-4 mt-lg-3 mt-md-2 mt-sm-0 mt-0 ">
                                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>Status : </span><span style={{ color: "red", }}>{item.status}</span>
                                    </div>
                                </div>
                            </div>
                        )) : <span>No ant transition</span>
                }
            </div>
        </div>
    )
}
export default Transition;
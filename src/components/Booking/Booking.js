import React, { useEffect, useState } from "react";
import Navpage from "../Navbar/Navbar";
import head1 from './images/headbag.jpg'
import Button from 'react-bootstrap/Button';
import "./Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Booking = () => {
    const [data, SetData] = useState('')
    const [status, setStatus] = useState("cancelled")
    const [load, setLoad] = useState(true);
    const [email, setEmail] = useState('');
    const [book, setBook] = useState('')
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getbook();
    }, [])
    const getbook = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/userbookinglist/${params.id}`);
        data = await data.json();
        SetData(data);
    }

    const cancel = async (id, statuss, email, time, price, payment) => {
        console.log(payment)
        if (statuss === 'cancelled') {
            toast("Your Booking is already cancelled")
        }
        else {
            var canceldate = new Date();
            var Difference_In_Time = canceldate.getTime() - time;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if (Difference_In_Days <= 1) {
                // let data=await fetch(`http://localhost:4500/payment/refund`,{
                //     method:"post",
                //     body:JSON.stringify({price,payment}),
                //     headers:{
                //         'content-Type':'application/json'
                //     }
                // })
                // data=await data.json();
                // console.log(data)

            }
            else {
                let data = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
                    method: "put",
                    body: JSON.stringify({ id, status, canceldate, }),
                    headers: {
                        'content-Type': 'application/json'
                    }
                })
                data = await data.json();
                if (data.acknowledged === true) {
                    getbook();
                    toast("your booking is cancelled succesfully");
                    ownerCancelemail(id, email);
                }
            }

        }
    }
    const ownerCancelemail = async (id, email) => {
        console.log(book)
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/book/cancelowner`, {
            method: "post",
            body: JSON.stringify({ id, email }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("send")
        }
    }

    return (
        <div id="book">
            <Navpage></Navpage>
            <ToastContainer></ToastContainer>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <input style={{ textAlign: "center", margin: "auto", width: "100%", padding: "5px" }} type="text" placeholder="Search your order"></input>
                    </div>
                </div>
            </div>
            <div className="container mt-3 text-center">

                {
                    data && data.length > 0 ?
                        data.slice(0).reverse().map((item) => (
                            <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >

                                <div className="row">
                                    <div className="col-lg-5 col-md-4 col-sm-12 col-12">
                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            <img width={100} src={head1} alt="Rooms"></img>
                                            <div>
                                                <span style={{ fontSize: "12px" }}>{item.roomname}, {item.address}, {item.district}</span><br></br>
                                                <span style={{ fontSize: "12px" }}>Bookin id : {item._id}</span><br></br>
                                                <span style={{ fontSize: "12px" }}>Booked on 2 nov 2022</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-3 col-sm-5 col-5 mt-2">
                                        <div style={{ display: "block" }}>
                                            <span style={{ marginLeft: "30px" }}><span style={{ fontWeight: "bold", color: "red", fontSize: "25px" }}>Rs : </span>{item.price}</span><br></br>
                                            {/* <span style={{ marginLeft: "20px",color:"red",fontWeight:"bold", }}>Owner Info</span> */}
                                            {/* <Button
                                variant="outline-danger"  style={{ marginLeft: "20px" }} onClick={cancel}>Order info</Button>{' '} */}
                                            <span style={{ fontWeight: "bold", marginLeft: "0px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold" }}>{item.status}</span><br></br>

                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-7 col-7 mt-1">
                                        {/* <span style={{ fontWeight: "bold" }}>Status:</span><span style={{ color: "red", fontWeight: "bold" }}>Paid</span><br></br> */}

                                        <Button variant="outline-danger" onClick={() => cancel(item._id, item.status, item.ownerEmail, item.time, item.price, item.transitionId)}>Cancel Booking</Button>
                                        <Button
                                            variant="outline-danger" className="mt-lg-0 mt-md-0 mt-sm-1 mt-1"
                                            onClick={() => navigate('/Ownerinfo/' + item.orderId)}
                                        >Order info</Button>{' '}
                                    </div>
                                </div>
                            </div>
                        )) : <h1>not booked any rooms</h1>
                }
            </div>
        </div >
    )
}

export default Booking;
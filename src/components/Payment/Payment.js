import React, { useEffect, useState } from "react";
import Navpage from "../Navbar/Navbar";
import head from './images/headbag.jpg'
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerRoundOutlined } from 'spinners-react';

const Payment = () => {
    const params = useParams();
    const [date, setDate] = useState('')
    const [pay, setPay] = useState("Due");
    const [status, setStatus] = useState("cancelled");
    const [id, setBookid] = useState();
    const [email, setEmail] = useState();
    const [loads, setLoads] = useState(true)
    const [name, setName] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const emails = JSON.parse(localStorage.getItem('user')).email
        setEmail(emails)
        const names = JSON.parse(localStorage.getItem('user')).name
        setName(names)
        Payment();
    })

    const Payment = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/userbookinglist/${params.id}`);
        data = await data.json();
        setDate(data);
        setLoads(false);
        for (var i = 0; i < date.length; i++) {
            var date1 = data[i].time;
            var date2 = new Date();
            var Difference_In_Time = date2.getTime() - date1;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            console.log(Difference_In_Days)
            if (Difference_In_Days > 30 + data[i].extendpay) {
                if (data[i].status !== 'cancelled') {
                    let id = data[i]._id;
                    let update = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
                        method: "put",
                        body: JSON.stringify({ id, pay }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    update = await update.json();
                    console.log(update)
                    if (update.modifiedCount > 0) {
                        datenotify(data[i].email, data[i]._id)
                    }
                    if (Difference_In_Days > 35 + data[i].extendpay) {
                        let id = data[i]._id;
                        let update = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
                            method: "put",
                            body: JSON.stringify({ id, status, pay }),
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                        update = await update.json();
                        if (update.modifiedCount > 0) {
                            setBookid(data[i]._id)
                            sendCancelemail(data[i].email, data[i]._id);
                            ownerCancelemail(data[i].owner, data[i]._id);
                            getproduct(data[i].productId)
                        }
                    }
                }
            }
        }
    }

    const datenotify = async (email, id) => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/datenotify`, {
            method: "post",
            body: JSON.stringify({ email, id }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("date notify to user send")
        }
    }



    const getproduct = async (id) => {
        let data = await fetch(`https://easy-ser.vercel.app/room/roomlist/${id}`);
        data = await data.json();
        console.log(data)
        if (data) {
            updateroom(id, data.remainingbed)
        }

    }

    const updateroom = async (id, remaining) => {
        let remainingbed = remaining + 1;
        let data = await fetch(`https://easy-ser.vercel.app/room/update/${id}`, {
            method: "put",
            body: JSON.stringify({ remainingbed }),
            headers: {
                'content-type': 'application/json'
            }
        })

        data = await data.json();
        if (data) {
            console.log("updated", data)
        }
    }

    const sendCancelemail = async (email, id) => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/book/cancel`, {
            method: "post",
            body: JSON.stringify({ email, id }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("send")
        }
    }

    const ownerCancelemail = async (email, id) => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/book/cancelowner`, {
            method: "post",
            body: JSON.stringify({ email, id }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("send")
        }
    }



    const handlerazarpay = async (data, id, book, date, last, owner, user) => {
        setLoads(false)
        const options = {
            key: 'rzp_test_MtraH0q566XjUb',
            amount: Number(data.price) * 100,
            currency: data.currency,
            name: "THIRD HOME",
            order_id: data.id,
            handler: async function (response) {
                let data = await fetch('https://easy-ser.vercel.app/payment/verify', {
                    method: "post",
                    body: JSON.stringify({ response }),
                    headers: {
                        "content-type": "application/json"
                    }
                });
                data = await data.json();
                if (data.code === 200) {
                    postbooking(data, id);
                    update(book, date, last);
                    ownerRepayemail(owner, id);
                    userRepayemail(user, id);
                }

            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open();
    }

    const ownerRepayemail = async (email, book) => {
        console.log("owner email", email)
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/repayowner`, {
            method: "post",
            body: JSON.stringify({ email, book, name }),
            headers: {
                'content-type': 'application/json'
            }
        });
        data = await data.json();
        if (data) {
            console.log("Repay email send to owner")
        }
    }

    const userRepayemail = async (email, book) => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/repayuser`, {
            method: "post",
            body: JSON.stringify({ email, book }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("Repay email send to user")
        }
    }

    const update = async (id, da, last) => {
        const date = new Date(da)
        date.setDate(date.getDate() + 30)
        const time = date.getTime()
        const lastdate = new Date(last)
        lastdate.setDate(date.getDate() + 30)
        let extendpay = 0;
        let pay = "paid";
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
            method: "put",
            body: JSON.stringify({ id, pay, date, time, lastdate, extendpay }),
            headers: {
                'content-Type': 'application/json'
            }
        })
        data = await data.json();
        console.log("updated", data)
    }


    const postbooking = async (db, id) => {
        let transitionId = db.data.payment_id;
        let orderId = db.data.order_id;
        // navigate('/Success/' + orderId)
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking/update`, {
            method: "put",
            body: JSON.stringify({
                id, transitionId, orderId
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json();
    }

    const Paynow = async (price, id, status, book, pro, date, last, owner, user) => {
        setLoads(true)
        if (status === "cancelled") {
            navigate('/rooms/single/' + pro)
        }
        else {

            let result = await fetch(`https://easy-ser.vercel.app/payment/orders`, {
                method: "post",
                body: JSON.stringify({ price }),
                headers: {
                    'content-type': 'application/json'
                }
            });

            result = await result.json();
            if (result.code === 200) {
                handlerazarpay(result.data, id, book, date, last, owner, user)
            }


        }


    }

    return (
        <div>
            <Navpage></Navpage>
            {
                loads ? <div style={{

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "200px"
                }}>
                    <SpinnerRoundOutlined size={100} thickness={100} speed={103} color="#36ad47" />

                </div> : <div className="container mt-3 text-center">

                    {
                        date && date.length > 0 ?
                            date.slice(0).reverse().map((item) => (
                                <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <img width={100} className="img-fluid" src={head} alt="Rooms"></img>
                                                <div>
                                                    <span style={{ fontSize: "12px" }}>{item.name}, {item.address}, {item.district}</span><br></br>
                                                    {/* <span style={{ fontSize: "12px" }}>Paid on 2 nov 2022</span><br></br> */}
                                                    <span style={{ fontSize: "12px" }}>Ownwer id : {item.sellerId}</span><br></br>
                                                    {/* <span style={{ fontSize: "12px" }}>Transition id : {item.transitionId}</span><br></br> */}
                                                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>Booking id: {item._id}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-6 col-6 mt-2 text-center">
                                            <div>
                                                <span style={{ fontWeight: "bold" }}>Paid Total : <span style={{ fontSize: "10px" }}> {item.price}</span></span><br></br>
                                                {/* <span style={{ fontWeight: "bold" }}>Month : <span style={{ fontSize: "10px" }}>July</span></span><br></br> */}
                                                {/* <span style={{ fontWeight: "bold" }}>Booked Till : <span style={{ fontSize: "10px" }}>5 July</span></span> */}
                                                <span style={{ fontWeight: "500" }}>last Pay date: <span style={{ fontSize: "10px" }}>{new Date(item.lastdate).getDate()}/{new Date(item.lastdate).getMonth() + 1}/{new Date(item.lastdate).getFullYear()}</span></span>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-2">
                                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold", marginLeft: '5px' }}>{item.pay}</span><br></br>
                                            {
                                                // item.status === 'cancelled' ? null : 
                                                <Button variant="outline-danger" onClick={() => Paynow(item.price, item._id, item.status, item._id, item.productId, item.date, item.lastdate, item.ownerEmail, item.email)}>Pay now</Button>

                                            }

                                        </div>
                                    </div>
                                </div>

                            )) : <h1>No Booking</h1>
                    }

                </div>

            }



        </div>
    )
}

export default Payment;
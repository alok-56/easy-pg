import React, { useEffect, useState } from "react";
import Navpage from "../Navbar/Navbar";
import head from './images/headbag.jpg'
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
    const params = useParams();
    const [date, setDate] = useState('')
    const [pay, setPay] = useState("Due");
    const [status, setStatus] = useState("cancelled");
    const [id, setBookid] = useState();
    const [email, setEmail] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const emails = JSON.parse(localStorage.getItem('user')).email
        setEmail(emails)
        Payment();
    })

    const Payment = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/userbookinglist/${params.id}`);
        data = await data.json();
        setDate(data);
        for (var i = 0; i < date.length; i++) {
            var date1 = data[i].time;
            var date2 = new Date();
            var Difference_In_Time = date2.getTime() - date1;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if (Difference_In_Days > 30) {
                if (data[i].status != 'cancelled') {
                    let id = data[i]._id;
                    let update = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
                        method: "put",
                        body: JSON.stringify({ id, pay }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    update = await update.json();
                    if (Difference_In_Days > 35) {
                        let id = data[i]._id;
                        let update = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
                            method: "put",
                            body: JSON.stringify({ id, status, pay }),
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                        update = await update.json();
                        if (update.matchedCount > 0) {
                            setBookid(data[i]._id)
                            sendCancelemail();
                            ownerCancelemail();
                        }
                    }
                }
            }
        }
    }

    const sendCancelemail = async () => {
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

    const ownerCancelemail = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/book//cancelowner`, {
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



    const handlerazarpay = async (data, id, book) => {
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
                    update(book);
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open();
    }

    const update = async (id) => {
        let pay="paid";
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/updatebooking`, {
            method: "put",
            body: JSON.stringify({ id, pay }),
            headers: {
                'content-Type': 'application/json'
            }
        })
        data = await data.json();
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

    const Paynow = async (price, id, status, book) => {
        if (status === "cancelled") {
            navigate('/rooms/single/' + id)
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
                handlerazarpay(result.data, id, book)
            }


        }


    }

    return (
        <div>
            <Navpage></Navpage>
            <div className="container mt-3 text-center">

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
                                            <span style={{ fontWeight: "bold" }}>last date: <span style={{ fontSize: "10px" }}>8 July</span></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-6 col-6 mt-2">
                                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Status :</span><span style={{ color: "red", fontWeight: "bold", marginLeft: '5px' }}>{item.pay}</span><br></br>
                                        {
                                            // item.status === 'cancelled' ? null : 
                                            <Button variant="outline-danger" onClick={() => Paynow(item.price, item.productId, item.status, item._id)}>Pay now</Button>

                                        }

                                    </div>
                                </div>
                            </div>

                        )) : <h1>No Booking</h1>
                }

            </div>



        </div>
    )
}

export default Payment;
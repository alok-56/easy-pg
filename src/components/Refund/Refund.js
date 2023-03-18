import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navpage from "../Navbar/Navbar";
import { SpinnerRoundOutlined } from 'spinners-react';

const Refund = () => {
    const params = useParams();
    const [refundid, setRefundid] = useState('')
    const [paymentid, setPaymentid] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('');
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getBook();
    }, [])

    const getBook = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/bookinglist/${params.id}`)
        data = await data.json()
        if (data) {
            refundStatus(data.refundid, data.transitionId[data.transitionId.length - 1])
        }

    }
    const refundStatus = async (id, pay) => {
        let data = await fetch(`https://easy-ser.vercel.app/payment//refund/status`, {
            method: "post",
            body: JSON.stringify({ id, pay }),
            headers: {
                "content-type": "application/json"
            }
        })
        data = await data.json();
        if (data) {
            setRefundid(data.id);
            setPaymentid(data.payment_id)
            setPrice(data.amount);
            setStatus(data.status);
            setLoad(false)
        }
    }
    return (
        <div>
            <Navpage></Navpage>
            {

                load ? <div style={{

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "200px"
                }}>
                    <SpinnerRoundOutlined size={100} thickness={100} speed={103} color="#36ad47" />

                </div> :

                    <div className="container mt-3 text-center">
                        <div style={{ backgroundColor: "#fff", padding: "5px", marginTop: "10px", border: "1px solid black" }} >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-7 mt-lg-0 mt-md-0 mt-sm-0 mt-0">
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div>
                                            <span style={{ fontSize: "10px", fontWeight: "bold" }}>Refund id : {refundid} </span><br></br>
                                            <span style={{ fontSize: "10px" }}>Payment id : {paymentid} </span><br></br>
                                            <span style={{ fontSize: "10px" }}>Booking id : {params.id} </span><br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-5 text-center">
                                    <div>
                                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>Amount : {price} <span style={{ fontSize: "10px" }}> </span></span><br></br>
                                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>Status : </span><span style={{ color: "red", }}>{status} </span>
                                    </div>
                                </div>
                                {/* <div className="col-lg-3 col-md-3 col-sm-6 col-8  ">
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <div>
                                    <span style={{ fontSize: "12px" }}>date :</span><br></br>
                                </div>
                            </div>
                        </div> */}


                            </div>
                        </div>


                    </div>
            }

        </div>
    )
}

export default Refund;
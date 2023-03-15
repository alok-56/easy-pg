import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Success.css';
import { SpinnerRoundOutlined } from 'spinners-react';


const Success = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookingId, setBookingId] = useState('')
    const [transitionId, setTransitionId] = useState('');
    const [ownername, SetOwnername] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('')
    const [ownerNumber, setOwnerNumber] = useState('');
    const [address, setAddress] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [price, setPrice] = useState('');
    const [roomid, SetRoomid] = useState('');
    const [load, setLoad] = useState(true)

    useEffect(() => {
        Successpayment();
    }, [])

    const Successpayment = async () => {
        setLoad(false)
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/bookinglist/${params.id}`);
        data = await data.json();
        setName(data.name)
        setEmail(data.email);
        setBookingId(data._id);
        setTransitionId(data.transitionId)
        SetOwnername(data.ownername);
        setOwnerEmail(data.ownerEmail);
        setOwnerNumber(data.ownerNumber);
        setAddress(data.address);
        setOwnerId(data.sellerId);
        setPrice(data.price)
        SetRoomid(data.productId)

    }
    return (
        <div id="pay_head">
            {
                load ? <div style={{

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "200px"
                }}>
                    <SpinnerRoundOutlined size={100} thickness={100} speed={103} color="#36ad47" />
                </div> : <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5 text-center">
                            <div id="payment_head">
                                <div id="logo_payment">
                                    <i class="fa-solid fa-check" style={{ fontSize: "45px", color: "#fff", backgroundColor: "green", borderRadius: "50px", padding: "3px", marginTop: "10px" }}></i><br></br>
                                    <span style={{ fontSize: "25px", color: "green" }}>Payment Successful</span>
                                </div>
                                <div id="detail" className="mt-3" >
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Name
                                        </span>
                                        <span>
                                            {name}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Email
                                        </span>
                                        <span>
                                            {email}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Booking id
                                        </span>
                                        <span>
                                            {bookingId}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Room id
                                        </span>
                                        <span>
                                            {roomid}
                                        </span>
                                    </div>
                                    {/* <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                    <span>
                                        Transaction id
                                    </span>
                                    <span>
                                        {transitionId}
                                    </span>
                                </div> */}
                                    <div className="mt-2 d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span style={{ fontWeight: "bold" }}>
                                            Amount
                                        </span>
                                        <span style={{ fontWeight: "bold" }}>
                                            {price}
                                        </span>
                                    </div>
                                </div>
                                <div id="logo_payment">
                                    <span style={{ fontSize: "25px", color: "green" }}>Owner Details</span>
                                </div>
                                <div id="detail" className="mt-3" >
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Name
                                        </span>
                                        <span>
                                            {ownername}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Email
                                        </span>
                                        <span>
                                            {ownerEmail}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span style={{ fontWeight: "bold" }}>
                                            Number
                                        </span>
                                        <span style={{ fontWeight: "bold" }}>
                                            {ownerNumber}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            address
                                        </span>
                                        <span>
                                            {address}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Owner id
                                        </span>
                                        <span>
                                            {ownerId}
                                        </span>
                                    </div>

                                </div>
                                <div>
                                    <button className="btn btn-danger m-2"
                                        onClick={() => navigate('/loc')}
                                        disabled>Owner location</button>
                                    <button className="btn btn-danger"
                                        onClick={() => navigate('/profile')}
                                    >My booking</button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            }

        </div>
    )
}

export default Success;
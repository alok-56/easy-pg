import React, { useEffect, useState } from "react";
import './ownerinfo.css'
import logo from './images/logo.jpeg'
import { useNavigate, useParams } from "react-router-dom";

const Ownerinfo = () => {
    const params = useParams();
    const [ownername, SetOwnername] = useState('');
    const [ownerEmai, setOwnerEmail] = useState('')
    const [ownerNumber, setOwnerNumber] = useState('');
    const [address, setAddress] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [bookingId, setBookingId] = useState('')
    const [roomid, setRoomid] = useState('')
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const navigate = useNavigate
    useEffect(() => {
        Owenerinfo();
    }, [])

    const Owenerinfo = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/bookinglist/${params.id}`);
        data = await data.json();
        console.log(data)
        if (data) {
            SetOwnername(data.ownername);
            setOwnerEmail(data.ownerEmail);
            setOwnerNumber(data.ownerNumber);
            setAddress(data.add);
            setOwnerId(data.sellerId);
            setBookingId(data._id);
            setRoomid(data.productId)
            setLat(data.lat)
            setLon(data.lon)
        }
    }
    return (
        <div>
            <div id="pay_head1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5 text-center">
                            <div id="payment_head1">
                                <div id="logo_payment1">
                                    <img src={logo} alt="" width={100} style={{ borderRadius: "50%", padding: "3px", marginTop: "10px" }}></img><br></br>
                                    <span style={{ fontSize: "25px", color: "green" }}>Owner Info</span>
                                </div>
                                <div id="detail1" className="mt-3" >
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
                                            {ownerEmai}
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
                                    <div className=" d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                        <span>
                                            Room id
                                        </span>
                                        <span>
                                            {roomid}
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

                                </div>
                                <div>
                                    <button className="btn btn-danger m-2"><a href={`https://www.google.com/maps?q=${lat},${lon}&z=17&hl=en`} style={{
                                        textDecoration: "none",
                                        color: "#fff"
                                    }}>Track location</a></button>
                                </div>
                                <div>
                                    <ul className="mt-3">
                                        <li style={{ fontSize: "12px", fontWeight: "bold" }}>Show any id proof during the time of Checkin</li>
                                        <li style={{ fontSize: "11px", fontWeight: "bold" }}>100% refund if you cancel booking within 24 hour</li>
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Ownerinfo;
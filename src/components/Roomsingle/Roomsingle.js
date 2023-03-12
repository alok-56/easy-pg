import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import b1 from "./images/mess.jpg"
import b2 from "./images/rooms.jpg"
import "./Roomsingle.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";



function MyVerticallyCenteredModal(props) {
    const [price, setPrice] = useState();
    const [load, setLoad] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roomname, setRoomname] = useState('');
    const [Ages, setAges] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState("booked");
    const [img, setImg] = useState('')
    const [singlebedprice, setSiglebedprice] = useState('');
    const [fullroomprice, setFullroomprice] = useState('')
    const [pay, setPay] = useState("paid");

    const [usersId, setUsersId] = useState('');
    const [productId, setProductId] = useState('');
    const [sellerId, setSellerId] = useState('');

    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [ownername, setOwnername] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [ownerNumber, setOwnernNumber] = useState()
    const [add, setAdd] = useState('')
    const params = useParams();
    const navigate = useNavigate()

    const [product, setProduct] = useState('')

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user'))._id;
        const username = JSON.parse(localStorage.getItem('user')).name;
        const useremail = JSON.parse(localStorage.getItem('user')).email;
        setUsersId(userid);
        setProductId(params.id);
        setName(username);
        setEmail(useremail);
        productdata();

    }, []);
    
    const productdata = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/room/roomlist/${params.id}`)
        data = await data.json();
        console.log(data)
        setRoomname(data.roomname);
        setImg(data.img);
        setSellerId(data._id);
        setSiglebedprice(data.Siglebedprice);
        setFullroomprice(data.Fullroomprice)
        setState(data.state);
        setDistrict(data.district);
        setOwnername(data.name);
        setOwnerEmail(data.email);
        setOwnernNumber(data.Number)
        setAdd(data.address)
    }
    var date = new Date();
    var time = new Date().getTime();


    // console.log(usersId, sellerId, roomname, name, email, Ages, gender, price, transitionId, orderId, date,status)


    const handlerazarpay = async (data) => {
        setLoad(true)
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
                    postbooking(data);
                    sendEmail();
                    sellerEmail();
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open();
    }
    const postbooking = async (db) => {
        let transitionId = db.data.payment_id;
        let orderId = db.data.order_id;
        navigate('/Success/' + orderId)
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/postbooking`, {
            method: "post",
            body: JSON.stringify({
                usersId, sellerId, transitionId, orderId, productId, name, pay, email, img, Ages, date, time, status, price, roomname, state, add, district, ownerEmail, ownername, ownerNumber
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json();
    }

    const sendEmail = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/roombooking/book/notify`, {
            method: "post",
            body: JSON.stringify({ email, ownername, ownerNumber, sellerId }),
            headers: {
                'content-type': 'application/json'
            }
        });

        data = await data.json();
        if (data) {
            console.log("send")
        }
    }

    const sellerEmail = async () => {
        let data = await fetch('https://easy-ser.vercel.app/roombooking/book/sellnotify', {
            method: "post",
            body: JSON.stringify({ ownerEmail, usersId, name, email }),
            headers: {
                'content-type': 'application/json'
            }
        });
        data = await data.json();
        if (data) {
            console.log("send");
        }

    }
    const Paynow = async () => {
        setLoad(false)
        setTimeout(() => {
            setLoad(true)
        }, 3000)
        let result = await fetch(`https://easy-ser.vercel.app/payment/orders`, {
            method: "post",
            body: JSON.stringify({ price }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        if (result.code === 200) {
            handlerazarpay(result.data)
        }
        else {
            toast(result.message)
            toast("Empty Details")
        }

    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: "red" }}>
                        Enter Yours Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12' id='select'>
                                <Form.Control
                                    placeholder="Enter your name"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Control
                                    placeholder="Enter email"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control
                                    placeholder="Enter your Age"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={Ages}
                                    onChange={(e) => { setAges(e.target.value) }}
                                />
                                <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)} style={{ margin: "5px" }}>
                                    <option>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" onChange={(e) => setPrice(e.target.value)} style={{ margin: "5px" }}>
                                    <option>Select Booking Type</option>
                                    <option value={singlebedprice}>Single Beds</option>
                                    <option value={fullroomprice}>Full room</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" style={{ margin: "5px" }}>
                                    <option>Profession</option>
                                    <option value="student">Student</option>
                                    <option value="working">Working</option>
                                </Form.Select>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        load ? <Button onClick={Paynow}>Proceed for payment</Button> : <SpinnerCircular />
                    }


                </Modal.Footer>
            </Modal>
        </div>
    );
}

const Roomsingle = () => {
    const [image, setImage] = useState();
    const [roomname, setRoomname] = useState();
    const [district, setDistrict] = useState();
    const [address, setAddress] = useState('')
    const [state, setState] = useState();
    const [dic, setDic] = useState();
    const [siglebedprice, setSiglebedprice] = useState();
    const [fullroomprice, setFullroomprice] = useState();
    const [electricCharge, setElectricCharge] = useState();
    const [parking, setParking] = useState();
    const [powerbackup, setPowerbackup] = useState();
    const [preferred, setPreferred] = useState();
    const [available, setAvailable] = useState()
    const [totalbed, setTotalbed] = useState();
    const [remainingbed, setRemainingbed] = useState('')
    const [acroom, setAcroom] = useState('');
    const [roomtype, setRoomtype] = useState();
    const [cooking, setCooking] = useState();
    const [bathroom, setBathroom] = useState();
    const [visitor, setVisitor] = useState();
    const [oppsiteGender, setOppsiteGender] = useState();
    const [closingtime, setClosingtime] = useState();
    const [smoking, setSmoking] = useState();
    const [loudMusic, setLoudMusic] = useState();
    const [party, setParty] = useState();
    const [furniture, setFurniture] = useState('')
    const [commonarea, setCommanarea] = useState('');
    const params = useParams();
    const [load, setLoad] = useState(true)
    useEffect(() => {
        Roomsingle();
    }, [])

    const Roomsingle = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/room/roomlist/${params.id}`);
        data = await data.json();
        setImage(data.roomimg);
        setRoomname(data.roomname);
        setAddress(data.address);
        setDistrict(data.district);
        setState(data.state);
        setDic(data.dic);
        setFullroomprice(data.Fullroomprice);
        setSiglebedprice(data.Siglebedprice);
        setElectricCharge(data.ElectricCharge);
        setRemainingbed(data.remainingbed);
        setTotalbed(data.Totalbed);
        setRoomtype(data.Roomtype);
        setParking(data.parking);
        setPowerbackup(data.powerbackup);
        setPreferred(data.Preferred);
        setAvailable(data.Available);
        setCooking(data.cooking);
        setClosingtime(data.closingtime);
        setVisitor(data.visitor);
        setBathroom(data.bathroom);
        setOppsiteGender(data.OppsiteGender);
        setSmoking(data.Smoking);
        setLoudMusic(data.LoudMusic);
        setParty(data.party);
        setAcroom(data.acroom);
        setFurniture(data.furniture);
        setCommanarea(data.commonarea);

    }
    const [modalShow, setModalShow] = React.useState(false);

    const fun = () => {
        if (remainingbed > 0) {
            setModalShow(true)
        }
        else {
            toast("Room is full")
        }
    }
    return (
        <div >
            <div className='container mt-3'>
                <div className='row'>
                    <div id='singlerooms'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                                    <Carousel slide={true}>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={b1}
                                                alt="First slide"
                                                style={{ height: "330px", borderRadius: "5px" }}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={b2}
                                                alt="Second slide"
                                                style={{ height: "330px", borderRadius: "5px" }}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={b1}
                                                alt="Third slide"
                                                style={{ height: "330px", borderRadius: "5px" }}
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <span style={{ fontWeight: "bold" }}>{roomname} / in {address} / {district}</span><br></br>
                                            <span style={{ fontSize: "12px" }}>{dic}</span>
                                            <hr></hr>
                                        </div>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Price/bed</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{siglebedprice}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>price/room</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{fullroomprice}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Electric Charges</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{electricCharge}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Bathroom</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{bathroom}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>AC Rooms</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{acroom}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Parking</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{parking}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Power Backup</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{powerbackup}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Preferred Tenants</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{preferred}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Available for</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{available}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Total Beds</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{totalbed}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Room type</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{roomtype}</span>
                                                </div>
                                                <div className='col-3'>
                                                    <span style={{ fontSize: "13px" }}>Cooking</span><br></br>
                                                    <span style={{ fontWeight: "bold" }}>{cooking}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='col-12 text-center'>
                                            <div>
                                                <button className='btn btn-danger' onClick={fun}>Book now</button>
                                            </div>

                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                            />





                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='container mt-3'>
                    <h3>House Rules</h3>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Gate close time</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{closingtime}</span>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Visitor Entery</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{visitor}</span>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Oppsite Gender</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{oppsiteGender}</span>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Smoking</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{smoking}</span>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Loud music</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{loudMusic}</span>
                                </div>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                    <span style={{ fontSize: "10px" }}>Party</span><br></br>
                                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>{party}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='container mt-3'>
                    <h3>Furniture</h3>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                            {
                                furniture && furniture.length > 0
                                    ? furniture.map((item) => (
                                        <div className='row'>
                                            <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                                <span style={{ fontSize: "15px", fontWeight: "bold" }}>{item}</span><br></br>
                                            </div>
                                        </div>
                                    )) : null

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='container mt-3'>
                    <h3>Common Area and Amenities</h3>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                            {
                                commonarea && commonarea.length > 0 ?
                                    commonarea.map((item) => (

                                        <div className='row'>
                                            <div className='col-lg-2 col-md-2 col-sm-3 col-3'>
                                                <span style={{ fontSize: "15px", fontWeight: "bold" }}>{item}</span><br></br>
                                            </div>
                                        </div>


                                    )) : null
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className='container mt-3'>
                    <h4 style={{ color: "red" }}>Info For you</h4>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 col-md-6 col-12'>
                            <ul>
                                <li>100% refund after 24 hours of cancellation</li>
                                <li>All the details of owner will send After payment (onwer number,address,google map location)</li>
                                <li>For more info about pg contact us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roomsingle;
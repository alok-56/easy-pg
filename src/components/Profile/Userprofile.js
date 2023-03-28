import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Faq from "../FAQ/Faq";
import Footer from "../Footer/Footer";
import Navpage from "../Navbar/Navbar";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SpinnerRoundOutlined } from 'spinners-react';

function MyVerticallyCenteredModal(props) {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [number, SetNumber] = useState('');
    const [gender, SetGender] = useState('');
    const [images, SetImages] = useState('')
    const [loading, setLoading] = useState(false)
    const [spin, setSpin] = useState(true)
    const navigate = useNavigate();
    const [profession, SetProfession] = useState('');
    const userid = JSON.parse(localStorage.getItem('user'))._id;


    async function handle(e) {
        setLoading(true)
        setSpin(false)
        const files = e.target.files;
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", 'vsqmoxq9')
        const res = await fetch('https://api.cloudinary.com/v1_1/dxlmwq61j/image/upload', {
            method: 'post',
            body: data
        })
        const file = await res.json()
        SetImages(file.secure_url)
        setLoading(false)
        setSpin(true);
    }

    useEffect(() => {
        user();
    }, [])
    const user = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/Aut/singleuser/${userid}`);
        data = await data.json();
        SetName(data.name);
        SetEmail(data.email);
        SetNumber(data.number);
        SetGender(data.gender);
        SetProfession(data.profession);
        SetImages(data.images)

    }
    const updateuser = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/Aut/profile/${userid}`, {
            method: "put",
            body: JSON.stringify({ name, email, number, gender, profession, images }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json();
        if (data.acknowledged === true) {
            user();
            navigate('/')
        }
    }

    return (
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
                                onChange={(e) => SetName(e.target.value)}
                            />
                            <Form.Control
                                placeholder="Contact number"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={number}
                                onChange={(e) => SetNumber(e.target.value)}
                            />
                            <Form.Control
                                placeholder="Enter your Email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                            />
                            {
                                loading ? <div style={{ textAlign: "center" }}>
                                    <SpinnerRoundOutlined size={30} thickness={100} speed={133} color="#36ad47" />
                                </div> : null
                            }
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Select Your images</Form.Label>
                                <Form.Control type="file" name="image" onChange={handle} />
                            </Form.Group>
                            <Form.Select aria-label="Default select example" style={{ margin: "5px" }}
                                value={gender}
                                onChange={(e) => SetGender(e.target.value)}
                            >
                                <option>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" style={{ margin: "5px" }}
                                value={profession}
                                onChange={(e) => SetProfession(e.target.value)}
                            >
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
                    spin ? <Button onClick={updateuser}>Conform</Button> : null

                }

            </Modal.Footer>
        </Modal>
    );
}

const Userprofile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, SetNumber] = useState('');
    const [gender, SetGender] = useState('');
    const [images, SetImages] = useState('')
    const userid = JSON.parse(localStorage.getItem('user'))._id;
    const [load, setLoad] = useState(true)
    useEffect(() => {
        user();

    }, [])
    const user = async () => {
        let data = await fetch(`https://easy-ser.vercel.app/Aut/singleuser/${userid}`);
        data = await data.json();
        setName(data.name);
        setEmail(data.email);
        SetNumber(data.number);
        SetGender(data.gender);
        SetImages(data.images)
        setLoad(false)
    }
    const [modalShow, setModalShow] = React.useState(false);
    const Navigate = useNavigate();
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
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center mt-3">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ display: "block" }}>
                                        <img width={150} src={images} style={{ borderRadius: "50%", maxHeight: "200px" }} alt="profile"></img>
                                    </div>
                                    <div className="m-3">
                                        <span>{name}({gender})</span><br></br>
                                        <span style={{ fontSize: "13px" }}>{email}</span><br></br>
                                        <span style={{ fontSize: "13px" }}>{number}</span>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => setModalShow(true)} className="btn btn-danger">Edit Profile</button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                <button
                                    onClick={() => Navigate('/profile/booking/' + userid)}
                                    className="btn btn-light" style={{ border: "2px solid black", width: "100%" }}>My Booking</button>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-1">
                                <button
                                    onClick={() => Navigate('/profile/cancel/' + userid)}
                                    className="btn btn-light" style={{ border: "2px solid black", width: "100%" }}>Cancelled Rooms</button>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-1">
                                <button
                                    onClick={() => Navigate('/profile/payment/' + userid)}
                                    className="btn btn-light" style={{ border: "2px solid black", width: "100%" }}>My Payment</button>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-1">
                                <button
                                    onClick={() => Navigate('/profile/Transition/' + userid)}
                                    className="btn btn-light" style={{ border: "2px solid black", width: "100%" }}>Transition</button>
                            </div>
                        </div>
                    </div>
            }
            <Faq></Faq>
            <Footer></Footer>

        </div>
    )
}

export default Userprofile;
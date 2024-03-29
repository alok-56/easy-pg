import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import b2 from "./images/rooms.jpg";
import "./Roomsingle.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import "react-toastify/dist/ReactToastify.css";
import { SpinnerRoundOutlined } from "spinners-react";
import { ToastContainer, toast } from "react-toastify";
import Chat from "../Chat";

function MyVerticallyCenteredModal(props) {
  const [price, setPrice] = useState(100);
  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [roomname, setRoomname] = useState("");
  const [Ages, setAges] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("booked");
  const [img, setImg] = useState("");
  const [singlebedprice, setSiglebedprice] = useState("");
  const [fullroomprice, setFullroomprice] = useState("");
  const [pay, setPay] = useState("paid");
  const [roomimg, setRoomimg] = useState(" ");

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [usersId, setUsersId] = useState("");
  const [productId, setProductId] = useState("");
  const [sellerId, setSellerId] = useState("");

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [ownername, setOwnername] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerNumber, setOwnerNumber] = useState();

  const [remaining, setRemaining] = useState("");
  let extendpay = 0;

  const [add, setAdd] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState("");

  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    const username = JSON.parse(localStorage.getItem("user")).name;
    const useremail = JSON.parse(localStorage.getItem("user")).email;
    const numbers = JSON.parse(localStorage.getItem("user")).number;
    setUsersId(userid);
    setProductId(params.id);
    setName(username);
    setEmail(useremail);
    setNumber(numbers);
    productdata();
  }, []);

  const productdata = async () => {
    let data = await fetch(
      `https://easy-ser.vercel.app/room/roomlist/${params.id}`
    );
    data = await data.json();
    console.log(data);
    setRoomname(data.roomname);
    setImg(data.img);
    setSellerId(data.SellerId);
    setSiglebedprice(data.Siglebedprice);
    setFullroomprice(data.Fullroomprice);
    setState(data.state);
    setDistrict(data.district);
    setOwnername(data.name);
    setOwnerEmail(data.email);
    setOwnerNumber(data.number);
    setAdd(data.address);
    setRemaining(data.remainingbed);
    setRoomimg(data.roomimg);
    setLat(data.lat);
    setLon(data.lon);
    console.log(roomimg);
  };
  var date = new Date();
  var time = new Date().getTime();
  const lastdate = new Date();
  lastdate.setDate(lastdate.getDate() + 30);

  // console.log(usersId, sellerId, roomname, name, email, Ages, gender, price, transitionId, orderId, date,status)

  const handlerazarpay = async (data) => {
    const options = {
      key: "rzp_test_MtraH0q566XjUb",
      amount: Number(data.price) * 100,
      currency: data.currency,
      name: "THIRD HOME",
      order_id: data.id,
      handler: async function(response) {
        let data = await fetch("https://easy-ser.vercel.app/payment/verify", {
          method: "post",
          body: JSON.stringify({ response }),
          headers: {
            "content-type": "application/json",
          },
        });
        data = await data.json();
        if (data.code === 200) {
          postbooking(data);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const postbooking = async (db) => {
    setLoad(true);
    let transitionId = db.data.payment_id;
    let orderId = db.data.order_id;

    // let transitionId = "Free";
    // let orderId = "Free";

    let data = await fetch(
      `https://easy-ser.vercel.app/roombooking/postbooking`,
      {
        method: "post",
        body: JSON.stringify({
          usersId,
          sellerId,
          transitionId,
          orderId,
          lastdate,
          productId,
          name,
          pay,
          email,
          roomimg,
          Ages,
          date,
          time,
          status,
          price,
          roomname,
          state,
          add,
          district,
          ownerEmail,
          ownername,
          ownerNumber,
          extendpay,
          lat,
          lon,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    data = await data.json();
    if (data) {
      navigate("/profile/booking/" + usersId);
      update();
      setLoad(false);
      console.log("output", data._id);
      sendEmail(data._id);
      sellerEmail(data._id);
    } else {
      setLoad(false);
    }
  };

  const update = async () => {
    let remainingbed = remaining - 1;
    let data = await fetch(
      `https://easy-ser.vercel.app/room/update/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({ remainingbed }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    data = await data.json();
    if (data) {
      console.log(data);
    }
  };

  const sendEmail = async () => {
    let track = `https://www.google.com/maps?q=${lat},${lon}&z=17&hl=en`;
    let data = await fetch(
      `https://easy-ser.vercel.app/roombooking/book/notify`,
      {
        method: "post",
        body: JSON.stringify({
          email,
          ownername,
          ownerNumber,
          sellerId,
          track,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    data = await data.json();
    if (data) {
      console.log("send");
    }
  };

  const sellerEmail = async () => {
    let data = await fetch(
      "https://easy-ser.vercel.app/roombooking/book/sellnotify",
      {
        method: "post",
        body: JSON.stringify({ ownerEmail, usersId, number, name, email }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    data = await data.json();
    if (data) {
      console.log("send");
    }
  };
  const Paynow = async () => {
    setLoad(false);
    setTimeout(() => {
      setLoad(true);
    }, 3000);
    let result = await fetch(`https://easy-ser.vercel.app/payment/orders`, {
      method: "post",
      body: JSON.stringify({ price }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.code === 200) {
      handlerazarpay(result.data);
    } else {
      toast("Empty Details");
    }
  };
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "red" }}
          >
            Enter Yours Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-12" id="select">
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
                  onChange={(e) => {
                    setAges(e.target.value);
                  }}
                />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                  style={{ margin: "5px" }}
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ margin: "5px" }}
                >
                  <option>Select Booking Type</option>
                  <option value={singlebedprice}>Single Beds</option>
                  <option value={fullroomprice}>Full room</option>
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  style={{ margin: "5px" }}
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
          {load ? (
            <Button onClick={Paynow}>Proceed</Button>
          ) : (
            <SpinnerCircular />
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const Roomsingle = () => {
  const [image, setImage] = useState();
  const [roomname, setRoomname] = useState();
  const [district, setDistrict] = useState();
  const [address, setAddress] = useState("");
  const [state, setState] = useState();
  const [dic, setDic] = useState();
  const [siglebedprice, setSiglebedprice] = useState();
  const [fullroomprice, setFullroomprice] = useState();
  const [electricCharge, setElectricCharge] = useState();
  const [parking, setParking] = useState();
  const [powerbackup, setPowerbackup] = useState();
  const [preferred, setPreferred] = useState();
  const [available, setAvailable] = useState();
  const [totalbed, setTotalbed] = useState();
  const [remainingbed, setRemainingbed] = useState("");
  const [acroom, setAcroom] = useState("");
  const [roomtype, setRoomtype] = useState();
  const [cooking, setCooking] = useState();
  const [bathroom, setBathroom] = useState();
  const [visitor, setVisitor] = useState();
  const [oppsiteGender, setOppsiteGender] = useState();
  const [closingtime, setClosingtime] = useState();
  const [smoking, setSmoking] = useState();
  const [loudMusic, setLoudMusic] = useState();
  const [party, setParty] = useState();
  const [furniture, setFurniture] = useState("");
  const [commonarea, setCommanarea] = useState("");
  const params = useParams();
  const [load, setLoad] = useState(true);
  const [load1, setLoad1] = useState(true);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  useEffect(() => {
    Roomsingle();
  }, []);

  const Roomsingle = async () => {
    let data = await fetch(
      `https://easy-ser.vercel.app/room/roomlist/${params.id}`
    );
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
    setLoad1(false);
    setImage(data.roomimg);
    setLat(data.lat);
    setLon(data.lon);
  };
  const [modalShow, setModalShow] = React.useState(false);

  const fun = () => {
    // if (remainingbed > 0) {
    //   setModalShow(true);
    // } else {
    //   toast("Room is full");
    // }
    setModalShow(true);
  };
  return (
    <div>
      <Chat></Chat>
      {load1 ? (
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
        <div>
          <div className="container mt-3">
            <div className="row">
              <div id="singlerooms">
                <div className="col-12">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <Carousel slide={true}>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt="First slide"
                            style={{ height: "330px", borderRadius: "5px" }}
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt="Second slide"
                            style={{ height: "330px", borderRadius: "5px" }}
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt="Third slide"
                            style={{ height: "330px", borderRadius: "5px" }}
                          />
                        </Carousel.Item>
                      </Carousel>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                      <div className="row">
                        <div className="col-12">
                          <span style={{ fontWeight: "bold" }}>
                            {roomname} / in {address} / {district}
                          </span>
                          <br></br>
                          <span style={{ fontSize: "12px" }}>{dic}</span>
                          <hr></hr>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Price/bed
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {siglebedprice}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                price/room
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {fullroomprice}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Electric Charges
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {electricCharge}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>Bathroom</span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {bathroom}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>AC Rooms</span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {acroom}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>Parking</span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {parking}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Power Backup
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {powerbackup}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Preferred Tenants
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {preferred}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Available for
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {available}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Total Beds
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {totalbed}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>
                                Room type
                              </span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {roomtype}
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ fontSize: "13px" }}>Cooking</span>
                              <br></br>
                              <span style={{ fontWeight: "bold" }}>
                                {cooking}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-center">
                          <div>
                            <button
                              className="btn btn-danger"
                              onClick={fun}
                              style={{ width: "100%" }}
                            >
                              Book Now
                            </button>
                          </div>

                          <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-center">
                          <div>
                            <button
                              className="btn btn-danger"
                              style={{ width: "100%" }}
                            >
                              <a
                                href={`https://www.google.com/maps?q=${lat},${lon}&z=17&hl=en`}
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                              >
                                Track location
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="container mt-3">
              <h3>House Rules</h3>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Gate close time</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {closingtime}
                      </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Visitor Entery</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {visitor}
                      </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Oppsite Gender</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {oppsiteGender}
                      </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Smoking</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {smoking}
                      </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Loud music</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {loudMusic}
                      </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                      <span style={{ fontSize: "10px" }}>Party</span>
                      <br></br>
                      <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {party}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container mt-3">
              <h3>Furniture</h3>
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  {furniture && furniture.length > 0
                    ? furniture.map((item) => (
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                            <span
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            >
                              {item}
                            </span>
                            <br></br>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container mt-3">
              <h3>Common Area and Amenities</h3>
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  {commonarea && commonarea.length > 0
                    ? commonarea.map((item) => (
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                            <span
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            >
                              {item}
                            </span>
                            <br></br>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container mt-3">
              <h4 style={{ color: "red" }}>Info For you</h4>
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                  <ul>
                    <li>100% refund after 24 hours of cancellation</li>
                    <li>
                      All the details of owner will send After payment (onwer
                      number,address,google map location)
                    </li>
                    <li>For more info about pg contact us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roomsingle;

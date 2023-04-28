import React from "react";
import { Link } from "react-router-dom";
import room from './images/rooms.jpeg'
import del1 from './images/del1.jpg'
import del3 from './images/del3.jpg'
import del4 from './images/del4.jpg'
import del5 from './images/del5.jpg'
import step1 from './images/step1.png'
import step2 from './images/step2.png'
import step3 from './images/set3.png'
import step4 from './images/step4.png'
import step5 from './images/play.png'
import own1 from './images/own1.png'
import own2 from './images/own2.png'
import own3 from './images/own3.png'
import "./service.css"

const Service = () => {
    return (
        <div>
            <div id="ser">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-last order-md-last order-sm-first order-first">
                            <img style={{ height: "300px", width: "100%", borderRadius: "5px" }} src={del1}></img>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-5 text-center">
                            <h3 style={{ fontWeight: "bold" }}>What if you face any problem while booking in EasyPg?</h3>
                            <p style={{ fontSize: "13px" }}>
                                Easy Pg's team is dedicated to providing excellent customer service
                                to ensure that students have a hassle-free experience finding the
                                perfect PG accommodation. The platform's focus on user experience and
                                convenience has made it a popular choice for students in Bhilai.
                                With Easy Pg's comprehensive platform, students can easily find a
                                comfortable and affordable PG accommodation that meets their specific needs.
                            </p>

                        </div>
                    </div>
                    {/* <div className="row mt-3" >
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-5 text-center order-lg-none order-md-none order-sm-last order-last ">
                            <h3 style={{ fontWeight: "bold" }}>pg rooms we provide</h3>
                            <p style={{fontSize:"13px"}}> pg rooms we provide pg rooms we provide pg rooms we provide
                                we provide pg rooms we provide pg rooms we provide
                                we provide pg rooms we provide pg rooms we provide
                            </p>
                            <button className="btn btn-danger" style={{fontWeight:"bold"}}>Search mess</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-last " >
                            <img style={{ height: "300px", width: "100%", borderRadius: "5px" }} src={mess}></img>
                        </div>
                    </div> */}
                </div>
            </div>
            <hr></hr>

            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="text-center ">
                            <h3>EasyPg</h3>
                            <h1>For Owner’s Who Host Students</h1>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4 text-center ">
                            <img className="img-fluid" style={{ height: "250px", borderRadius: "10px" }} src={del3}></img>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-5 ">
                            <h3>Is room posted by the Owner verified?</h3>
                            <p>YES! To get started, owners need to create an account and
                                complete the verification process. This ensures that only
                                genuine owners can use the app, promoting transparency and
                                security. After verification, PG owners can start posting
                                their available rooms, including pictures, descriptions, and
                                other details such as location, price, and amenities provided.
                            </p>
                        </div>
                    </div>

                </div>
            </div>


            <div style={{ backgroundColor: "#000", marginTop: "50px",color:"#fff" }}>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-5 col-md-5 col-sm-12 col-12 text-center" id="content1" style={{ marginTop: "100px" }}>
                            <h2>Owner? Post it and Host it..</h2>
                            <h3>Students are looking after you</h3>
                            <p>This feature is a great opportunity for owners to monetize their extra living space
                                and to provide a safe and comfortable living environment for students.</p>
                        </div>

                        <div className="col-lg-7 col-md-7 col-sm-12 col-12 text-center" id="step" style={{ marginTop: "130px" }}>
                            <div>
                                <img className="img-fluid" style={{ height: "300px" }} src={own3}></img>
                                
                            </div>
                            <div id="img2">
                                <img className="img-fluid" style={{ height: "300px", marginTop: "60px" }} src={own2}></img>
                               
                            </div>
                            <div id="img3">
                                <img className="img-fluid" style={{ height: "300px", marginTop: "110px" }} src={own1}></img>
                                

                            </div>


                        </div>

                    </div>
                </div>



            </div>



            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12 order-lg-last order-md-last order-sm-first order-first">
                            <img style={{ height: "250px", width: "100%", borderRadius: "5px" }} src={del4}></img>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-5 ">
                            <h3 style={{ fontWeight: "bold" }}>How to get started with EasyPg app as a host?</h3>
                            <p style={{ fontSize: "13px" }}>
                                Owners need to create an account and complete the verification process.
                                This ensures that only genuine users can use the app, promoting transparency
                                and security. After verification, PG owners can start posting their available
                                rooms, including pictures, descriptions and other details such as location, price,
                                and amenities provided.
                            </p>

                        </div>
                    </div>

                </div>
            </div>


            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <img style={{ height: "250px", width: "100%", borderRadius: "5px" }} src={del5}></img>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-5 ">
                            <h3 style={{ fontWeight: "bold" }}>Is there any criteria for posting rooms in EasyPg?</h3>
                            <p style={{ fontSize: "13px" }}>
                                Easy Pg's team ensures that all listings on the platform meet their
                                standards of quality, safety, and comfort. Owners who list their
                                accommodations on the platform are required to meet specific criteria,
                                such as providing basic amenities, maintaining cleanliness, and adhering
                                to local laws and regulations.
                            </p>

                        </div>
                    </div>
                </div>
            </div>


            <div style={{ backgroundColor: "#000", padding: "35px", height: "500" }} className="mt-5">
                <div className="container">
                    <div className="row text-center" >
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <img style={{ height: "450px", position: "relative", top: "45px" }} src={step3}></img>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12" id="img2">
                            <img style={{ height: "450px", position: "relative", bottom: "25px" }} src={step2}></img>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <img style={{ height: "450px", position: "relative", top: "45px" }} src={step1}></img>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5" id="app">
                    <span className="btn btn-dark" style={{ width: "160px" }}><img style={{ height: "30px" }} src={step5}></img>Google play</span>
                </div>
            </div>



        </div>
    )
}

export default Service;
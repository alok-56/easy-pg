import React from "react";
import "./Mob.css"
import mob1 from './images/mob1.png'
import step1 from './images/step1.png'
import step2 from './images/step2.png'
import step3 from './images/step3.png'
import del2 from './images/del2.png'


const Mob = () => {
    return (
        <div>
            <div id="mob_top">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                            <div style={{ textAlign: "center", position: "relative", top: "30%", color: "#fff" }} >
                                <h2>Now, Pg and Hostels
                                    in your pocket.</h2>
                                <p>The platform's comprehensive and easy-to-use
                                    interface makes the process of finding the perfect PG
                                    accommodation hassle-free.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div style={{ textAlign: "center" }} id="mob1">
                                <img style={{ height: "400px", marginTop: "5%" }} className="img-fluid" src={mob1}></img>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-12 text-center" id="step">
                        <div>
                            <img className="img-fluid" style={{ height: "300px" }} src={step1}></img>
                            <h4>STEP 1</h4>
                        </div>
                        <div id="img2">
                            <img className="img-fluid" style={{ height: "300px", marginTop: "60px" }} src={step2}></img>
                            <h4>STEP 2</h4>
                        </div>
                        <div id="img3">
                            <img className="img-fluid" style={{ height: "300px", marginTop: "110px" }} src={step3}></img>
                            <h4>STEP 3</h4>

                        </div>


                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 " id="content" style={{ marginTop: "50px" }}>
                        <h1>Book your Pg/Hostel
                            in just 3 simple steps.</h1>
                        <p>
                            1. Find suitable room for you and check details.<br></br>
                            2. After confirmation click on Book Now button.<br></br>
                            3. And the last step, Add the payment method and pay. Woahhhh! That’s it!</p>
                    </div>

                </div>
            </div>

            <div style={{ backgroundColor: "#000", padding: "25px", color: "#fff", marginTop: "-80px" }}>
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12 text-center" >
                            <img className="img-fluid" style={{ height: "250px", borderRadius: "10px" }} src={del2}></img>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-5">
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
        </div>
    )
}

export default Mob;
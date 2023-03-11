import React, { useState } from "react";
import "./Faq.css"

const Faq = () => {
    const [show, SetShow] = useState(false)
    const [show1, SetShow1] = useState(false)
    const [show2, SetShow2] = useState(false)
    const [show3, SetShow3] = useState(false)
    const [show4, SetShow4] = useState(false)
    const [show5, SetShow5] = useState(false)
    return (
        <div id="faq">
            <div className="container mt-lg-5 mt-sm-3 mt-md-5 mt-3">
                <div className="row">
                    <h4 style={{ fontWeight: "bold" }}>Frequently Asked question</h4>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q: </span><span>Can We get refund after cancellation?</span>
                        {
                            show ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show ? <div className="p-2"><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'
                            }}>Yes..You get rufund of full amount of payment if you cancel your booking within 24 hours..</span></div> : null
                        }

                    </div>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q:</span><span> How we get location of a room ?</span>
                        {
                            show1 ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow1(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow1(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show1 ? <div><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'
                            }}>When you make payment of room..after the success of a payment.. you are redirected to owner details page where you get all the details of owner..</span></div> : null
                        }
                    </div>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q:</span><span> can we complain about room?</span>
                        {
                            show2 ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow2(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow2(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show2 ? <div><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'
                            }}>yes..you can complain if facilities are not avialable which are listed in site..</span></div> : null
                        }

                    </div>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q:</span><span> Process of refund after cancellation?</span>
                        {
                            show3 ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow3(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow3(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show3 ? <div><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'
                            }}> step 1 : Go to your profile section <br></br>
                                step 2 : click on my booking buttom <br></br>
                                step 3 : click on cancel booking buttom <br></br>
                                step 4 : enter the reason of cancellation <br></br>
                                step 5 : click ok button
                            </span></div> : null
                        }

                    </div>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q:</span><span> How we make payment to next month ?</span>
                        {
                            show4 ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow4(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow4(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show4 ? <div><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'
                            }}> when your month is completed you automatically get notifaication on your gmail..and we amke payment from payment page..</span></div> : null
                        }

                    </div>
                    <div className="col-12">
                        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Q:</span><span> How can we post room on site ?</span>
                        {
                            show5 ? <span style={{ marginLeft: "15px" }} onClick={() => SetShow5(false)}><i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i></span> : <span onClick={() => SetShow5(true)} style={{ marginLeft: "15px" }}><i style={{ fontSize: "20px" }} class="fa-solid fa-plus"></i></span>
                        }
                        {
                            show5 ? <div><span style={{
                                marginLeft: "0px",
                                padding: "5px",
                                fontSize: "13px",
                                border: "1px solid black",
                                fontWeight: "bold",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "black",
                                color: '#fff'

                            }}> step 1 : download our seller app <br></br>
                                step 2 : make account on seller app<br></br>
                                step 3 : enter your detials and wait untill verification<br></br>
                                step 4 : if you verified post the rooms</span></div> : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Faq;
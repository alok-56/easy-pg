import React from "react";
import "./Verified.css"
import s1 from './images/1.svg'
import s2 from './images/2.svg'
import s3 from './images/3.svg'

const Verified = () => {
    return (
        <div id="veri">
            <div className="container ">
                <div className="row text-center">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div>
                            <img style={{ height: "150px" }} src={s1}></img>
                        </div>
                        <div>
                            <p style={{ fontFamily: "font-family: 'Unbounded', cursive;" }}>Choose from thousands of 100%
                                genuine PG homes. Single room or
                                a shared one, we have got it all.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div>
                            <img style={{ height: "150px" }} src={s2}></img>
                        </div>
                        <div>
                            <p>Easy steps for booking a pg with various facility  </p>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div>
                            <img style={{ height: "150px" }} src={s3}></img>
                        </div>
                        <div>
                            <p>We have different pg avialable around your college which provides different facility.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Verified;
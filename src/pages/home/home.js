import React from "react";
import Faq from "../../components/FAQ/Faq";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Navbar/Header";
import Navbar from "../../components/Navbar/Navbar";
import Service from "../../components/Services/Service";
import Toppg from "../../components/Toppg/Toppg";
import Verified from "../../components/Verified/Verified";
import Whyus from "../../components/Whyus/Whyus";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <Whyus></Whyus>
            <Service></Service>
            <Toppg></Toppg>
            <Verified></Verified>
            <Faq></Faq>
            <Footer></Footer>
        </div>
    )
}

export default Home;
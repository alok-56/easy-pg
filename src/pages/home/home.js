import React from "react";
import Chat from "../../components/Chat";
import Faq from "../../components/FAQ/Faq";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Navbar/Header";
import Navbar from "../../components/Navbar/Navbar";
import Service from "../../components/Services/Service";
import Toppg from "../../components/Toppg/Toppg";
import Verified from "../../components/Verified/Verified";
import Whyus from "../../components/Whyus/Whyus";
import Mob from "../../components/Mob/Mob";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Chat></Chat>
            <Header></Header>
            <Whyus></Whyus>
            <Mob></Mob>
            <Service></Service>
            <Verified></Verified>
            <Footer></Footer>
        </div>
    )
}

export default Home;
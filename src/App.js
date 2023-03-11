import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Forgotpass from './components/Forgotpass/Forgotpass';
import Otp from './components/Otp/Otp';
import Setpass from './components/Setpass/Setpass';
import Rooms from './pages/rooms/rooms';
import Roomsinglenav from './components/Roomsinglenav/Roomsinglenav';
import Profile from './pages/Profile/Profile';
import Booking from './components/Booking/Booking';
import Cancelled from './components/Cancelled/Cancelled';
import Payment from './components/Payment/Payment';
import Transition from './components/Transition/Transition';
import Privatecom from './components/Privatecom/Privatecom';
import Success from './components/Succcess/Success';
import Ownerinfo from './components/Ownerinfo/ownerinfo';
import Map from './components/Map/Map';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Privatecom></Privatecom>}>
            <Route path='/profile/booking/:id' element={<Booking></Booking>}></Route>
            <Route path='/profile/cancel/:id' element={<Cancelled></Cancelled>}></Route>
            <Route path='/profile/payment/:id' element={<Payment></Payment>}></Route>
            <Route path='/profile/Transition/:id' element={<Transition></Transition>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/loc' element={<Map></Map>}></Route>
            <Route path='/Success/:id' element={<Success></Success>}></Route>
            <Route path='/Ownerinfo/:id' element={<Ownerinfo></Ownerinfo>}></Route>
          </Route>

          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/Otp' element={<Otp></Otp>}></Route>
          <Route path='/Setpass' element={<Setpass></Setpass>}></Route>
          <Route path='/Forgot' element={<Forgotpass></Forgotpass>}></Route>
          <Route path='/Signup' element={<Signup></Signup>}></Route>
          <Route path='/Signin' element={<Login></Login>}></Route>
          <Route path='/Rooms' element={<Rooms></Rooms>}></Route>
          <Route path='/Rooms/single/:id' element={<Roomsinglenav></Roomsinglenav>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privatecom=()=>{
    const user=localStorage.getItem('user')
    return(
        <div>
            {
                user?<Outlet></Outlet>:<Navigate to='/signin'></Navigate>
            }

        </div>
    )
}

export default Privatecom;
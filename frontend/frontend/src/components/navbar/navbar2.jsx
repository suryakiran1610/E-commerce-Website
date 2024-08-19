import React from "react";
import './navbar2.css'

function Navbar2(){

    return(

        <>
            <div className="panel">
                <div className="menu-icon border">
                    <i className="fa-solid fa-bars"></i>
                     All
                </div>
                <div className="panel-opt">
                    <p className="border">Today's Deals</p>
                    <p className="border">Registry</p>    
                    <p className="border">Customer Service</p>
                    <p className="border">Gift Cards</p>
                    <p className="border">Sell</p>
                </div>
                <div className="panel-deals border">
                    Shop Deals In Electronics
                </div>
            </div>
        </>
    )
}
export default Navbar2
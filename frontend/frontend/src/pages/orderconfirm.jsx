import React from "react";
import './orderconfirm.css';
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";
import Footer from "../components/navbar/footer";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

function Orderconfirm(){

    const token=Cookies.get('token')
    const decoded=jwtDecode(token)

    const navigateee=useNavigate()


    return(

        <>
        <Navbar/>
        <Navbar2/>
            <div className="ordconfdivs0">
                <div className="ordconfdivs8">
                    <div className="ordconfdivs1">
                        <div className="ordconfdivs2">
                            <div className="ordconfdivs4">
                            </div>
                        </div>
                        <div className="ordconfdivs3">
                            <h2>Order Confirmed</h2>
                        </div>
                    </div>
                </div>
                <div className="ordconfdivs5">
                    <div className="ordconfdivs6">
                        <h3>Hello, {decoded.username}</h3>
                    </div>
                </div>
                <div className="ordconfdivs9">
                    <div className="ordconfdivs10">
                        <h3>Thank you for shopping with us we'll send a confirmation when your item ships</h3>
                    </div>
                </div>
                <div className="ordconfdivs11">
                    <div className="ordconfdivs12">
                        <h3>Details</h3>
                        <h5>Order#<span>112-50562198-4093619</span></h5>
                    </div>
                </div>
                <div className="ordconfdivs13">
                    <div className="ordconfdivs14">
                        <h2>Arriving</h2>
                        <h3>Thursday May 10</h3>
                    </div>
                    <div className="ordconfdivs15">
                        <button onClick={()=>navigateee('/listorder')}>View Order</button>
                    </div>
                </div>
                <div className="ordconfdivs16">
                    <div className="ordconfdivs17">
                        <h3>We hope to see you again soon..</h3>
                    </div>
                </div>
            </div>
            <div className="footpanel4">
                    <div className="pages">
                        <a> Conditions of Use</a>
                        <a >Privacy Notice</a>
                        <a >Your Ads Privacy Choices</a>
                    </div>
                    <div className="copyright">
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                    </div>
            </div>    
        </>

    )
}

export default Orderconfirm;
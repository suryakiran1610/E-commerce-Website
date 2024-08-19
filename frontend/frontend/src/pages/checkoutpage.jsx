import React, { useState } from "react";
import './checkoutpage.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Checkout(){
    const[address,setAddress]=useState()
    const navigate=useNavigate()

    const token=Cookies.get('token')
    const decoded=jwtDecode(token)

    const formData = new FormData();
    formData.append('address', address);


    const handlesubmit=(e)=>{
        e.preventDefault()
        axios.patch('http://127.0.0.1:8000/myapp/checkaddress/'+decoded.user_id,formData)
        .then(response=>{
            console.log(response.data)
            navigate('/orderconfirm')
        })
        .catch(error=>{
            console.log("error",error)
        })
    }

    return(
        <>
            <Navbar/>
            <Navbar2/>
            <form onSubmit={handlesubmit}>
            <div className="checkoutdivno1">
                <div className="checkoutdivno2">
                    <div className="checkoutdivno3">
                            <label>Enter Shiping Address:</label>
                            <input type='text' placeholder="full address" onChange={(e)=>setAddress(e.target.value)}></input>
                    </div>
                </div> 
                <div className="checkoutdivno19">
                    <div className="checkoutdivno20">
                        <p>Select a Payment Method</p>
                    </div>    
                </div>
                <div className="checkoutdivno4">
                    <div className="checkoutdivno5">
                        <div className="checkoutdivno6">
                            <div className="checkoutdivno8">
                                <label>CREDIT & DEBIT CARDS</label>
                            </div>
                            <div className="checkoutdivno7">
                                <input type='radio'/>
                                <p>credit or debit card</p>
                            </div>
                        </div>
                        <div className="checkoutdivno9">
                            <div className="checkoutdivno10">
                                <label>UPI</label>
                            </div>
                            <div className="checkoutdivno11">
                                <div className="checkoutdivno12">
                                    <input type='radio'/>
                                    <p>other UPI Apps</p>
                                </div>
                                <hr></hr>
                                <div className="checkoutdivno13">
                                    <FaCirclePlus  className="checkoutdivnopi"/>
                                    <p className="checkoutdivnopi">Add Account</p>
                                </div>
                            </div>
                        </div>
                        <div className="checkoutdivno15">
                            <div className="checkoutdivno16">
                                <label>MORE WAYS TO PAY</label>
                            </div>
                            <hr></hr>
                            <div className="checkoutdivno17">
                                <input type='radio'/>
                                <p>Amazonpay Later</p>
                            </div>
                            <hr></hr>
                            <div className="checkoutdivno17">
                                <input type='radio'/>
                                <p>EMI</p>
                            </div>
                            <hr></hr>
                            <div className="checkoutdivno17">
                                <input type='radio'/>
                                <p>Net banking</p>
                            </div>
                            <hr></hr>
                            <div className="checkoutdivno17">
                                <input type='radio'/>
                                <p>Cash on Delivery</p>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="checkoutdivno18">
                    <button type='submit' >submit</button>
                </div>
            </div>
            </form>  
        </>
    )
}
export default Checkout;
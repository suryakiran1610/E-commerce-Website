import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import './listorder.css';
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";


function Listorder(){

    const[order,setOrder]=useState([])
    const token=Cookies.get('token')
    const decoded=jwtDecode(token)

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/myapp/orderlists/?userId=${decoded.user_id}`)
        .then(response=>{
            setOrder(response.data)
            console.log(response.data)
        })
        .catch(error=>{
            console.log("error",error)
        })
    },[])

    const calculateSubtotal = (quantity, price) => {
        return quantity * price;
    };

    return(
        <>
        <Navbar/>
        <Navbar2/>
        <div className="details1">
            <h2 >ORDERS</h2>
        </div>
        <div className="cartpagemainscreen12">   
            <div className="mainbox12">
                <div className="box1234">
                    <div className="box2121">
                        <p>No</p>
                        <p className="box31name">Name</p>
                    </div>
                    <div className="box3131">
                        <p className="box31price">Quantity</p>
                        <p className="box31quantity">Price</p>
                        <p className="box31total">Shipping Address</p>
                    </div>
                </div>   
                {order.map((orders,index)=>(
                    <div className="containerr20" key={index}>
                        <div className="containerr21">
                            <p>{index + 1}</p>
                        </div>
                        <div className="containerr23">
                            <p>{orders.product_name}</p>
                            <p>{orders.product_quantity}</p>  
                        </div>
                        <div className="containerr24">      
                            <p>RS {calculateSubtotal(orders.product_quantity, orders.product_total)}/-</p> 
                        </div>
                        <div className="containerr25">  
                            <p>{orders.shipingaddress}</p> 
                        </div>
                    </div>
                ))}
            </div> 
        </div>       
        </>
    )
}

export default Listorder;
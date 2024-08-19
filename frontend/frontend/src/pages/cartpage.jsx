import React, { useEffect, useState } from "react";
import './cartpage.css'
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";
import Footer from "../components/navbar/footer";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';



function Cartpage(){
    const[cartvalues,setCartvalues]=useState([])
    const[updatequantity,setUpdatequantity]=useState("")
    const[updatedvalue,setUpdatedvalue]=useState([])

    const navigate=useNavigate()

    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/myapp/cartvalues/?userId=${decoded.user_id}`)
        .then(response=>{
            setCartvalues(response.data)
            console.log(response.data)
        })
        .catch(error=>{
            console.log("error",error)
        })
    },[])

    const updatecart = (cartId) => {
        axios.patch('http://127.0.0.1:8000/myapp/cartupdate/'+cartId, { proquantity: updatequantity })
        .then(response => {
            const updatedCartValues = cartvalues.map(item => {
                if (item.id === cartId) {
                    return { ...item, proquantity: updatequantity };
                } else {
                    return item;
                }
            });
            setCartvalues(updatedCartValues);
            console.log("updated", response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
    }
    const deletecart = (cartId) => {
        axios.delete('http://127.0.0.1:8000/myapp/cartupdate/'+cartId)
        .then(response => {
            const updatedCartValues = cartvalues.filter(item => item.id !== cartId);
            setCartvalues(updatedCartValues);
            console.log("deleted");
        })
        .catch(error => {
            console.log("error");
        });
    }

    const calculateSubtotal = (quantity, price) => {
        return quantity * price;
    };
    const calculatetotalprice=()=>{
        let totalprice=0;
        cartvalues.forEach(cartitem=>{
            totalprice +=calculateSubtotal(cartitem.proquantity,cartitem.productprice);
        });
        return totalprice;
    } 
    
    const handlecheckout = () => {
        const products = [];
    
        cartvalues.forEach(cartitem => {
            const product = {
                productname: cartitem.productname,
                productquantity: cartitem.proquantity,
                producttotal: calculateSubtotal(cartitem.proquantity, cartitem.productprice),
            };
            products.push(product);
        });
    
        const formData = new FormData();
        formData.append('userid', decoded.user_id);
        formData.append('products', JSON.stringify(products));
    
        axios.post('http://127.0.0.1:8000/myapp/checkout/', formData)
            .then(response => {
                console.log(response.data);
                navigate('/checkout');
            })
            .catch(error => {
                console.log("error", error);
            });
    };
    
        

    

    return(

        <>
        <Navbar/>
        <Navbar2/>
        <div className="details1">
            <h2 >Shopping Cart</h2>
        </div>
        <div className="cartpagemainscreen">   
            <div className="mainbox12">
                <div className="box12">
                    <div className="box21">
                        <p>No</p>
                        <p>Action</p>
                    </div>
                    <div className="box31">
                        <p className="box31name">Name</p>
                        <p className="box31price">Price</p>
                        <p className="box31quantity">Quantity</p>
                        <p className="box31total">Total</p>
                    </div>
                </div>   
                {cartvalues.map((cartvalue,index)=>(
                    <div className="containerr20" key={index}>
                        <div className="containerr21">
                            <p>{index + 1}</p>
                        </div>
                        <div className="containerr22">
                            <button className="delbtn" onClick={()=>deletecart(cartvalue.id)}>Delete</button>
                        </div>
                        <div className="containerr23">
                            <p>{cartvalue.productname}</p>
                            <p>RS {cartvalue.productprice} /-</p>  
                        </div>
                        <div className="containerr24">      
                            <input name="quantity"  defaultValue={cartvalue.proquantity} type="number" min="1" className="inpt" onChange={(e)=>setUpdatequantity(e.target.value)}/>
                            <button type="submit" className="inptbtn" onClick={()=>updatecart(cartvalue.id)}>Update</button>
                        </div>
                        <div className="containerr25">  
                            <p>RS {calculateSubtotal(cartvalue.proquantity, cartvalue.productprice)}/-</p> 
                        </div>
                    </div>
                ))}
            </div> 
            <div className="header1">
                <div className="details12">
                    <p className="total1">Subtotal: ₹ {calculatetotalprice()}/-</p>
                    <button onClick={handlecheckout}>Proceed to checkout</button>
                </div>
            </div>    
        </div>  
        </>

    )
}

export default Cartpage;
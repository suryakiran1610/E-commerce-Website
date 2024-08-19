import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import './adminpage.css';
import Addproduct from "../components/adminpagecomp/addproduct";
import Listproduct from "../components/adminpagecomp/listproduct";
import Userprofile from "../components/userprofile/userprofile";
import Listusers from "../components/adminpagecomp/listusers";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';



function Adminpage(){

    const[addtoggle,setAddtoggle]=useState(false)
    const[listtoggle,setListtoggle]=useState(false)
    const[backlogo,setBacklogo]=useState(true)
    const[profile1,setProfile1]=useState(false)
    const[users,setUsers]=useState(false)
    const[allorders,setAllorders]=useState([])

    const navigatee=useNavigate()
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/getallorders/')
        .then(response=>{
            setAllorders(response.data)
            console.log(response.data)
        })
        .catch(error=>{
            console.log("error",error)
        })
    },[])

    const totalproduct=()=>{
        let total=0;
        allorders.forEach(allorder=>{
            total+=allorder.product_quantity;
        });
        return total;
    }

    const totalsum=()=>{
        let sum=0;
        allorders.forEach(allorder=>{
            sum+=allorder.product_total;
        });
        return sum;
    }


    const add=()=>{
        setListtoggle(false)
        setAddtoggle(true)
        setBacklogo(false)
        setProfile1(false)
        setUsers(false)        
    }
    const list=()=>{
        setAddtoggle(false)
        setListtoggle(true)
        setBacklogo(false)
        setProfile1(false)
        setUsers(false)        
    }
    const handlelogout=()=>{
        Cookies.remove('token')
        navigatee('/login')
    }
    const profile=()=>{
        setAddtoggle(false)
        setListtoggle(false)
        setBacklogo(false)
        setProfile1(true)
        setUsers(false)        
    }
    const handlehome=()=>{
        setBacklogo(true)
        setAddtoggle(false)
        setListtoggle(false)
        setProfile1(false)
        setUsers(false)        
    }
    const handleusers=()=>{
        setBacklogo(false)
        setAddtoggle(false)
        setListtoggle(false)
        setProfile1(false)
        setUsers(true)
    }


    return(
        <>
            <Navbar/>
            <div className="container">
                <nav className="side-nav">
                    <ul className="nav-menu">
                        <li className="nav-item" onClick={add}>Add Product</li>
                        <li className="nav-item" onClick={list}>View Product</li>
                        <li className="nav-item" onClick={profile}>View Profile</li>
                        <li className="nav-item" onClick={handleusers}>Users</li>
                        <li className="nav-item" onClick={handlehome}>Home</li>
                        <li className="nav-item1" onClick={handlelogout}>Logout</li>
                    </ul>
                </nav>
                {backlogo &&
                    <div className="logomainbox">
                        <div className="logomainbox1">

                        </div>
                        <div className="logomainbox2">
                            <div className="logomainbox3">
                                <div className="wrapper">
                                    <label className="wrapperlabel">Product Sold</label>
                                    <div className="outer-cercle">
                                    <div className="inner-cercle">
                                        <h6>{totalproduct()}</h6>
                                        <span id="number">80%</span>
                                    </div>
                                    </div>
                                    <svg className="svg" width="200" height="200" xmlns="htmp://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="svgColor">
                                        <stop offset="0%" stopColor="#ff5f6d"></stop>
                                        <stop offset="100%" stopColor="#ffc371"></stop>
                                        </linearGradient>
                                    </defs>
                                    <circle className="svg-circle" cx="100" cy="100" r="85"></circle>
                                    </svg>
                                </div>
                                <div className="wrapper">
                                    <label className="wrapperlabel" >Total Profit</label>
                                    <div className="outer-cercle">
                                    <div className="inner-cercle">
                                        <h6>₹ {totalsum()}</h6>
                                        <span id="number">80%</span>
                                    </div>
                                    </div>
                                    <svg className="svg" width="200" height="200" xmlns="htmp://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="svgColor">
                                        <stop offset="0%" stopColor="#ff5f6d"></stop>
                                        <stop offset="100%" stopColor="#ffc371"></stop>
                                        </linearGradient>
                                    </defs>
                                    <circle className="svg-circle" cx="100" cy="100" r="85"></circle>
                                    </svg>
                                </div>
                            </div>
                            
                        </div>
                    </div>   
                }

                { addtoggle &&
                    <Addproduct/>
                }
                { listtoggle &&
                    <Listproduct/>
                }   
                {profile1 &&
                    <Userprofile/>
                } 
                {users &&
                    <Listusers/>
                }
            </div>
        </>

    )
}
export default Adminpage

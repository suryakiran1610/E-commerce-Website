import React, { useEffect, useState } from "react";
import './loginuserpage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";
import Footer from "../components/navbar/footer";

function Userprofilepage(){

    const[userprofile,setUserprofile]=useState([])
    const[edittoggle,setEditoggle]=useState(false)
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[image,setImage]=useState(null)


    useEffect(() => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        axios.get('http://127.0.0.1:8000/myapp/profileupdate/'+decoded.user_id)
        .then(response => {
            setUserprofile(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);


        const editprofile=()=>{
            setEditoggle(true)
        }
        const cancel=()=>{
            setEditoggle(false)
        }

        const handleprofileupdate=(e)=>{
            e.preventDefault();

            const token=Cookies.get('token')
            const decoded=jwtDecode(token)

            const formData=new FormData();
            if (username !== "") formData.append('username',username);
            if (email !== "") formData.append('email',email);
            if (phone !== "") formData.append('phone',phone);
            if (password !== "") formData.append('password',password);
            if (image !== "") formData.append('user_image',image)

            if (formData.has('username') || formData.has('email') || formData.has('phone') || formData.has('password') || formData.has('user_image')) {
            axios.patch('http://127.0.0.1:8000/myapp/profileupdate/'+decoded.user_id,formData)
            .then(response => {
            console.log(response.data)
            setUserprofile(response.data)
            toast.success('Profile Updated Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setEditoggle(false)
            })
            .catch(error => {
                console.log("error", error);
                toast.error('Error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
        }
        }

    return(
        <>
            <Navbar/>
            <Navbar2/>
                <div className="center-content">
                    <div className="container2">
                        <div className="card">
                            <div className="card-header">
                                <div className="profile-image">
                                    <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile" />
                                </div>
                                <div className="inner1">
                                    <div className="color__gray1">{userprofile.username}</div>
                                </div>
                            </div>
                            { edittoggle &&
                                <div className="card-body">
                                    <form onSubmit={handleprofileupdate} encType="multipart/form-data" className="usrform1">
                                        <div className="usrdivs">
                                            <label>username:</label>
                                            <input type="text" className="usrinpt" defaultValue={userprofile.username} onChange={(e)=>setUsername(e.target.value)}></input>
                                        </div>
                                        <div className="usrdivs">
                                            <label>Email: </label>
                                            <input type="text" className="usrinpt" defaultValue={userprofile.email} onChange={(e)=>setEmail(e.target.value)}></input>
                                        </div>
                                        <div className="usrdivs">
                                            <label>Phone:</label>
                                            <input type="text" className="usrinpt" defaultValue={userprofile.phone} onChange={(e)=>setPhone(e.target.value)}></input>
                                        </div>
                                        <div className="usrdivs">
                                            <label>Password</label>
                                            <input type="password" className="usrinpt" onChange={(e)=>setPassword(e.target.value)}></input>
                                        </div>
                                        <div className="usrdivs">
                                            <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                                        </div>
                                        <div className="usrdivs">
                                            <button type="submit" className="usrdivbtn">Save</button>
                                        </div>
                                    </form>
                                    
                                </div>
                            }
                            <div className="card-footer">
                                <div className="inner">
                                    <div>Email</div>
                                    <div className="color__gray12">{userprofile.email}</div>
                                </div>
                                <div className="inner">
                                    <div>Phone</div>
                                    <div className="color__gray12">{userprofile.phone}</div>
                                </div>
                            </div>
                            <div>
                                <button onClick={editprofile} className="usrbtn">Edit</button>
                                <button onClick={cancel} className="usrbtn">Cancel</button>
                            </div>

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
            <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
            </div>  
        
        </>
    )
}
export default Userprofilepage;
import React, { useState } from "react";
import './login.css'
import { Link } from "react-router-dom";
import Loginheader from "../components/login_register/header";
import Loginfooter from "../components/login_register/footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(){
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")

    const navigate=useNavigate()

    const data={
        "username":username,
        "password":password
    }

    const handlesubmit=((e)=>{
        e.preventDefault()
        if(!username || !password){
            toast.warn('Username and Password Required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else{
            axios.post('http://127.0.0.1:8000/myapp/login/',data)
            .then((response)=>{
                if(response.data.error){
                    console.log(response.data.error)
                    toast.error(response.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
                else{
                    const token = response.data.token;
                    const decoded = jwtDecode(token);
                    if(decoded.superuser){
                        console.log("Admin login Successful")
                        Cookies.set("token",response.data.token)
                        navigate('/adminpage')
                    }
                    else{
                        console.log("User login Successful")
                        Cookies.set("token",response.data.token)
                        navigate('/userpage')
                    }    
                }
            })
            .catch((error)=>{
                console.log("error")
            })
        }    
    })

    return(

        <>  
            <Loginheader/>
            <div className="login-wrap">
                <h2>Login</h2>
                <form className="form" onSubmit={handlesubmit}>
                    <input type="text" value={username} placeholder="Username" name="un" onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="password" value={password} placeholder="Password" name="pw" onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit"> Sign in </button>
                    <Link to="/register"><p> Don't have an account? Register </p></Link>
                </form>
            </div>
            <Loginfooter/>
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

export default Login;
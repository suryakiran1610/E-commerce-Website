import React, { useState } from "react";
import './register.css'
import Loginheader from "../components/login_register/header";
import Loginfooter from "../components/login_register/footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Register(){

    const[generate,setGenerate]=useState(true)
    const[verify,setVerify]=useState(false)
    const[success,setSuccess]=useState(false)
    const[imageip,setImageip]=useState(true)

    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[otp,setOtp]=useState("")
    const[password1,setPassword1]=useState("")
    const[password2,setPassword2]=useState("")
    const[image,setImage]=useState(null)
    const[userid,setUserid]=useState("")

    const navigate=useNavigate()

    

    const handlegenerate = (e) => {
        e.preventDefault()
        if(username && email && phone){
            setGenerate(false)
            setVerify(true)
            setImageip(false)

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', 'temp');
            formData.append('userimage', image);

        axios.post('http://127.0.0.1:8000/myapp/register/',formData)
        .then(response=>{
            setUserid(response.data);
            console.log(response.data);
            toast.success('OTP Send Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
           
        })
        .catch(error=>{
            setGenerate(true)
            setVerify(false)
            console.log(error)
        })
    }
    else{
        toast.warn('Provide Details', {
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

    };


    const handleverify=()=>{
        const data={
            "otp":otp,
            "userid":userid.id
        };

        axios.post('http://127.0.0.1:8000/myapp/otpverify/',data)
        .then(response=>{
            toast.success('OTP Verified Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                
            console.log(response.data);
            setGenerate(false)
            setVerify(false)
            setSuccess(true)
        })
        .catch(error=>{
            toast.error('Wrong OTP' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            console.log(error)

        })


        
    }


    const handlepassword=()=>{
        if(password1 && password2){
            if(password1 !== password2){
                toast.error('password does not match' , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                console.error("password does not match")
                return;
            }

            const data={
                "password1":password1,
                "password2":password2
            };

            axios.patch('http://127.0.0.1:8000/myapp/updatepassword/'+userid.id,data)
            .then(response=>{
                console.log(response.data)
                setGenerate(false)
                navigate('/login')
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else{
            toast.error('Enter password' , {
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

        
    }


    return(

        <>
            <Loginheader/>
            <div className="login-wrap">
                <h2>Register</h2>
                <form className="form">
                    <input type="text" value={username} placeholder="Username" name="un" onChange={(e)=>setUsername(e.target.value)} />
                    <input type="text" value={email} placeholder="Email" name="pw" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" value={phone} placeholder="PhoneNumber" name="pw" onChange={(e)=>setPhone(e.target.value)} />
                </form>
                {imageip &&
                    <div className="form1">
                        <input className="imgform" type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                }
                {generate &&
                    <div  className="form">
                        <button type="submit" onClick={handlegenerate}>Generate OTP</button>
                        <Link to="/login"><p> Already have an account? Login </p></Link>
                    </div> 
                }
                {success &&
                    <div  className="form">
                        <input type="password" value={password1} placeholder="Password" name="pw"  onChange={(e)=>setPassword1(e.target.value)}/>
                        <input type="password" value={password2} placeholder="Confirm Password" name="pw"  onChange={(e)=>setPassword2(e.target.value)}/>
                        <button type="submit" onClick={handlepassword}>Register</button>
                        <Link to="/login"><p> Already have an account? Login </p></Link>
                    </div> 
                }        
                {verify &&
                    <div className="form">
                        <input type="text" value={otp} placeholder="OTP" name="pw"  onChange={(e)=>setOtp(e.target.value)}/>
                        <button type="submit" onClick={handleverify}>Verify OTP</button>
                    </div>   
                }     
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

export default Register;
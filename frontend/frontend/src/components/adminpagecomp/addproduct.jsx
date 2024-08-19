import React, { useState } from "react";
import './addproduct.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function Addproduct(){
    
    const[name,setName]=useState("")
    const[category,setCategory]=useState("")
    const[subcategory,setSubcategory]=useState("")
    const[descrip,setDescrip]=useState("")
    const[proimage,setProimage]=useState([]);
    const[price,setPrice]=useState("")


    const handlesubmit=(e)=>{

            e.preventDefault();

            const formData=new FormData();
            formData.append('name',name)
            formData.append('category',category)
            formData.append('subcategory',subcategory)
            formData.append('description',descrip)
            formData.append('price',price)
            proimage.forEach(file => {
                formData.append('image', file);
            });

            axios.post('http://127.0.0.1:8000/myapp/addproduct/',formData)
            .then(Response=>{
                toast.success('Product Added Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(Response.data)
            })
            .catch(error=>{
                console.log("error",error)
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
            })
            setName("");
            setCategory("");
            setDescrip("");
            setSubcategory("");
            setPrice("");
            setProimage([]);
    } 



    return(
        <>  
            <div className="center-content99">
                        <div className="containerform99">
                            <form className="mt-5" onSubmit={handlesubmit} encType="multipart/form-data">
                                
                                <div className="mb-3">
                                    <label className="form-label">Product Name:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Product Category:</label>
                                    <input type="text" className="form-control" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" >Product SubCategory:</label>
                                    <input type="text" className="form-control" value={subcategory} onChange={(e)=>setSubcategory(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" >Product Description:</label>
                                    <input type="text" className="form-control" value={descrip} onChange={(e)=>setDescrip(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label1">Product price:</label>
                                    <input type="text" className="form-control1" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label1">Product Image:</label>
                                    <input type="file" className="form-control1"  multiple required accept="image/*" onChange={(e)=>setProimage(Array.from(e.target.files))}/>
                                </div>
                                
                                <div className="mb-4btn">
                                    <button type="submit" className="btn-success">Add Product</button>
                                </div>
                            </form>
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

export default Addproduct;
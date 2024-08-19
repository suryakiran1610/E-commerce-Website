import React, {useEffect , useState } from "react";
import './productdetails.css';
import Navbar from "../components/navbar/navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Listproduct from "../components/adminpagecomp/listproduct";
import Addproduct from "../components/adminpagecomp/addproduct";
import Userprofile from "../components/userprofile/userprofile";
import Listusers from "../components/adminpagecomp/listusers";
import { Rating } from 'react-simple-star-rating'
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';





function Productdetails(match){
    const navigate=useNavigate()
    const navigatee=useNavigate()
    const navigate1=useNavigate()

    const{productId}=useParams();
    const[productdetails,setProductdetails]=useState([])
    const[productimgdetails,setProductimgdetails]=useState([])
    const[productreview,setProductreview]=useState([])
    const[users,setUsers]=useState([])
    const[detailtoggle,setDetailtoggle]=useState(true)
    const[edittoggle,setEdittoggle]=useState(false)
    const[viewtoggle,setViewtoggle]=useState(false)
    const[addtoggle,setAddtoggle]=useState(false)
    const[profile1,setProfile1]=useState(false)
    const[users1,setUsers1]=useState(false)



    const[name,setName]=useState("")
    const[category,setCategory]=useState("")
    const[subcategory,setSubcategory]=useState("")
    const[descrip,setDescrip]=useState("")
    const[proimage,setProimage]=useState([]);
    const[price,setPrice]=useState("")

    const handleedit=()=>{
        setDetailtoggle(false)
        setEdittoggle(true)
        setViewtoggle(false)
        setAddtoggle(false)
        setProfile1(false)
        setUsers(false)

    }
    const handleview=()=>{
        setDetailtoggle(false)
        setEdittoggle(false)
        setViewtoggle(true)
        setAddtoggle(false)
        setProfile1(false)
        setUsers(false)

    }
    const handleadd=()=>{
        setDetailtoggle(false)
        setEdittoggle(false)
        setViewtoggle(false)
        setAddtoggle(true)
        setProfile1(false)
        setUsers(false)

    }
    const handlehome=()=>{
        navigate('/adminpage')
    }
    const handlelogout=()=>{
        Cookies.remove('token')
        navigatee('/login')
    }
    const profile=()=>{
        setProfile1(true)
        setDetailtoggle(false)
        setEdittoggle(false)
        setViewtoggle(false)
        setAddtoggle(false)
        setUsers(false)
    }
    const handleusers=()=>{
        setProfile1(true)
        setDetailtoggle(false)
        setEdittoggle(false)
        setViewtoggle(false)
        setAddtoggle(false)
        setUsers(true)
    }


    

    const handlesubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (name !== "") formData.append('name', name);
    if (category !== "") formData.append('category', category);
    if (subcategory !== "") formData.append('subcategory', subcategory);
    if (descrip !== "") formData.append('description', descrip);
    if (price !== "") formData.append('price', price);

    const Formdata=new FormData();
        proimage.forEach(file => {
            Formdata.append('image', file);
        });

    if (formData.has('name') || formData.has('category') || formData.has('subcategory') || formData.has('description') || formData.has('price')) {
        axios.patch(`http://127.0.0.1:8000/myapp/productdetails/${productId}`, formData)
            .then(response => {
                console.log(response.data);
                toast.success('Product Updated Successfully', {
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
            .catch(error => {
                console.log("error", error);
                toast.error('Product not Updated', {
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

    } else {
        console.log("No changes detected.");
    }
    axios.patch(`http://127.0.0.1:8000/myapp/productimagedetails/${productId}`, Formdata)
    .then(response=>{
            console.log(response.data);
            toast.success('Image Updated Successfully', {
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
            console.log("error",error);
            toast.error('Image not Updated', {
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


    const reviewdelete=(reviewId)=>{

            axios.delete('http://127.0.0.1:8000/myapp/reviewdelete/'+reviewId)
            .then(response=>{
                console.log(response.data);
                toast.success('Review Deleted Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setProductreview(prevReviews => prevReviews.filter(review => review.id !== reviewId));
            })
            .catch(error=>{
                console.log("error",error);
            })
    
    }
    const productdelete=(productdetailsId)=>{

        axios.delete('http://127.0.0.1:8000/myapp/productdetails/'+productId)
        .then(response=>{
            navigate1('/adminpage')
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })

    }


    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/productdetails/'+productId)
        .then(response=>{
            setProductdetails(response.data);
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })
    },[productId]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/productimagedetails/'+productId)
        .then(response=>{
            setProductimgdetails(response.data);
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })
    },[productId]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/review/'+productId)
        .then(response=>{
            setProductreview(response.data);
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })
    },[productId]);



    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/users/')
        .then(response=>{
            setUsers(response.data);
            console.log(response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })
    },[]);




    return(
        <>
            <Navbar/>
            <div className="container">
                <nav className="side-nav">
                    <ul className="nav-menu">
                        <li className="nav-item" onClick={handleadd}>Add Product</li>
                        <li className="nav-item" onClick={handleedit} >Edit Product</li>
                        <li className="nav-item" onClick={handleview}>View Product</li>
                        <li className="nav-item" onClick={handlehome}>Home</li>
                        <li className="nav-item" onClick={profile}>View Profile</li>
                        <li className="nav-item1"onClick={handlelogout}>Logout</li>
                    </ul>
                </nav>

                { detailtoggle &&
                    <div className="proboxfulll">
                        <div className="probox">
                            <div className="procolumn12">
                                {productimgdetails.map(imgdetails=>(
                                    <div key={imgdetails.id} className="procolumn22">
                                        <img src={`http://127.0.0.1:8000${imgdetails.image}`} alt="Product Image" />
                                    </div>
                                ))}
                            </div>
                            <div className="procolumn3">
                                <div className="procontainer">
                                    <label>Product Name:</label>
                                    <h2>{productdetails.name}</h2>
                                </div>
                                <div className="procontainer">
                                    <label>Product Category:</label>
                                    <p>{productdetails.category}</p>
                                </div>
                                <div className="procontainer">
                                    <label>Product Price RS:</label>
                                    <p>{productdetails.price} /-</p>
                                </div>
                                <div className="procontainer">
                                    <p>{productdetails.description}</p>
                                </div>
                            </div> 
                            <div className="prodetadeldiv">
                                <button onClick={()=>productdelete(productdetails.id)} >Delete</button>
                            </div>
                        </div>
                        <div className="reviewbox1">
                            <div className="reviewbox2">
                               {productreview.map(review => {
                                    const user = users.find(user => user.id === review.userid);
                                    if (user) {
                                        return (
                                            <div key={review.id} className="reviewbox3">
                                                <div className="reviewbox4">
                                                    <img src={`http://127.0.0.1:8000${user.user_image}`} alt="Product Image" />
                                                </div>
                                                <div className="reviewbox7">
                                                    <div className="reviewbox5">
                                                        <label>By:</label>
                                                        <h4>{user.username}</h4>
                                                    </div>
                                                    <div className="reviewbox7">
                                                        <p>{review.created_at}</p>
                                                    </div>
                                                </div>    
                                                <div className="reviewbox6">
                                                    <label>Review: </label>
                                                    <p>{review.review}</p>
                                                </div>
                                                <div className="reviewbox8">
                                                    <div className="reviewbox9">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <span
                                                                key={index}
                                                                className={index < review.rating ? 'star-filled' : 'star-empty'}
                                                            >
                                                                &#9733;
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="reviewbox10">
                                                    <p onClick={()=> reviewdelete(review.id)}>Delete</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>    
                } 
                {edittoggle &&
                        <div className="center-content99">
                            <div className="containerform99">
                                <form className="mt-5" onSubmit={handlesubmit} encType="multipart/form-data">
                                    
                                    <div className="mb-3">
                                        <label  className="form-label">Product Name:</label>
                                        <input type="text" className="form-control" defaultValue={productdetails.name} onChange={(e)=>setName(e.target.value)}/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Product Category:</label>
                                        <input type="text" className="form-control" defaultValue={productdetails.category} onChange={(e)=>setCategory(e.target.value)}/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Product SubCategory:</label>
                                        <input type="text" className="form-control" defaultValue={productdetails.subcategory} onChange={(e)=>setSubcategory(e.target.value)}/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Product Description:</label>
                                        <input type="text" className="form-control" defaultValue={productdetails.description} onChange={(e)=>setDescrip(e.target.value)}/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label1">Product price:</label>
                                        <input type="text" className="form-control1" defaultValue={productdetails.price} onChange={(e)=>setPrice(e.target.value)}/>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label1">Product Image:</label>
                                        <input type="file" className="form-control1"  multiple required accept="image/*" onChange={(e)=>setProimage(Array.from(e.target.files))}/>
                                    </div>
                                    
                                    <div className="mb-4btn">
                                        <button type="submit" className="btn-success">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                }   
                {viewtoggle &&
                        <Listproduct/>
                } 
                {addtoggle &&
                        <Addproduct/>
                }
                {profile1 &&
                    <Userprofile/>
                } 
                {users1 &&
                    <Listusers/>
                }
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
export default Productdetails
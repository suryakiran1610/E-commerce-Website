import React, {useEffect , useState } from "react";
import axios from 'axios';
import './userproductdetails.css';
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Navbar2 from "../components/navbar/navbar2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import Footer from "../components/navbar/footer";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { MdOutlineMessage } from "react-icons/md";
import { Rating } from 'react-simple-star-rating'
import { ToastContainer, toast } from 'react-toastify';






function Userproductdetails(match){
    const{productId}=useParams();
    const[productdetails,setProductdetails]=useState([])
    const[productimgdetails,setProductimgdetails]=useState([])
    const[productreview,setProductreview]=useState([])
    const[users,setUsers]=useState([])
    const[toggle,setToggle]=useState(false)
    const[reviewadd,setReviewadd]=useState('')
    const[reviewrating,setReviewrating]=useState(0)
    const[cartvalues,setCartvalues]=useState([])


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

    const addreview=()=>{
        setToggle(true)
    }
    const handlereviewsubmit=(e)=>{
        e.preventDefault();

        const formData=new FormData()
        formData.append('review',reviewadd)
        formData.append('rating',reviewrating)
        formData.append('userid',decoded.user_id)
        formData.append('productid',productId)

        axios.post('http://127.0.0.1:8000/myapp/reviewadd/',formData)
        .then(response=>{
            console.log(response.data)
            setProductreview([...productreview, response.data]);
            setReviewadd('');
            setReviewrating(0);
            setToggle(false);
        })
        .catch(error=>{
            console.log("error",error)
        })
    }

    const isProductInCart = cartvalues.some(item => item.product == productId);

    const handleaddtocart=()=>{
       const formData=new FormData()
       formData.append('product',productId)
       formData.append('list_user',decoded.user_id)
       formData.append('productname',productdetails.name)
       formData.append('productprice',productdetails.price)

       axios.post('http://127.0.0.1:8000/myapp/cart/',formData)
       .then(response=>{
        console.log(response.data)
        toast.success(`${productdetails.name} Added to Cart`, {
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
        console.log("error",error)
       })

    }




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
    };

    const totalRatings = productreview.length;
    const totalRatingValue = productreview.reduce((total, review) => total + review.rating, 0);
    const avgRating = totalRatingValue / totalRatings;


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



    return (
        <>
            <Navbar />
            <Navbar2 />
            <div className="usrprddiscon">
                <div className="usrprddiscon1">
                    <div className="carousel-container">
                        <Slider {...settings}>
                            {productimgdetails.map(imgdetails => (
                                <div key={imgdetails.id} className="procolumn2">
                                    <img src={`http://127.0.0.1:8000${imgdetails.image}`} alt="Product Image" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="prodetails-container">
                        <div className="prodetails-container1">
                            <h1>{productdetails.name}</h1>
                            <p>{productdetails.description}</p>
                        </div>
                        <div className="prodetails-container2">
                                <p>{avgRating.toFixed(2)}</p>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                        key={index}
                                        className={index < avgRating ? 'star-filled' : 'star-empty'}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                                <p>{productreview.length}Ratings</p>
                        </div>
                        <div className="prodetails-container3">
                            <p>100+ bought in past month</p>
                        </div>
                        <hr></hr>
                        <div className="prodetails-container4">
                            <h3>RS: {productdetails.price}</h3>
                            <p>Inclusive of all taxes</p>
                            <p><span>EMI</span>Starts at RS 512.No cost EMI available</p>
                        </div>
                        <hr></hr>
                        <div className="prodetails-container5">
                            <BiSolidOffer  className="BiSolidOffer"/>
                            <p>Offers</p>
                        </div>
                        <div className="prodetails-container6">
                            <div className="prodetails-container7">
                                <h4>No Cost EMI</h4>
                                <p>up to Rs 197.63 EMI<br></br>interest savings on...</p>
                                <div className="prodetails-container8">
                                    <p>1 Offer</p>
                                </div>
                            </div>
                            <div className="prodetails-container9">
                                <h4>Partner Offers</h4>
                                <p>Get GST invoice and<br></br>saves upto 28% on...</p>
                                <div className="prodetails-container10">
                                    <p>1 Offer</p>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>    
                    <div className="otherdetails-container">
                                <div className="otherdetails-container1">
                                    <h2>RS:{productdetails.price}</h2>
                                </div>
                                <div className="otherdetails-container2">
                                    <p>FREE delivery 9-11 May.Order within <span>15hrs 51mins</span></p>
                                </div>
                                <div className="otherdetails-container3">
                                    <FaLocationDot />
                                    Delivering to Thiruvananthapuram 695003-Update Location
                                </div>
                                <div className="otherdetails-container4">
                                    <h4>In Stock</h4>
                                </div>
                                <div className="otherdetails-container5">
                                    <h4>Add a Protection Plan:</h4>
                                    <div className="otherdetails-container6">
                                        <input type="checkbox"></input>
                                        <p>3 Year Maintenance Plan</p>
                                    </div>
                                </div>
                                <div className="otherdetails-container7">
                                    <button className="otherdetails-containerbtn1" onClick={handleaddtocart} disabled={isProductInCart}>
                                        {isProductInCart ? 'Already in Cart' : 'Add to Cart'}
                                    </button>
                                    <button className="otherdetails-containerbtn2">Buy Now</button>
                                </div>                    
                    </div>
                </div>       
            </div>
            <div className="reviewwrite1">
                <div className="reviewwrite2">
                    <MdOutlineMessage />
                    <p onClick={addreview}>Write a review.......</p>
                </div>
                <div className="reviewwrite3">    
                    <hr></hr>
                </div>
            </div>
            {toggle &&
                <div className="modal-container">
                    <div className="modal">
                        <form onSubmit={handlereviewsubmit}>
                            <div className="modal11">
                                <input type="text" placeholder="write review here"  onChange={(e)=>setReviewadd(e.target.value)}></input>
                                <Rating
                                    className="modal11rating"
                                    onClick={(value) => setReviewrating(value)}
                                    ratingValue={reviewrating} 
                                />                                
                                <div className="modal22">
                                    <button type='submit' className="modal22btn12">Submit</button>
                                    <button className="modal22btn13" onClick={()=>setToggle(false)}>cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            }
            <div className="reviewbox100">
                            <div className="reviewbox200">
                               {productreview.map(review => {
                                    const user = users.find(user => user.id === review.userid);
                                    if (user) {
                                        return (
                                            <div key={review.id} className="reviewbox300">
                                                <div className="reviewbox400">
                                                    <img src={`http://127.0.0.1:8000${user.user_image}`} alt="Product Image" />
                                                </div>
                                                <div className="reviewbox700">
                                                    <div className="reviewbox500">
                                                        <label>By:</label>
                                                        <h4>{user.username}</h4>
                                                    </div>
                                                    <div className="reviewbox700">
                                                        <p>{review.created_at}</p>
                                                    </div>
                                                </div>    
                                                <div className="reviewbox600">
                                                    <label>Review: </label>
                                                    <p>{review.review}</p>
                                                </div>
                                                <div className="reviewbox800">
                                                    <div className="reviewbox900">
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
                                                {decoded.user_id === review.userid && (
                                                    <div className="reviewbox10">
                                                        <p onClick={() => reviewdelete(review.id)}>Delete</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
            </div>
            <Footer/>
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
    );
    
}
export default Userproductdetails;
import './userpage.css';
import React, { useEffect, useState } from "react";
import Navbar2 from "../components/navbar/navbar2";
import Navbar3 from '../components/navbar/navbar3';
import Footer from '../components/navbar/footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import amazonlogo from "./amazonlogo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";





function Userpage(){
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [searchdata,setSearchdata]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const[mainimage,setMainimage]=useState(true)
    const navigate=useNavigate()

    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    const navigatee=useNavigate()
    const navigateee=useNavigate()
    const navigateeee=useNavigate()


    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleProfile = () => {
        navigate('/userprofilepage');
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    const handleuserdetailpage=(productId)=>{
        navigate(`/userproductdetails/${productId}`);
    }

    useEffect(() => {
        if(!searchdata){
            axios.get(`http://127.0.0.1:8000/myapp/productlist/?searchdata=${searchdata}`)
            .then(response => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log("error", error);
            });
        }
    }, [searchdata]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/productimage/')
        .then(response => {
            setImages(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);

    const getProductImage = (productId) => {
        const productImage = images.find(image => image.productid === productId);
        return productImage ? productImage.image : null;
    };

    const handleSearch = (e) => {
        e.preventDefault()
        setMainimage(false)
        axios.get(`http://127.0.0.1:8000/myapp/productlist/?searchdata=${searchdata}`)
            .then(response => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }



    return(
        <div className='usepgmaindivcontainer'>
            <div className="nav">
                <div className="nav-logo border">
                    <div className="navlogo" onClick={()=>navigatee('/userpage')}>
                        <img src={amazonlogo}/>
                    </div>
                </div>
                <div className="nav-address border">
                    <p className="add-1">Deliver to</p>
                    <div className="add-icon">
                        <FaLocationDot />
                        <p className="add-2">India</p>
                    </div>
                </div>
                <div className="nav-search">
                    <select className="search-select">
                        <option>All</option>
                    </select>
                    <input  type='text' placeholder="Search Amazon" onChange={(e)=>setSearchdata(e.target.value)} className="search-input"/>
                    <button className="search-icon" type='submit'onClick={handleSearch} >
                        <FaSearch />
                    </button>
                </div>
                <div className="flag border">
                    <div className="amflag">
                    </div>
                    <p className="lang">EN</p>
                </div>
                <div className="account border" onClick={handleDropdown}>
                    <p>Hello,<span>{decoded.username}</span></p>
                    <p className="account-two">Account & Lists</p>
                    {showDropdown && (
                        <div className="flex flex-col dropdownprofile">
                            <ul className="flex flex-col gap-4">
                                <li onClick={handleProfile}>Profile</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="return border">
                    <p><span>Return</span></p>
                    <p className="account-two" onClick={()=>navigateeee('/listorder')}>& Orders</p>
                </div>
                <div className="cart border">
                    <FaShoppingCart  className="FaShoppingCarticon" onClick={()=>navigateee('/cartpage')}/>
                    Cart
                </div>
            </div>  
            <Navbar2/>
            {mainimage &&
            <Navbar3/>
            }
                <div className="shop-section">
                    {products.map(product => (
                        <div className="box1 box" key={product.id}>
                            <div className="box-content">
                                <h2>{product.name}</h2>
                                <div className="boximage">
                                    <img src={`http://127.0.0.1:8000${getProductImage(product.id)}`} alt="Product Image"/>
                                </div>
                                <a onClick={()=>handleuserdetailpage(product.id)}>Shop now</a>
                            </div>
                        </div>
                    ))}    
                </div>  
        </div>

    )
}
export default Userpage
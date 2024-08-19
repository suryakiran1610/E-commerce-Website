import React, { useState } from "react";
import './navbar.css';
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import amazonlogo from "./amazonlogo.jpg";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate=useNavigate()
    const navigatee=useNavigate()
    const navigateee=useNavigate()

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

    return(
        <>
            <div className="nav">
                <div className="nav-logo border">
                    <div className="navlogo" onClick={()=>navigate('/userpage')}>
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
                    <input placeholder="Search Amazon" className="search-input"/>
                    <button className="search-icon">
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
                    <p className="account-two" onClick={()=>navigateee('/listorder')}>& Orders</p>
                </div>
                <div className="cart border">
                    <FaShoppingCart  className="FaShoppingCarticon" onClick={()=>navigatee('/cartpage')}/>
                    Cart
                </div>
            </div>  

        </>

    )
}

export default Navbar;
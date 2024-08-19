import React, { useEffect, useState } from "react";
import './listproduct.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Listproduct(){

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    const navigate=useNavigate()

    const handledetailpage=(productId)=>{
        navigate(`/productdetails/${productId}`);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/productlist/')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/productimage/')
        .then(response => {
            setImages(response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);

    const getProductImage = (productId) => {
        const productImage = images.find(image => image.productid === productId);
        return productImage ? productImage.image : null;
    };

    return(
        <>
            <div className="center-content">
                <div className="product-container">
                    {products.map(product => (
                        <div className="product-card0" key={product.id}>
                            <div className="product-card">
                                <img src={`http://127.0.0.1:8000${getProductImage(product.id)}`} alt="Product Image" className="product-image "/>
                                <div className="product-name" onClick={()=>handledetailpage(product.id)}>{product.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </>
    );
}

export default Listproduct;

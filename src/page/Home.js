import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import Products from "../components/Products";

const Home = () => {
    //状态
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/products').then(res => {
            console.log(res.data)
            // setProducts(res.data);
            setProducts(res.data.data.products);
        });
    }, [])

    return (
        <div>
            <Products products={products}/>
        </div>
    );
};

export default Home;

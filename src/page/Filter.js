//filter页面
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import Products from "../components/Products";

const Filter = () => {

    const { option, value } = useParams();
    const [products, setProducts] = useState([]);

    const { data, error, loading } = useQuery(`products?price[${option}]=${value}`);

    useEffect(()=>{
        if(data?.products) setProducts(data?.products);
    },[data?.products])

    return (
        <>
            <Products products={products}/>
            { loading && <h2>loading...</h2> }
            { error && <h2>{error}</h2> }
        </>
    );
};

export default Filter;

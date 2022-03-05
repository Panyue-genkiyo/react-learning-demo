import React, {useEffect, useState, useMemo } from 'react';
import Products from "../components/Products";
import useQuery from "../hooks/useQuery";
import Pagination from "../components/Pagination";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";

const Home = () => {
    //状态
    const [ limit, setLimit ] = useState(9);
    const [ products, setProducts ] = useState([]);
    const { page, sort } = useMyContext();

    const { data, loading, error } = useQuery(
        `/products?limit=${limit}&page=${page}&sort=${sort}`
    );

    useEffect(() => {
        if(data?.products) setProducts(data.products);
    }, [data?.products]);

    const totalPages = useMemo(() => {
        if(!data?.count) return 0;
        return Math.ceil(data.count / limit);
    },[data?.count]);

    return (
        <div>
            <Sorting/>
            <Products products={products}/>
            { loading && <h2>loading...</h2> }
            { error && <h2>{error}</h2> }
            <Pagination totalPages={totalPages}/>
        </div>
    );
};

export default Home;

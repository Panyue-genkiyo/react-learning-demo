import React, {useEffect, useState, useMemo} from 'react';
import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import useQuery from "../hooks/useQuery";
import Pagination from "../components/Pagination";
import Sorting from "../components/Sorting";

const Home = () => {
    //状态
    const [ limit, setLimit ] = useState(9);
    const [ products, setProducts ] = useState([]);
    const { search } = useLocation();

    //缓存page数量
    const { page, sort } = useMemo(() => {
        const page =  new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt'; //默认按照创建时间倒序
        return {
            page: +page,
            sort
        }
    }, [search])

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
            <Sorting page={page} sort={sort}/>
            <Products products={products}/>
            { loading && <h2>loading...</h2> }
            { error && <h2>{error}</h2> }
            <Pagination totalPages={totalPages} page={page} sort={sort}/>
        </div>
    );
};

export default Home;

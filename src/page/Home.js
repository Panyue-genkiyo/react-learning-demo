import React, {useEffect, useState, useMemo} from 'react';
import Products from "../components/Products";
import useQuery from "../hooks/useQuery";
import Pagination from "../components/Pagination";

const Home = () => {
    //状态
    const [ limit, setLimit ] = useState(5);
    const [ page, setPage ] = useState(1);
    const [products, setProducts] = useState([]);

    const { data, loading, error } = useQuery(
        `/products?limit=${limit}&page=${page}`
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
            <Products products={products}/>
            { loading && <h2>loading...</h2> }
            { error && <h2>{error}</h2> }
            <Pagination totalPages={totalPages} page={page}/>
        </div>
    );
};

export default Home;

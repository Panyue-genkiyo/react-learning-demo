import React from 'react';
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import useQuery from "../hooks/useQuery";

const ProductDetail = () => {

    const { id } = useParams();

    const { data: product, loading, error } = useQuery(`/products/${id}`);

    return (
        <div>
            {product && <ProductInfo product={product}/>}
            { loading && <h2>loading...</h2> }
            { error && <h2>{error}</h2> }
        </div>
    );
};

export default ProductDetail;

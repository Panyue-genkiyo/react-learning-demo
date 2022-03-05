import React from 'react';
import ProductsCard from "./ProductsCard";

//react memo优化避免过多次数渲染
const Products = ({ products }) => {
    return (
        <div className='products'>
            {products.map(product =>
                <ProductsCard key={product._id} product={product}/>
            )}
        </div>
    );
};

export default React.memo(Products);

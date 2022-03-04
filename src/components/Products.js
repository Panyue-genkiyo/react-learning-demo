import React from 'react';
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
    return (
        <div className='products'>
            {products.map(product =>
                <ProductsCard key={product._id} product={product}/>
            )}
        </div>
    );
};

export default Products;

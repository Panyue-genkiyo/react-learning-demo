import React from 'react';
import { Link } from "react-router-dom";

const ProductsCard = ( { product } ) => {
    return (
        <div className='card'>
            <img src={product.image} alt={product.image} />
            <div className="box">
                <h3>
                    <Link to={`/products/${product._id}`}>
                        <span/>
                        {product.title}
                    </Link>
                </h3>
                <h4>${product.price}</h4>
                <div className='btn_div'>
                    <button className="btn_edit">Edit</button>
                    <button className="btn_delete">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;

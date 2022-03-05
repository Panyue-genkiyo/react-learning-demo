import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Model from "./Model";
import ProductForm from "./ProductForm";
import axios from "axios";

const ProductsCard = ( { product } ) => {
    const [openProduct, setOpenProduct] = useState(false);
    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`/products/${id}`)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    }
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
                    <button className="btn_edit" onClick={() => setOpenProduct(true)}>Edit</button>
                    <button className="btn_delete" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
                {
                    openProduct && (
                        <Model titleTxt={'Update Product'} setOpen={setOpenProduct}>
                            <ProductForm btnTxt={'Update'} setOpen={setOpenProduct} data={product}/>
                        </Model>
                    )
                }
            </div>
        </div>
    );
};

export default ProductsCard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import ProductForm from './ProductForm';
import useLazyLoading from "../hooks/useLazyLoading";
import {useDeleteProduct} from "../hooks/useMutationProduct";


const ProductCard = ({product}) => {

  const [openModal, setOpenModal] = useState(false)
  const { mutate } = useDeleteProduct();
  const { imgRef } = useLazyLoading();

  const handleDeleteProduct = (id) => {
    if(window.confirm('Do you want to delete this?')){
      mutate(id)
    }
  }

  return <div className='card'>
    <Link to={`/products/${product._id}`}>
      <img ref={imgRef} alt={product.image} className='lazy-load'/>
    </Link>

    <div className="box">
      <h3>
        <Link to={`/products/${product._id}`}>
          <span/>
          {product.title}
        </Link>
      </h3>
      <h4>${product.price}</h4>

      <div className='btn_div'>
        <button className="btn_edit"
        onClick={() => setOpenModal(true)}>Edit</button>
        <button className="btn_delete"
        onClick={() => handleDeleteProduct(product._id)}>Delete</button>
      </div>
    </div>

    <div>
      {
        openModal &&
        <Modal
        titleTxt="Update Product"
        setOpen={setOpenModal}>
          <ProductForm
          btnTxt="Update"
          data={product}
          />
        </Modal>
      }
    </div>
  </div>;
};

export default ProductCard;

import React from 'react';
import { useParams } from 'react-router-dom'
import {getData, getOneProduct} from '../api/productAPI';
import ProductInfo from '../components/ProductInfo';
import { useQuery } from "react-query";


const ProductDetail = () => {
  const { id } = useParams()
  const url = getOneProduct(id)
  const { data: productDetail, isLoading, isError, error} = useQuery(url, getData)

  return (
      <main>
        <ProductInfo
            product={productDetail?.data}
            loading={isLoading}
            error={isError ? error.message : null}
        />
      </main>
  )
};

export default ProductDetail;

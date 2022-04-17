import React from 'react';
import { useParams } from 'react-router-dom'
import {getData, getOneProduct} from '../api/productAPI';
import ProductInfo from '../components/ProductInfo';
import { useQuery, useQueryClient } from "react-query";


const ProductDetail = () => {
  const { id } = useParams();
  const url = getOneProduct(id);
  const queryClient = useQueryClient();
  const keys = queryClient.getQueryData('keys');
  // console.log(keys);

  const { data: productDetail, isLoading, isError, error, isPlaceholderData} = useQuery(
      url,
      getData,
      {
          enabled: !!id, //当id不存在是不会触发该useQuery

          //placeholder: 假数据，不在cache里，跳过loading状态 防止第一次的hard loading状态,改善用户体验
          // placeholderData: () => {
          //     if(keys?.k1){
          //         const { data } = queryClient.getQueryData(keys.k1);
          //         return data.products.find(item => item._id === id);
          //     }
          //     if(keys?.k2){
          //         let product;
          //         const  pages  = queryClient.getQueryData(keys.k2).pages;
          //         pages.map(page => {
          //             return page.data.products.forEach(item => {
          //                 if(item._id === id){
          //                     product = item;
          //                 }
          //             })
          //         })
          //         return product;
          //     }
          // },
          initialData: () => {
              if(keys?.k1){
                  const { data } = queryClient.getQueryData(keys.k1);
                  return data.products.find(item => item._id === id);
              }
              if(keys?.k2){
                  let product;
                  const  pages  = queryClient.getQueryData(keys.k2).pages;
                  pages.map(page => {
                      return page.data.products.forEach(item => {
                          if(item._id === id){
                              product = item;
                          }
                      })
                  })
                  return product;
              }
          },
      }
  )

    console.log({ isPlaceholderData });
    console.log(productDetail?.data)

  return (
      <main>
        <ProductInfo
            product={productDetail?.data || productDetail}
            loading={isLoading}
            error={isError ? error.message : null}
        />
      </main>
  )
};

export default ProductDetail;

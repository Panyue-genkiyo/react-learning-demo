import React, { useMemo, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { useMyContext } from '../context/store';
import useCustomRouter from '../hooks/useCustomRouter';
import { useQuery, useQueryClient } from 'react-query';
import { getData } from "../api/productAPI";

const Home = () => {
  const { page, limit, sort } = useMyContext();
  const queryClient = useQueryClient();

  const { pushQuery } = useCustomRouter();

  // const url = getProducts(limit, page, sort);

  const key = useMemo(() => `/products?limit=${limit}&page=${page}&sort=${sort}`,[sort,limit,page]);
  // const key2 = useMemo(() => `/products?limit=${limit}&page=${page + 1}&sort=${sort}`,[sort,limit,page]);

  useEffect(() => {
      queryClient.setQueryData('keys', { k1: key, k2: '' })
  }, [queryClient, key])

    //提前fetch下一页products prefetch
  // useEffect(() => {
  //     const prefetchProducts = async () => {
  //         // The results of this query will be cached like a normal query
  //         await queryClient.prefetchQuery(key2,getData)
  //     }
  //     prefetchProducts();
  // }, [queryClient, key2])

  //isFetching和isLoading是不一样的，默认第一次loading为true，后面都为false，但是isFetching一直为true，更多的指的背后加载
  const { data: productsData, isLoading, error, isError, isFetching, isPreviousData } = useQuery(
      key,
      getData,
      {
          //跳过loading和success,但是不跳过fetching过程
          keepPreviousData: true, //在这一次请求到达之前保留上一页的请求数据 防止不同的queryKey造成loading展示
          //staleTime: 5000, //设置过期时间5s，在过期时间5s，不会再触发background fetching 5s后fresh状态变为stale状态，适合不经常变化的数据
          //cacheTime: 3000, //设置缓存1s，缓存失效后将重新fetch data导致isFetching状态变化(只有第一次isLoading才变化)，切分页状态isPreviousData也会变化
      }
  )
    // console.log({isPreviousData}); //先true后false
    console.log({ isLoading, isFetching, isPreviousData })

  const totalPages = useMemo(() => {
    if(!productsData) return 0;
    return Math.ceil(productsData.data.count/limit)
  }, [productsData, limit]);

  return (
      <main>
          {/*{ isFetching && <h2>fetching...</h2>}*/}
        <Sorting sort={sort}
                 calback={(sort) => pushQuery({page, sort})}
        />
          <div className='products'>
              <Products
                  data={productsData?.data.products}
                  // loading={isFetching}
                  //注意isLoading和isFetching是有区别的！！
                  // loading={isLoading}
                  error={isError ? error.message : null}
              />
          </div>
          {((isFetching && isPreviousData) || isLoading) && <h2>fetching...</h2>}
        <Pagination totalPages={totalPages}/>
      </main>
  )
};

export default Home;

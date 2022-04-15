import React, { useMemo } from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { useMyContext } from '../context/store';
import useCustomRouter from '../hooks/useCustomRouter';
import { useQuery } from 'react-query';
import { getData } from "../api/productAPI";

const Home = () => {
  const { page, limit, sort } = useMyContext()

  const { pushQuery } = useCustomRouter();

  // const url = getProducts(limit, page, sort);

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;

  //isFetching和isLoading是不一样的，默认第一次loading为true，后面都为false，但是isFetching一直为true，更多的指的背后加载
  const { data: productsData, isLoading, error, isError, isFetching, isPreviousData } = useQuery(
      key,
      getData,
      {
          //跳过loading和success,但是不跳过fetching过程
          keepPreviousData: true //在这一次请求到达之前保留上一页的请求数据 防止不同的queryKey造成loading展示
      }
  )
    console.log({isPreviousData}); //先true后false

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
        <Products
            data={productsData?.data.products}
            // loading={isFetching}
            //注意isLoading和isFetching是有区别的！！
            // loading={isLoading}
            loading={isFetching && isPreviousData}
            error={isError ? error.message : null}
        />
        <Pagination totalPages={totalPages}/>
      </main>
  )
};

export default Home;

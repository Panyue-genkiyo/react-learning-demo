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

  const { data: productsData, isLoading, error, isError } = useQuery(key, getData)

  const totalPages = useMemo(() => {
    if(!productsData) return 0;
    return Math.ceil(productsData.data.count/limit)
  }, [productsData, limit]);


  return (
      <main>
        <Sorting sort={sort}
                 calback={(sort) => pushQuery({page, sort})}
        />
        <Products
            data={productsData?.data.products}
            loading={isLoading}
            error={isError ? error.message : null}
        />
        <Pagination totalPages={totalPages}/>
      </main>
  )
};

export default Home;

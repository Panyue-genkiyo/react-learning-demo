import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { filterProducts } from '../api/productAPI';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { useMyContext } from '../context/store';
import useCustomRouter from '../hooks/useCustomRouter';
import useInView from "../hooks/useInView";
import { getInfiniteData } from "../api/productAPI";
import { useInfiniteQuery } from "react-query";


const Filter = () => {
  const [ limit, setLimit] = useState(2);
  const { filter, value } = useParams()
  const { sort } = useMyContext()

  const url = filterProducts(filter, value, sort, limit)
  const { ref, isView } = useInView()

  const { pushQuery } = useCustomRouter();

  const {
    data: searchData,
    hasNextPage,
    error,
    isError,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
      url,
      getInfiniteData,
      {
        getNextPageParam: (lastPage, allPages) => {
          // console.log({lastPage, allPages})
          let { products } = lastPage.data
          if(products.length >= limit) {
            return allPages.length + 1
          }else{
            return undefined; //告诉该useInfiniteQuery没有下一页 注意
          }
        },
      });


  useEffect(() => {
    if(isView && !isFetchingNextPage) fetchNextPage();
  }, [isView, fetchNextPage, isFetchingNextPage])

  return (
      <div>
        <Sorting sort={sort}
                 calback={(sort) => pushQuery({sort})}
        />
        <div className='products'>
          {
            searchData?.pages.map((page, i) => (
                <Products
                    key={i}
                    data={page.data.products}
                    error={isError ? error.message : null}
                />
            ))
          }
        </div>
        { isFetching && '...isFetching' }
        <button onClick={() => fetchNextPage()}
                className="btn-load_more"
                disabled={!hasNextPage || isFetchingNextPage}
                ref={ref}
        >
          Load more
        </button>
      </div>
  )
};

export default Filter;

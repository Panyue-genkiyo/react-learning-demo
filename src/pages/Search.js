import React, {useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom'
import {getInfiniteData, searchProducts} from '../api/productAPI';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { useMyContext } from '../context/store';
import useCustomRouter from '../hooks/useCustomRouter';
// import useInfinityQuery from '../hooks/useInfinityQuery';
import { useInfiniteQuery, useQueryClient } from "react-query";
import useInView from "../hooks/useInView";


const Search = () => {
  const limit = 2;
  const { value } = useParams();
  const { sort } = useMyContext();
  const { ref, isView } = useInView();
  const queryClient = useQueryClient();

  const { pushQuery } = useCustomRouter();

  const url = useMemo(() => searchProducts(value, sort, limit), [value, sort, limit]);


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
      queryClient.setQueryData(['keys'], { k1: '', k2: url })
  }, [queryClient, url])

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

export default Search;

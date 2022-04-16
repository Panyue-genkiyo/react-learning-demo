import React from 'react';
import ProductCard from './ProductCard';

const Products = React.memo(({ data, error }) => {

  if(error) return <h2>{error}</h2>;
  return (
      <>
        {
            data && data.map(product => (
                <ProductCard key={product._id} product={product} />
            ))
        }
      </>
  )
});

export default Products;

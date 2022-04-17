import React, { useState, useEffect } from 'react';
// import useMutation from '../hooks/useMutation';
import {useCreateProduct, useUpdateProduct} from "../hooks/useMutationProduct";

const ProductForm = ({btnTxt, data}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState('')
  const { mutate: createMute, isLoading: createIsLoading } = useCreateProduct();
  const { mutate: updateMute, isLoading: updateIsLoading } = useUpdateProduct();

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = { title, description, image, price, category };
    if(id){
      updateMute({id, newData})
    }else{
      createMute({newData})
    }
  }

  useEffect(() => {
    if(data) {
      setTitle(data.title)
      setDescription(data.description)
      setPrice(data.price)
      setImage(data.image)
      setCategory(data.category)
      setId(data._id)
    }
  },[data])

  return <div className='product_form'>
    <form onSubmit={handleSubmit}>
      <input type="text" value={title}
      placeholder="Product title" required
      onChange={e => setTitle(e.target.value)}
      />
      <input type="text" value={description}
      placeholder="Product description" required
      onChange={e => setDescription(e.target.value)}
      />
      <input type="text" value={price}
      placeholder="Product price" required
      onChange={e => setPrice(e.target.value)}
      />
      <input type="text" value={category}
      placeholder="Product category" required
      onChange={e => setCategory(e.target.value)}
      />
      <input type="text" value={image}
      placeholder="Product image" required
      onChange={e => setImage(e.target.value)}
      />

      <button disabled={(createIsLoading || updateIsLoading)}>
        { (createIsLoading || updateIsLoading) ? 'Loading...' : btnTxt }
      </button>
    </form>
  </div>;
};

export default ProductForm;

import axios from 'axios';
import { toast } from "react-toastify";

export const handleError = (err) => {
  if(err.response.data.msg){
    //自定义的错误
    toast.error(err.response.data.msg);
    throw new Error(err.response.data.msg);
  }else{
    toast.error(err.message);
    throw new Error(err.message);
  }
}

export const getData = async ({ queryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`);
  return data ;
}

//无限加载所需的回调函数
export const getInfiniteData = async ({ queryKey, pageParam = 1 }) => {
    const { data } = await axios.get(`${queryKey[0]}&page=${pageParam}`);
    return data;
}


export const getProducts = (limit, page, sort) => {
  return `/products?limit=${limit}&page=${page}&sort=${sort}`;
};

export const getOneProduct = (id) => {
  return `/products/${id}`;
};

export const searchProducts = (value, sort, limit) => {
  return `/products?search=${value}&sort=${sort}&limit=${limit}`;
};

export const filterProducts = (filter, value, sort, limit) => {
  return `/products?price[${filter}]=${value}&sort=${sort}&limit=${limit}`;
};

export const createProduct = async (nD) => {
  // console.log({data});
  const { data } = await axios.post('/products', nD.newData);
  return data;
};

export const updateProduct = async (updateData) => {
  const { data } = await axios.put(`/products/${updateData.id}`, updateData.newData);
  return data;
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};


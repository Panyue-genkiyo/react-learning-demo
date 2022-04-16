import axios from 'axios';

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

export const filterProducts = (filter, value, sort) => {
  return `/products?price[${filter}]=${value}&sort=${sort}`;
};

export const createProduct = async (data) => {
  return axios.post('/products', data)
};

export const updateProduct = async (data) => {
  return axios.put(`/products/${data.id}`, data)
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};


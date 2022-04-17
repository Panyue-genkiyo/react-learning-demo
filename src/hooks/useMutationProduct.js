import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import {createProduct, updateProduct, deleteProduct, handleError} from "../api/productAPI";
import { toast } from "react-toastify";

//使用react-query useMutation hook/更行商品
export const useCreateProduct = () => {
    //返回的mutate函数所接受到的参数将会被传到处理函数中(如下就是createProduct)
    const queryClient = useQueryClient();
    return useMutation(
        createProduct,
        {
            //console.log(data); //接受响应返回的数据
            onSuccess: _data =>  toast.success('创建商品成功！'),
            //接受error对象
            onError: error => handleError(error),
            //不管成功与否都会运行下面的onSettled函数
            // predicate: query => console.log(query.queryKey)
            onSettled: () => queryClient.invalidateQueries({ predicate: query => query.queryKey.startsWith('/products')})
        }
    );
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const keys = queryClient.getQueryData('keys');
    return useMutation(
        updateProduct,
        {
            onSuccess: _data =>  toast.success('修改商品成功！'),
            onError: error => handleError(error),
            onSettled: () => queryClient.invalidateQueries(keys?.k1 || keys?.k2)
        }
    );
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation(
        deleteProduct,
        {
            onSuccess: _data =>  toast.success('删除成功！'),
            onError: error => handleError(error),
            onSettled: () =>  queryClient.invalidateQueries({ predicate: query => query.queryKey.startsWith('/products')})
        }
    );
};


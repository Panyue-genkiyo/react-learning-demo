import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

//获取数据api
const useQuery = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        let here = true;
        setLoading(true);
        axios.get(url)
            .then(res => {
                if(!here) return; //在加载之前就已退出
                setData(res.data.data);
            })
            .catch(err => {
                if(!here) return; //在加载之前就已退出
                setError(err.response.data.message);
                toast.error(err.response.data.message);
            })
            .finally(() => {
                if(!here) return; //在加载之前就已退出
                setLoading(false); //停止加载
            });

        return () => {
            here = false;
        }
    }, [url])

    return { data, loading, error };
}

export default useQuery;

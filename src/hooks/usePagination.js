//分页hook
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usePagination = (totalPages, page) => {

    const [firstArr, setFirstArr] = useState([]);
    const [lastArr, setLastArr] = useState([]);

    useEffect(() => {
        console.log(totalPages, page);
        const newArr = [...Array(totalPages)].map((_, i) => i + 1);
        // console.log(newArr);
        if(totalPages < 4)
            return setFirstArr(newArr); //当总页数小于4时
        if(totalPages - page >= 4) {
            setFirstArr(newArr.slice(page - 1, page + 2)); //展示前3页
            setLastArr(newArr.slice(totalPages - 1));  //最后一页
        }else{
            setFirstArr(newArr.slice(totalPages - 4, totalPages));
            // console.log(totalPages - 4, totalPages);
            setLastArr([]);
        }
    }, [totalPages,page]);


    const navigate = useNavigate();
    const isActive = (index) => {
        if(index === page) return "active"
        return ""
    }

    //上一页
    const prev = () => {
        const newPage = Math.max(page - 1, 1)
        navigate(`?page=${newPage}`)
    }

    //下一页
    const next = () => {
        const newPage = Math.min(page + 1, totalPages)
        navigate(`?page=${newPage}`)
    }

    //跳页
    const jump = (num) => {
        navigate(`?page=${num}`)
    }


    return { firstArr, lastArr, isActive, prev, next, jump }
};

export default usePagination;

//分页hook
import React, {useMemo} from 'react';
import useCustomRouter from "./useCustomRouter";
import { useMyContext } from "../context/store";

const usePagination = (totalPages) => {
    const { page, sort } = useMyContext();
    const {firstArr, lastArr} = useMemo(() => {
        // console.log(totalPages, page);
        const newArr = [...Array(totalPages)].map((_, i) => i + 1);
        // console.log(newArr);
        if (totalPages < 4)
            return {
                firstArr: newArr,
                lastArr: []
            }; //当总页数小于4时
        if (totalPages - page >= 4) {
            return {
                firstArr: newArr.slice(page - 1, page + 2), //展示前3页
                lastArr: newArr.slice(totalPages - 1)  //展示最后一页
            }
        } else {
            return {
                firstArr: newArr.slice(totalPages - 4, totalPages),
                lastArr: []
            }
        }
    }, [totalPages, page]);


    const {pushQuery} = useCustomRouter();
    const isActive = (index) => {
        if (index === page) return "active"
        return ""
    }

    //上一页
    const prev = () => {
        const newPage = Math.max(page - 1, 1)
        // navigate(`?page=${newPage}`)
        pushQuery({page: newPage, sort});
    }

    //下一页
    const next = () => {
        const newPage = Math.min(page + 1, totalPages)
        // navigate(`?page=${newPage}`)
        pushQuery({page: newPage, sort}); //添加排序
    }

    //跳页
    const jump = (num) => {
        // navigate(`?page=${num}`)
        pushQuery({page: num, sort});
    }


    return {firstArr, lastArr, isActive, prev, next, jump}
};

export default usePagination;

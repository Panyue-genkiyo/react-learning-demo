import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = ({totalPages, page }) => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);
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

    return (
        <div className='pagination'>
            <button onClick={prev}>&laquo;</button>
            {
                newArr.map(num => (
                    <button onClick={() => jump(num)} key={num} className={`${isActive(num)}`}>
                        {num}
                    </button>
                ))
            }
            <button onClick={next}>&raquo;</button>
        </div>
    )
}

export default Pagination

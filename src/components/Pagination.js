import React  from 'react';
import usePagination from "../hooks/usePagination";

const Pagination = ({totalPages, page }) => {

    const { prev, next, jump, firstArr, lastArr, isActive } = usePagination(totalPages, page);

    return (
        <div className='pagination'>
            <button onClick={prev}>&laquo;</button>
            {
                firstArr.map(num => (
                    <button onClick={() => jump(num)} key={num} className={`${isActive(num)}`}>
                        {num}
                    </button>
                ))
            }
            {lastArr.length > 0 && <button>...</button>}
            {
                lastArr.map(num => (
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

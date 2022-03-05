import React  from 'react';
import usePagination from "../hooks/usePagination";

//react memo避免home主页渲染多次导致pagination组件多次无效渲染
const Pagination = ({ totalPages, page, sort }) => {

    const { prev, next, jump, firstArr, lastArr, isActive } = usePagination(totalPages, page, sort);

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

export default React.memo(Pagination)

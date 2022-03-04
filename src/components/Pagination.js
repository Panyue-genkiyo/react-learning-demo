import React from 'react'

const Pagination = ({totalPages, page}) => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)

    const isActive = (index) => {
        if(index === page) return "active"
        return ""
    }

    return (
        <div className='pagination'>
            <button>&laquo;</button>
            {
                newArr.map(num => (
                    <button key={num} className={`${isActive(num)}`}>
                        {num}
                    </button>
                ))
            }
            <button>&raquo;</button>
        </div>
    )
}

export default Pagination

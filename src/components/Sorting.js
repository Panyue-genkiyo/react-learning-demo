import React from 'react';
import useCustomRouter from "../hooks/useCustomRouter";
//排序
const Sorting = ({ page ,sort }) => {

    // const navigate = useNavigate();
    const { pushQuery } = useCustomRouter();

    const handleSort = (e) => {
        const { value } = e.target;
        // navigate(`?sort=${value}`);
        pushQuery({ page, sort: value });
    }

    return (
        <div className='sorting'>
            <select onChange={handleSort} value={sort}>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="-price">Price: Hight-Low</option>
                <option value="price">Price: Low-Hight</option>
            </select>
            <h2>&#8678;Sort</h2>
        </div>
    );
};

export default React.memo(Sorting);

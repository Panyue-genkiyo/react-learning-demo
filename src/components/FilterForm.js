import React from 'react';

const FilterForm = () => {
    return (
        <div className='filter_form' title='Enter to filter'>
            <form>
                <div>
                    <input type="text"
                           placeholder="0" required
                    />
                    <select>
                        <option value="lt" title='lesser than'>LT</option>
                        <option value="lte" title='lesser than or equal'>LTE</option>
                        <option value="gt" title='greater than'>GT</option>
                        <option value="gte" title='greater than or equal'>GTE</option>
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default FilterForm;

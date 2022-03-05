import React, {useRef} from 'react';
import { useNavigate } from "react-router-dom";

const SearchForm = () => {

    const inputRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        if(!value.trim()) return;
        return navigate(`/search/${value}`);
    }

    return (
        <div className='search_form'>
            <form onSubmit={handleSubmit}>
                <input type='text' ref={inputRef}/>
                <button>Search</button>
            </form>
        </div>
    );
};

export default SearchForm;

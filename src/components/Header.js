import React, { useState } from 'react';
import Model from "./Model";
import SearchForm from "./SearchForm";
import FilterForm from "./FilterForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [ openSearch, setOpenSearch ] = useState(false);
    const [ openFilter, setOpenFilter ] = useState(false);
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                <p onClick={() => navigate('/')}>Home</p>
                <p>Create Product</p>
                <p onClick={() => setOpenSearch(true)}>Search</p>
                <p onClick={() => setOpenFilter(true)}>Filter</p>
            </nav>
            {
                openSearch && (
                    <Model titleTxt={'search'} setOpen={setOpenSearch}>
                        <SearchForm setOpen={setOpenSearch}/>
                    </Model>
                )
            }
            {
                openFilter && (
                    <Model titleTxt={'filter'} setOpen={setOpenFilter}>
                        <FilterForm setOpen={setOpenFilter}/>
                    </Model>
                )
            }

        </header>
    );
};

export default Header;

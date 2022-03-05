import React, { useState } from 'react';
import Model from "./Model";
import SearchForm from "./SearchForm";
import FilterForm from "./FilterForm";

const Header = () => {
    const [ openSearch, setOpenSearch ] = useState(false);
    const [ openFilter, setOpenFilter ] = useState(false);
    return (
        <header>
            <nav>
                <p>Home</p>
                <p>Create Product</p>
                <p onClick={() => setOpenSearch(true)}>Search</p>
                <p onClick={() => setOpenFilter(true)}>Filter</p>
            </nav>
            {
                openSearch && (
                    <Model titleTxt={'search'} setOpen={setOpenSearch}>
                        <SearchForm/>
                    </Model>
                )
            }
            {
                openFilter && (
                    <Model titleTxt={'filter'} setOpen={setOpenFilter}>
                        <FilterForm/>
                    </Model>
                )
            }

        </header>
    );
};

export default Header;

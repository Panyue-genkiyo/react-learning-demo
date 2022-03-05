import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Model from "./Model";
import SearchForm from "./SearchForm";
import FilterForm from "./FilterForm";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const Header = () => {
    const [ openSearch, setOpenSearch ] = useState(false);
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openProduct, setOpenProduct ] = useState(false);
    const navigate = useNavigate();
    return (
        <header>
            <nav>
                <p><Link to='/'>Home</Link></p>
                <p onClick={() => setOpenProduct(true)}>Create Product</p>
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
            {
                openProduct && (
                    <Model titleTxt={'Create Product'} setOpen={setOpenProduct}>
                        <ProductForm btnTxt='Add' setOpen={setOpenProduct}/>
                    </Model>
                )
            }
        </header>
    );
};

export default Header;

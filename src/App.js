import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ProductDetail from "./page/ProductDetail";
import Header from "./components/Header";
import Search from "./page/Search";
import Filter from "./page/Filter";

const App = () => {
    return (
        <>
           <Header/>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/products" element={<Home/>}/>
               <Route path="/products/:id" element={<ProductDetail/>}/>
               <Route path="/search/:value" element={<Search/>}/>
               <Route path="/filter/:option/:value" element={<Filter/>}/>
           </Routes>
        </>
    );
};

export default App;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ProductDetail from "./page/ProductDetail";
import Header from "./components/Header";

const App = () => {
    return (
        <>
           <Header/>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/products" element={<Home/>}/>
               <Route path="/products/:id" element={<ProductDetail/>}/>
           </Routes>
        </>
    );
};

export default App;

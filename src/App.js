import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ProductDetail from "./page/ProductDetail";

const App = () => {
    return (
        <div>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/products" element={<Home/>}/>
               <Route path="/products/:id" element={<ProductDetail/>}/>
           </Routes>
        </div>
    );
};

export default App;

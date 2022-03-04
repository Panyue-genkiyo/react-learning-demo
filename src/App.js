import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";

const App = () => {
    return (
        <div>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/products" element={<Home/>} />
           </Routes>
        </div>
    );
};

export default App;

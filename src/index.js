import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  BrowserRouter } from "react-router-dom";
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = 'http://localhost:5001/api'; //请求的前置url


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <App/>
          <ToastContainer/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


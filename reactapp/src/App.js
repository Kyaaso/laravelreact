import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Index from './views/Index';
import Update from './views/Update';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? (`Bearer ${token}`) : ('');
    return config;
  }
)

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/update-account/:id" element={<Update />} />
        {/* <Route path="/update-account/:id" element={<Update />} />
        <Route path="/index" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/" element={localStorage.getItem('auth_token') ? (
            <Index />
          ): (
            <Login />
          )} /> */}
        

      </Routes>
    </Router>
  );
}

export default App;

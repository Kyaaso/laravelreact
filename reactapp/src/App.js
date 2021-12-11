import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Index from './views/Index';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/index" element={<Index/>} />
    </Routes>
  </Router>
  );
}

export default App;

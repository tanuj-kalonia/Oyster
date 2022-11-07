import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Update from "./components/Update";
import Home from "./components/Home";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/update' exact element={<Update />} />
        <Route path='/user' exact element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

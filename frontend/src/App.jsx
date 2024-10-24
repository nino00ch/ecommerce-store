import { useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import About from './pages/About';

function App() {
  
  return (
    <>
    <BrowserRouter>
   
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/about" element={<About/>} />

        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

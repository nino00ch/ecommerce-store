import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/Frame 168.svg'
import user from '../Assets/mdi_account-alert-outline.svg'
import search from '../Assets/akar-icons_search.svg'
import heart from '../Assets/akar-icons_heart.svg'
import card from '../Assets/Vector.svg'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    const [menu, setMenu] = useState("Home");
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none', color:'black'}}to='/'>Home</Link> {menu==="Home"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none', color:'black'}}to='/shop'>Shop</Link> {menu==="shop"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("about")}}> <Link style={{textDecoration:'none', color:'black'}} to='/about'>About</Link> {menu==="about"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("contact")}}> <Link style={{textDecoration:'none', color:'black'}} to='/contact'>Contact</Link> {menu==="contact"?<hr/>:<></>} </li>
        </ul>
        <div className="menu-images">
        <i className="fas fa-user">
      <Link to="/login">
        <img src={user} alt="User Icon" />
      </Link>
    </i>
          <i className="fas fa-search"><img src={search} alt="" /></i>
          <i className="fas fa-heart"><img src={heart} alt="" /></i>
          <i className="fas fa-shopping-cart"><img src={card} alt="" /></i>
          <div className="shopping-card-count">
            0
          </div>
        </div>


    </div>
  )
}

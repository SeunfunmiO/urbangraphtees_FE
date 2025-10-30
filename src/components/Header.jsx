import React from 'react'
import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <header>
      <div className="  py-2 border-bottom" style={{ marginTop: "75px/", fontSize: "15px" }}>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink to="/shop?category=All" className="nav-link" style={{ color: "black" }}>All Collections</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop?category=T-Shirts" className="nav-link" style={{ color: "black" }}>T-Shirts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop?category=Joggers" className="nav-link" style={{ color: "black" }}>Joggers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop?category=Hoodies" className="nav-link" style={{ color: "black" }}>Hoodies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop?category=Shirts" className="nav-link" style={{ color: "black" }}>Shirts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shop?category=Hats" className="nav-link" style={{ color: "black" }}>Hats</NavLink>
          </li>
        </ul>
      </div>

    </header>
  )
}

export default Header
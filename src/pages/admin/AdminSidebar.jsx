import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBox, FaChartPie, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <aside className="d-flex flex-column bg-black text-white p-3 vh-100 position-fixed" style={{ width: 240 }}>
      <h4 className="text-center mb-4 fw-bold">Admin Panel</h4>

      <nav className="flex-grow-1">
        <ul className="nav flex-column gap-2">
          <li>
            <button onClick={()=>navigate("/admin/overview")} end className="nav-link text-white" activeclassname="fw-bold text-light">
              <FaChartPie className="me-2" /> Overview
            </button>
          </li>
          <li>
            <NavLink to="/admin/products" className="nav-link text-white" activeclassname="fw-bold text-light">
              <FaBox className="me-2" /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className="nav-link text-white" activeclassname="fw-bold text-light">
              <FaShoppingCart className="me-2" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="nav-link text-white" activeclassname="fw-bold text-light">
              <FaUsers className="me-2" /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className="nav-link text-white" activeclassname="fw-bold text-light">
              <FaCog className="me-2" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button onClick={handleLogout} className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { BiMenuAltLeft } from "react-icons/bi";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex position-relative">
      <div
        className={`admin-sidebar-container bg-white border-end ${sidebarOpen ? "show" : ""
          }`}
        style={{
          width: 240,
          height: "100vh",
          position: "fixed",
          left: window.innerWidth > 992 ? 0 : sidebarOpen ? 0 : -240,
          top: 0,
          transition: "left 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <AdminSidebar />
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        ></div>
      )}

      <main
        className="flex-grow-1 p-4"
        style={{
          marginLeft: window.innerWidth > 992 ? 240 : 0,
          backgroundColor: "white",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-0 border-0 btn-outline-dark/ d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <BiMenuAltLeft size={24} />
            </button>
            <h2 className="fw-semibold text-black m-0">Dashboard Overview</h2>
          </div>
          <div className="text-muted small">Admin / Dashboard</div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
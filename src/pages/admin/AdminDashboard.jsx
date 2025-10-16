import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main
        className="flex-grow-1 p-4"
        style={{
          marginLeft: 240,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h2 className="fw-semibold text-dark">Dashboard Overview</h2>
          <div className="text-muted small">Admin / Dashboard</div>
        </header>

        {/* Dynamic content rendered by routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuthGuard = ({ children }) => {
    const { user } = useSelector((state) => state.auth.user);

    if (!user || user.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? children : <Outlet />;
}

export default AdminAuthGuard
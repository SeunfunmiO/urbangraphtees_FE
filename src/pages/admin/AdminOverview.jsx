import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const AdminOverview = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "https://urbangraphtees-be.onrender.com/admin/stats",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                setStats(response.data);
            } catch (error) {
                console.log("Error fetching admin stats:", error);
                toast.error("Failed to load admin statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <ClipLoader size={40} color="#000" />
            </div>
        );
    }

    return (
        <div className="container-fluid px-3">
            <h2 className="fw-bold mb-4 text-center text-md-start">
                Admin Overview
            </h2>

            <div className="row g-4">
                {/* Users Card */}
                <div className="col-md-4">
                    <div
                        className="card border-0 shadow-sm p-4 text-center"
                        style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px" }}
                    >
                        <FaUsers size={35} className="mb-2" />
                        <h5 className="fw-semibold">Total Users</h5>
                        <h3 className="fw-bold">{stats.totalUsers}</h3>
                    </div>
                </div>

                {/* Products Card */}
                <div className="col-md-4">
                    <div
                        className="card border-0 shadow-sm p-4 text-center"
                        style={{ backgroundColor: "#fff", color: "#000", borderRadius: "12px" }}
                    >
                        <FaBoxOpen size={35} className="mb-2" />
                        <h5 className="fw-semibold">Total Products</h5>
                        <h3 className="fw-bold">{stats.totalProducts}</h3>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="col-md-4">
                    <div
                        className="card border-0 shadow-sm p-4 text-center"
                        style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px" }}
                    >
                        <FaShoppingBag size={35} className="mb-2" />
                        <h5 className="fw-semibold">Total Orders</h5>
                        <h3 className="fw-bold">{stats.totalOrders}</h3>
                    </div>
                </div>
            </div>

            {/* Optional last update info */}
            <div className="text-muted text-center mt-4">
                Last updated {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default AdminOverview;
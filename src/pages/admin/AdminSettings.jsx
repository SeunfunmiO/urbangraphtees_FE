import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSettings = () => {
    const [admin, setAdmin] = useState({ name: "", email: "" });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [message, setMessage] = useState("");

    const fetchAdmin = async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
            });
            setAdmin(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "/api/admin/profile",
                { name: admin.name, email: admin.email },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "/api/admin/change-password",
                passwordData,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setMessage(res.data.message);
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3 className="fw-semibold mb-4">Admin Settings</h3>

            {message && (
                <div className="alert alert-success py-2">{message}</div>
            )}

            <div className="row g-4">
                {/* Profile Update */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4">
                        <h5 className="fw-semibold mb-3">Profile Information</h5>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={admin.name}
                                    onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={admin.email}
                                    onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                                />
                            </div>

                            <button className="btn bg-black text-white w-100">Update Profile</button>
                        </form>
                    </div>
                </div>

                {/* Password Change */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4">
                        <h5 className="fw-semibold mb-3">Change Password</h5>
                        <form onSubmit={handleChangePassword}>
                            <div className="mb-3">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.newPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <button className="btn btn-outline-dark w-100">
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
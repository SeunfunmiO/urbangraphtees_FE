import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, resetSettings } from "../redux/settingsSlice";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import axios from "axios"

const Settings = () => {
    const { name, email } = useSelector((state) => state.settings);
    const [formData, setFormData] = useState({ name, email });
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [saving, setsaving] = useState(false)
    const [loading, setloading] = useState(false)
    const handleLogout = () => {
        setloading(true)
        setTimeout(() => {
            dispatch(logout())
            toast.success("You have logged out successfully")
            navigate('/signin')
        }, 3000);
        setloading(false)
    }
    const handleSubmit = (e) => {
        setloading(true)
        setTimeout(() => {
            e.preventDefault();
            dispatch(updateProfile(formData));
            toast.success("Profile updated!")
        }, 3000);
        setloading(false)
    };

    const handleDelete = () => {
        // if (window.m confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        setTimeout(() => {
            setloading(true)
            try {
                const token = localStorage.getItem('token');
                axios.delete('https://urbangraphtees-be.onrender.com/user/delete', {
                    headers: { Authorization: `Bearer ${token} ` },
                });

                dispatch(logout());
                toast.success('Account deleted successfully')
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete account')
            }
        }, 3000);

        setloading(false)
    };

    return (
        <div className="container my-5">
            <h6>Account Settings</h6>
            <div>
                <div className="text-center mb-4">
                    <img src={'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=184&h=183&c=7&r=0&o=7&pid=1.7&rm=3'} className="rounded-circle mb-3" alt="Profile" width={100} height={100} />
                    <div>
                        {/* <label htmlFor="" className="btn text-white btn-small mb-3" style={{ backgroundColor: "black" }}>
                        </label> */}
                        <input className='' type="file" accept="image/*" />
                    </div>
                </div>



            </div>
            {/* Profile Info */}
            <div className="card mb-3">
                <div className="card-body">
                    <h6>Profile Information</h6>
                    <form onSubmit={handleSubmit} className="">
                        <div className="mb-3 ">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control "
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input name="phone" className="form-control" />
                        </div>
                        <div className="col-12 d-flex gap-2 my-3 flex-wrap">
                            <button type="submit" className="btn bg-black btn-sm text-white">{loading ? 'Updating...' : 'Update Profile'}</button>
                            <Link to={'/reset-password'} className="btn btn-outline-danger btn-sm">Reset Password</Link>
                        </div>

                    </form>
                </div>
            </div>

            <hr />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="col-12">
                        <h6 className="mb-2">Default Shipping Address</h6>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address Line</label>
                        <input name="line1" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input name="city" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <input name="country" className="form-control" />
                    </div>

                    <div className="col-12 d-flex gap-2 my-3">
                        <button type="submit" className="btn btn-dark" disabled={saving} onClick={setsaving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Dark Mode */}
            {/* <div className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h6>Dark Mode</h6>
                    <button
                        onClick={() => dispatch(toggleDarkMode())}
                        className="btn btn-outline-secondary"
                    >
                        {darkMode ? "Disable" : "Enable"}
                    </button>
                </div>
            </div> */}
            <hr />
            {/* Reset */}
            <div className="card">
                <div className="card-body">
                    <h6 className="text-decoration-underline text-danger fw-5 fs-5   " >Danger Zone</h6>
                    <div className="d-flex flex-column align-items-start gap-2">
                        <button type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-outline-danger" >
                            Delete Account
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => dispatch(resetSettings())}
                        >
                            Reset Settings
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={handleLogout} disabled={loading} className="text-black btn border-0 btn-0 "><BiLogOut size={18} className="me-2" />{loading ? 'Logging Out' : 'Log Out'}</button>



            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Account Deletion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete your account? This cannot be undone.
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={loading} onClick={() => handleDelete()} type="button" className="btn btn-danger">{loading ? 'Deleting' : 'Yes, Delete'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
import UserOrder from "./UserOrder";
import UserProfile from "./UserProfile";
import { FaBox, FaCog, FaHeart, FaHome, FaUser, FaUserCheck } from "react-icons/fa";
import Settings from "./Settings";
import { BiHome, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import OverView from "./Overview";




const UserDashboard = () => {
    const [activePage, setActivePage] = useState("overview");
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const renderContent = () => {
        switch (activePage) {
            // case "overview":
            //     return <OverView/>
            case "profile":
                return <UserProfile />;
            case "orders":
                return <UserOrder />;
            case "wishlist":
                return <Wishlist />;
            case "settings":
                return <Settings />;
            default:
        }
    };


    const handleLogout = () => {
        dispatch(logout())
        toast.success("You have logged out successfully")
        navigate('/signin')
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block bg-black text-white sidebar collapse vh-100">
                    <div className="position-sticky pt-3">
                        <h4 className="px-3 ">My Account</h4>
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                style={{ width: 48, height: 48, overflow: "hidden" }}
                            >
                                <FaUserCheck className="text-dark" />
                            </div>
                            <div>
                                <div className="small text-muted ">Signed in as</div>
                                <div className="fw-semibold">{user?.userName || "User"}</div>
                            </div>
                        </div>
                        <ul className="list-unstyled mt-4">
                            <li className="mb-2">
                                <FaHome />
                                <button onClick={() => setActivePage("overview")} className="btn border-0 text-white">
                                    Overview
                                </button>
                            </li>
                            <li className="mb-2">
                                <FaBox />
                                <button onClick={() => setActivePage("orders")} className="btn border-0 text-white">
                                    Orders
                                </button>
                            </li>
                            <li className="mb-2">
                                <FaHeart />
                                <button onClick={() => setActivePage("wishlist")} className="btn border-0  text-white">
                                    Wishlist
                                </button>
                            </li>
                            <li className="mb-2">
                                <FaCog />
                                <button onClick={() => setActivePage("settings")} className="btn border-0 text-white">
                                    Settings
                                </button>
                            </li>
                            <li className="mb-2">
                                <BiHome />
                                <button onClick={() => navigate("/")} className="btn border-0 text-white">
                                    Go Home
                                </button>
                            </li>
                            <hr />
                            <li className="mb-2 text-danger">
                                <BiLogOut />
                                <button onClick={() => handleLogout()} className="btn border-0 text-danger">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2>Welcome back, {user?.userName || "User"}</h2>
                    </div>

                    <div className="row d-md-none/">
                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">My Orders</h5>
                                    <p className="card-text">Track your recent orders</p>
                                    <div onClick={() => navigate('/dashboard/orders')} className="btn text-light bg-black" >
                                        View Orders
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Wishlist</h5>
                                    <p className="card-text">See your saved items</p>
                                    <div onClick={() => navigate('/wishlist')} className="btn text-light bg-black">
                                        View Wishlist
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Profile</h5>
                                    <p className="card-text">Manage your details</p>
                                    <div onClick={() => navigate('/settings')} className="btn text-light bg-black">
                                        Edit Profile
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-3 text-black text-center d-md-none">
                        <BiLogOut size={18} />
                        <button onClick={() => handleLogout()} className="btn border-0 text-black">
                            Log Out
                        </button>
                    </div>
                    <div className="flex-grow-1 p-4">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10


    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                "https://urbangraphtees-be.onrender.com/admin/users",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(res.data.user);
            setPage(res.data.currentPage)
            setTotalPages(res.data.totalPages)
        } catch (error) {
            toast.error("Failed to fetch users");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers(page, search)
    }, [page, search])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        setPage(1)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                ` https://urbangraphtees-be.onrender.com/admin/users/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("User deleted successfully");
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            toast.error("Error deleting user");
            console.log(error);
        }
    };

    const handleRoleToggle = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                ` https://urbangraphtees-be.onrender.com/admin/users/${id}/role`,
                {},
                { headers: { Authorization: `Bearer ${token} ` } }
            );
            toast.success(`User role updated to ${res.data.role}`);
            fetchUsers();
        } catch (error) {
            toast.error("Error updating role");
            console.log(error);
        }
    };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <ClipLoader color="#000" size={35} />
            </div>
        );

    return (
        <div className="container-fluid px-3">
            <h3 className="fw-bold mb-4">Manage Users</h3>

            <div className="d-flex align-items-center border rounded px-2 bg-white">
                <FaSearch className="text-muted me-2" />
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={handleSearch}
                    className="form-control border-0 shadow-none"
                    style={{ width: "250px" }}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{(page - 1) * limit + index + 1}</td>
                                    <td>{index + 1}.</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role === "admin"
                                                ? "bg-dark text-white"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRoleToggle(user._id)}
                                            className="btn btn-sm btn-outline-dark me-2"
                                        >
                                            {user.role === "admin" ? "Demote" : "Promote"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                key={i}
                                className={`page - item ${page === i + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setPage(i + 1)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div >
    );
};

export default ManageUsers;
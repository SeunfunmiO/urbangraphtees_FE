import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteUser, setDeleteUser] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const token = localStorage.getItem("token");


    const fetchUsers = async (pageNumber = 1, searchQuery = "") => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://urbangraphtees-be.onrender.com/admin/users?page=${pageNumber}&search=${searchQuery}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(
                Array.isArray(res.data.users)
                    ? res.data.users
                    : [res.data.users].filter(Boolean)
            );
            setPage(res.data.currentPage || 1);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            toast.error("Failed to fetch users");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page, search);
    }, [page, search]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleDelete = async (id) => {
        try {
            setDeleting(true);
            await axios.delete(
                `https://urbangraphtees-be.onrender.com/admin/users/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("User deleted successfully");
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            toast.error("Error deleting user");
            console.log(err);
        } finally {
            setDeleting(false);
            setDeleteUser(null);
        }
    };

    const handleRoleToggle = async (id) => {
        try {
            const res = await axios.put(
                `https://urbangraphtees-be.onrender.com/admin/users/${id}/role`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );


            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id
                        ? { ...user, role: res.data.user.role || (user.role === "admin" ? "user" : "admin") }
                        : user
                )
            );

            toast.success(`User role updated to ${res.data.role}`);
        } catch (err) {
            toast.error("Error updating role");
            console.log(err);
        }
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <BarLoader color="#000" size={40} />
            </div>
        );

    return (
        <div className="container-fluid px-3">
            <h3 className="fw-bold mb-4">Manage Users</h3>

            <div className="d-flex align-items-center border rounded px-2 bg-white mb-3">
                <FaSearch className="text-muted me-2" />
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={handleSearch}
                    className="form-control border-0 shadow-none bg-transparent"
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
                                    <td>{user.fullName || user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role?.toLowerCase() === "admin"
                                                ? "bg-dark text-white"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {user.role || "User"}
                                        </span>
                                    </td>
                                    <td>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</td>
                                    <td>
                                        <div className="d-flex gap-3">
                                            <button
                                                onClick={() => handleRoleToggle(user._id)}
                                                className="btn btn-sm btn-outline-dark"
                                            >
                                                {user.role?.toLowerCase() === "admin" ? "Demote" : "Promote"}
                                            </button>
                                            <button
                                                onClick={() => setDeleteUser(user)}
                                                className="btn btn-sm btn-outline-danger"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                            >
                                                Delete
                                            </button>
                                        </div>
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
                    <ul className="pagination border-0">
                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                key={i}
                                className={`page-item ${page === i + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link border-0 bg-black"
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

            <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">
                                Confirm User Deletion
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {deleteUser ? (
                                <>
                                    Are you sure you want to delete{" "}
                                    <strong>{deleteUser.fullName || deleteUser.name}</strong>? This
                                    cannot be undone.
                                </>
                            ) : (
                                "No user selected"
                            )}
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deleting}
                                onClick={() => handleDelete(deleteUser._id)}
                                type="button"
                                className="btn btn-danger"
                            >
                                {deleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"


const UserOrder = () => {
    const orders = useSelector((state) => state.orders.items);

    return (
        <div className="container my-5">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center my-5 py-5">
                    <FaBoxOpen size={40} color="lightgray" />
                    <p className="text-muted mt-3">No orders yet</p>
                    <Link to="/shop" className="btn bg-black text-white mt-3">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="list-group">
                    {orders.map((order) => {

                        const textColor =
                            order.status === "Pending Payment"
                                ? "text-warning"
                                : "text-success";

                        return (
                            <div key={order.id} className="list-group-item mb-3">
                                <h5>Order ID: {order._id}</h5>
                                <p>Date: {order.createdAt}</p>
                                <p>Total: ₦{order.total}</p>
                                <p className={textColor}>Status: {order.status}</p>

                                <h6>Items:</h6>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            <div className="d-flex flex-column">
                                                <div>
                                                    {item.name} {' '} [{item.quantity}] × ₦{item.price}
                                                </div>
                                                <div>
                                                    {item.color} - {item.size}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UserOrder;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserOrder = () => {
    const orders = useSelector((state) => state.orders.items);
    const navigate = useNavigate()

    return (
        <div className="container my-5">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <div>
                    <p>No orders yet.</p>
                    <button onClick={()=>navigate('/shop')} className="btn btn-outline-dark">Shop Now</button>
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
                                <h5>Order ID: {order.id}</h5>
                                <p>Date: {order.date}</p>
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

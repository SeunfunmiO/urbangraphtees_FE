// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token"); // assuming you store it there
//         const res = await axios.get("https://urbangraphtees-be.onrender.com/orders/admin", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="admin-orders">
//       <h4 className="fw-semibold mb-4">All Orders</h4>

//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary"></div>
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="alert alert-light text-center">No orders yet</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Customer</th>
//                 <th>Email</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={order._id}>
//                   <td>{index + 1}</td>
//                   <td>{order.user?.name}</td>
//                   <td>{order.user?.email}</td>
//                   <td>
//                     {order.items.map((item, i) => (
//                       <div key={i}>
//                         {item.name} × {item.quantity}
//                       </div>
//                     ))}
//                   </td>
//                   <td>₦{order.totalAmount.toLocaleString()}</td>
//                   <td>
//                     <span
//                       className={`badge ${order.status === "Delivered"
//                           ? "bg-success"
//                           : order.status === "Pending"
//                             ? "bg-warning text-dark"
//                             : "bg-secondary"
//                         }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ManageOrders

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { FaBoxOpen } from "react-icons/fa6";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "https://urbangraphtees-be.onrender.com/orders/admin";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        toast.error("Failed to fetch all orders");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `https://urbangraphtees-be.onrender.com/orders/${id}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: newStatus } : o
        )
      );
      toast.success("Order status updated");
    } catch (err) {
      toast.error("Failed to update order status");
      console.log(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <BarLoader color="#000" size={35} />
      </div>
    );



  return (
    <div>
      <h3 className="fw-bold mb-4">Manage Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center my-5 py-5">
          <FaBoxOpen size={40} color="lightgray" />
          <p className="text-muted mt-3">No orders yet</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark/">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}.</td>
                  <td>{order.user?.name || "N/A"}</td>
                  <td>{order.user?.email || "N/A"}</td>
                  <td>
                    {order.orderItems.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₦{order.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`badge bg-${order.orderStatus === "delivered"
                      ? "success"
                      : order.orderStatus === "processing"
                        ? "warning"
                        : "secondary"
                      }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      disabled={updating}
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
    </div>

  );
};

export default ManageOrders;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImNotification } from "react-icons/im";
import { formatDistanceToNow } from "date-fns";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const notifications = useSelector((state) => state.notification.items || []);
  const notification = notifications.find((n) => n._id === id);

  if (!notification) {
    return (
      <div className="text-center my-5 py-5">
        <ImNotification size={40} color="lightgray" />
        <p className="text-muted mt-3">Notification not found</p>
        <button onClick={() => navigate(-1)} className="btn bg-black text-white">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
        <h4 style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
          {notification.type || "Notification"}
        </h4>
        <small style={{ color: "#6c757d" }}>
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </small>
        <hr />
        <p style={{ marginTop: "1rem", lineHeight: "1.6", color: "#333" }}>
          {notification.message}
        </p>
      </div>

      <button
        className="btn btn-outline-dark mb-3 mt-3"
        onClick={() => navigate(-1)}
      >
        ← Back to Notifications
      </button>
    </div>
  );
};

export default NotificationDetails;
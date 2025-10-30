import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <img
        src="/success-animation.gif"
        alt="success"
        className="mb-4"
        style={{ width: "150px" }}
      />
      <h2 className="fw-bold mb-3">Payment Successful 🎉</h2>
      <p className="text-muted mb-4">
        Your order has been placed successfully. Thank you for shopping with us.
      </p>
      <div className="d-flex gap-3">
        <button
          className="btn btn-dark"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaAsterisk } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post("https://urbangraphtees-be.onrender.com/user/forgot-password", {
          email: values.email,
        });
        toast.success(res.data.message || "Password reset link sent to your email.");
        navigate("/"); // or redirect back to login page
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to send reset link");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-3">Forgot Password</h3>
        <p className="text-muted" style={{ fontSize: "14px" }}>
          Enter your email address and we’ll send you a password reset link.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "border border-danger" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-white"
            style={{ backgroundColor: "black" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
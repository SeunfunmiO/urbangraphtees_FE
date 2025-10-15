import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { FaAsterisk } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://urbangraphtees-be.onrender.com/user/reset-password/${token}",
          { password: values.password }
        );
        toast.success(res.data.message || "Password reset successful!");
        navigate("/signin");
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Reset failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-3">Reset Password</h3>
        <p className="text-muted" style={{ fontSize: "14px" }}>
          Enter your new password below.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "border border-danger" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border border-danger"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <small className="text-danger">{formik.errors.confirmPassword}</small>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-white"
            style={{ backgroundColor: "black" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
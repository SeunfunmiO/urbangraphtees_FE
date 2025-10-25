import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import Axios from 'axios'
import { FaAsterisk } from "react-icons/fa";;
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";
import { createNotification } from "../redux/notificationSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user)


  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await Axios.post("https://urbangraphtees-be.onrender.com/user/signup", {
          fullName: values.fullName,
          email: values.email,
          userName: values.userName,
          password: values.password,
          confirmPassword: values.confirmPassword,
          agree: values.agree
        });
        console.log(response);
        dispatch(loginSuccess)
        toast.success(' Account created successfully')
        const userName = user?.userName || user?.fullname?.split(' ')[0] || "User"
        dispatch(createNotification({
          message: `Hello ${userName}, You have successfully created an account`,
          type: 'success',
          status: true
        }))

        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } catch (error) {
        console.error(error.message);
        toast.error('Something went wrong. Please try again.')
      } finally {
        setLoading(false);
      }
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required("Fullname is required!")
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters"),
      userName: yup
        .string()
        .required("Username is required!")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Please enter a valid email address"),
      password: yup
        .string()
        .required("Password is required!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
      agree: yup
        .boolean()
        .oneOf([true], "You must accept the Terms & Conditions"),
    }),
  });


  return (
    <div className="d-flex justify-content-center" style={{ fontSize: "14px" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 style={{ fontSize: "26px" }}>Create an Account</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Fullname <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="text"
              name="fullName"
              className={`form-control ${formik.touched.fullName && formik.errors.fullName ? "border border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && <small className="text-danger">{formik.errors.fullName}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Username <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="text"
              name="userName"
              className={`form-control ${formik.touched.userName && formik.errors.userName ? "border border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && <small className="text-danger">{formik.errors.userName}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email Address <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="text"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? "border border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && <small className="text-danger">{formik.errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? "border border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && <small className="text-danger">{formik.errors.password}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Confirm Password <FaAsterisk color="#dc4d53" size={8} />
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && <small className="text-danger">{formik.errors.confirmPassword}</small>}
          </div>

          <div className="d-flex align-items-center gap-2 mt-3">
            <input
              type="checkbox"
              name="agree"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.agree}
            />
            <label style={{ fontSize: "12px" }}>
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                Privacy Policy
              </a>
            </label>
          </div>
          {formik.touched.agree && formik.errors.agree && <small className="text-danger">{formik.errors.agree}</small>}

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-light mt-3"
            style={{ backgroundColor: "black", fontSize: "14px" }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-muted mt-4" style={{ fontSize: "13px" }}>
          Already have an account?
          <button
            onClick={() => navigate("/signin")}
            className="btn btn-link btn-small text-decoration-underline px-1"
            style={{ color: "black", fontSize: "12px" }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import Axios from 'axios'
import { FaAsterisk } from "react-icons/fa";;
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  // const user = useSelector((state) => state.auth.user)


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
        // const userName = user?.userName || user?.fullname?.split(' ')[0] || "User"
        let message =

          //         <tr>
          //           <td style="background-color: #000000; padding: 40px 30px; text-align: center;">
          //             <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 2px;">
          //               URBANGRAPHTEES
          //             </h1>
          //             <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; letter-spacing: 1px;">
          //               STREETWEAR • CULTURE • DESIGN
          //             </p>
          //           </td>

          //           <td style="padding: 50px 30px;">
          //             <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 28px; font-weight: bold;">
          //               Welcome, {userName}! 👋
          //             </h2>
          //             <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
          //               Thank you for joining the UrbanGraphTees (UGT) family! We're thrilled to have you as part of our
          //               community of
          //               style enthusiasts who appreciate bold designs and authentic streetwear.
          //             </p>
          //             <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
          //               Your account is now active, and you're ready to explore our latest collections, exclusive drops, and
          //               limited-edition designs.
          //             </p>
          //           </td>
          //         </tr>


          //         <tr>
          //           <td style="padding: 0 30px 30px 30px;">
          //             <div
          //               style="background-color: #f9f9f9; border-left: 4px solid #000000; padding: 20px; margin-bottom: 20px;">
          //               <h3 style="margin: 0 0 15px 0; color: #000000; font-size: 20px; font-weight: bold;">
          //                 What's Next?
          //               </h3>
          //               <ul style="margin: 0; padding-left: 20px; color: #333333; font-size: 15px; line-height: 1.8;">
          //                 <li>Browse our latest collection of graphic tees</li>
          //                 <li>Get early access to new releases and exclusive drops</li>
          //                 <li>Enjoy member-only discounts and promotions</li>
          //                 <li>Track your orders and manage your wishlist</li>
          //               </ul>
          //             </div>
          //           </td>
          //         </tr>

          //         <tr>
          //           <td style="padding: 0 30px 40px 30px; text-align: center;">
          //             <a href="http://localhost:5173/shop?category=All"
          //               style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 16px 40px; font-size: 16px; font-weight: bold; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase;">
          //               Start Shopping
          //             </a>
          //           </td>
          //         </tr>


          //         <tr>
          //           <td style="padding: 0 30px 40px 30px;">
          //             <div
          //               style="background-color: #000000; color: #ffffff; padding: 25px; text-align: center; border-radius: 4px;">
          //               <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">
          //                 Welcome Gift
          //               </p>
          //               <p style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold; color: #ffffff ">
          //                 10% OFF
          //               </p>
          //               <p style="margin: 0 0 15px 0; font-size: 14px; color: #ffffff">
          //                 Your First Order
          //               </p>
          //               <p
          //                 style="margin: 0; font-size: 18px; font-weight: bold; letter-spacing: 2px; background-color: #ffffff; color: #000000; padding: 12px; display: inline-block; border-radius: 4px;">
          //                 WELCOME10
          //               </p>
          //             </div>
          //           </td>
          //         </tr>

          //         <tr>
          //           <td style="padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
          //             <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px;">
          //               Follow us for style inspiration
          //             </p>
          //             <div>
          //               <a href="https://www.instagram.com/urbangraphtees_thebrand/"
          //                 style="display: inline-block; margin: 0 10px; color: #000000; text-decoration: none; font-weight: bold;">Instagram</a>
          //               <a href="#"
          //                 style="display: inline-block; margin: 0 10px; color: #000000; text-decoration: none; font-weight: bold;">Facebook</a>
          //               <a href="#"
          //                 style="display: inline-block; margin: 0 10px; color: #000000; text-decoration: none; font-weight: bold;">Twitter</a>
          //             </div>
          //           </td>
          //         </tr>

          //         <tr>
          //           <td style="padding: 30px; text-align: center; background-color: #f9f9f9;">
          //             <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px;">
          //               Questions? Contact us at <a href="mailto:urbangraphtees@gmail.com"
          //                 style="color: #000000; text-decoration: none;">urbangraphtees@gmail.com</a>
          //             </p>
          //             <p style="margin: 0; color: #999999; font-size: 11px;">
          //               © 2025 Urbangraphtees. All rights reserved.<br>
          //               Surulere, Lagos, Nigeria
          //             </p>
          //           </td>
          //         </tr>

          //       </table >
          //     </td >
          //   </tr >
          // </table >
          dispatch(addNotification({ message: 'You have successfully created an account', type: 'success' }))

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

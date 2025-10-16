import React, { useState } from 'react'
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import axios from 'axios'
import { FaAsterisk } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { toast } from 'react-toastify';


const SignIn = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: async (values) => {
            setLoading(true)
            console.log(values);
            try {
                let response = await axios.post("https://urbangraphtees-be.onrender.com/user/login", {
                    email: values.email,
                    password: values.password,
                })
                if (values.rememberMe) {
                    localStorage.setItem('user-data', JSON.stringify(response.data))
                } else {
                    sessionStorage.setItem('user-data', JSON.stringify(response.data))
                }
                const { token, user } = response.data
                localStorage.getItem('token', token)
                dispatch(loginSuccess({ user, token }))
                navigate('/dashboard')
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(' Sign In failed. Check your email/password.')
            } finally {
                setLoading(false)
            }

        },
        validationSchema: yup.object({
            email: yup.string().required('Email is required!').email('Please enter a valid email address'),
            password: yup.string().required('Password is required!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/, 'Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character').min(6, 'Password must be at least 6 characters'),
            rememberMe: yup.boolean()
        })
    })


    return (
        <div className="d-flex justify-content-center " style={{ fontSize: '14px' }}>
            <div className="d-flex flex-column">
                {/* <img src="./multimedia/ugtWhiteBgLogo.jpg" alt="ugt logo" width={100} /> */}
                <div className="card/ shadow/ p-4" style={{ maxWidth: "400px", width: '100%' }}>
                    <h2 style={{ fontSize: "26px" }}>Welcome Back</h2>
                    <p>Enter your email and password to sign-in</p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">Email Address <FaAsterisk color='#dc4d53' size={8} /> </label>
                            <input type="text" name="email" 
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'border border-danger form-control' : 'form-control'} `} 
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email ? <small className="text-danger">{formik.errors.email}</small> : ''}
                        </div>
                        <div>
                            <div className="mb-3 mt-4">
                                <div className="d-flex flex wrap justify-content-between align-item">
                                    <label htmlFor="form-label" className="form-label">Password <FaAsterisk color='#dc4d53' size={8} />  </label>
                                    <Link to={'/forgot-password'} className="nav-link text-mute/d" style={{ color: '#007BFF', fontSize: '13px' }}>Forgot password?</Link>
                                </div>
                                <input type="password" name="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'border border-danger form-control' : 'form-control'} `} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                {formik.touched.password ? <small className="text-danger">{formik.errors.password}</small> : ''}

                            </div>

                            <div className="d-flex flex-wrap gap-2 justify-content between my-3">
                                <input type="checkbox" name="consent" />
                                <label style={{ fontSize: '12px' }}>Remember me</label>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn w-100 text-light mt-2" style={{ backgroundColor: "black", fontSize: '14px' }}> {loading ? 'Signing In...' : 'Sign In'} </button>

                    </form>
                    <p className="text-center text-muted mt-4" style={{ fontSize: '13px' }}>
                        New here?
                        <button onClick={() => navigate('/register')} className="btn btn-link btn-small text-decoration-underline px-1" style={{ color: 'black', fontSize: '12px' }} >
                            Create an account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const ContactPage = () => {
    const [loading, setloading] = useState(false)


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            message: ''
        },
        onSubmit: (values) => {
            setTimeout(() => {
                setloading(true)
                toast.success('Message sent successfully!')
                setloading(false)
            }, 3000)
            console.log(values);
            
        },
        validationSchema: yup.object({
              fullName: yup
                .string()
                .required("Fullname is required!")
                .min(2, "Full name must be at least 2 characters")
                .max(50, "Full name must be less than 50 characters"),
              email: yup
                .string()
                .required("Email is required!")
                .email("Please enter a valid email address"),
                message: yup
                .string()
                .required("Please, type your message")
            }),
        
    })

    return (
        <div
            className="contact-page container mt-5"
            style={{ minHeight: "100vh" }}
        >
            <div className="text-center mb-5">
                <h1 className="fw-bold">Contact Us</h1>
                <p className="text-muted">
                    We’d love to hear from you. Fill out the form or reach us directly.
                </p>
            </div>

            <div className="row g-5">
                {/* Contact Form */}
                <div className="col-md-7" style={{ fontSize: '13px' }}>
                    <form onClick={onsubmit} className="text-light p-4 rounded shadow" method='post' style={{ backgroundColor: "black" }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Fullname
                            </label>
                            <input
                                type="text"
                                id="name"
                               className={`form-control ${formik.touched.fullName && formik.errors.fullName ? 'border border-danger form-control' : 'form-control'} `}
                                placeholder="Enter your fullname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fullName ? <small className="text-danger">{formik.errors.fullName}</small> : ''}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                              className={`form-control ${formik.touched.email && formik.errors.email ? 'border border-danger form-control' : 'form-control'} `}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email ? <small className="text-danger">{formik.errors.email}</small> : ''}

                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                className={`form-control ${formik.touched.message && formik.errors.message ? 'border border-danger form-control' : 'form-control'} `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Write your message here..."
                            ></textarea>
                            {formik.touched.message ? <small className="text-danger">{formik.errors.message}</small> : ''}

                        </div>

                        <button disabled={loading} type="submit" className="btn btn-outline-light w-100"  >
                            {loading ? 'Sending...' : ' Send Message'}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="col-md-5">
                    <div className="bg-light p-4 rounded shadow">
                        <h4 className="fw-bold mb-3">Our Contact Info</h4>
                        <p>
                            <strong>Email:</strong> urbangraphtees@gmail.com
                        </p>
                        <p>
                            <strong>Phone:</strong> +234 903 790 0500
                        </p>
                        <p>
                            <strong>Address:</strong> Surulere , Lagos, Nigeria
                        </p>

                        <hr />

                        <h5 className="fw-bold">Follow Us</h5>
                        <div className="d-flex gap-3 mt-2">
                            <a href="https://www.instagram.com/urbangraphtees_thebrand?igsh=aGZyN25jaXk0aHA%3D&utm_source=qr" className='text-dark fs-4'><i className="fa-brands fa-instagram"></i></a>

                            <a href="#" className="text-dark">
                                <i className="bi bi-facebook fs-4"></i>
                            </a>

                            <a href="#" className="text-dark">
                                <i className="bi bi-twitter fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
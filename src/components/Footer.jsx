// import React, { useState } from 'react'
// import AboutUs from './AboutUs'
// import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import Axios from 'axios'
// import { FaEnvelope } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addNotification } from '../redux/notificationSlice';


// const Footer = () => {
//     const [email, setEmail] = useState('')
//     const [loading, setLoading] = useState(false)
//     const dispatch = useDispatch()

//     const handleSubcribe = async (e) => {
//         e.preventDefault()
//         if (!email) return toast.error('Please enter your email')
//         try {
//             setLoading(true)
//             const response = await Axios.post("https://urbangraphtees-be.onrender.com/newsletter/subscribe", { email });
//             toast.success(response.data.message || "Subscription successful!")
//             dispatch(addNotification('Thank you for subscribing to our newsletter!'))
//             setEmail('')
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <footer style={{ backgroundColor: " #000000" }}>
//             <div className="footer px-3 mb-0 pt-4">
//                 <div>
//                     <img src="./multimedia/ugtBlackBgLogo.jpg" className='mb-3' alt=" UrbanGraphTees logo" width={"100px"} />
//                     <AboutUs />
//                 </div>

//                 <div>
//                     <h5>Quick Actions</h5>
//                     <div className='d-flex flex-column foot-link'>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/About">About</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Contact">Contact</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Size_guard">Size Guide</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Blog">Blog</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/FAQs">FAQs</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Delivery-policy">Delivery & Shipping Policy</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Terms">Terms & Conditions</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/Privacy">Privacy Policy</Link>
//                     </div>
//                 </div>

//                 <div>
//                     <h5>Categories</h5>
//                     <div className='d-flex flex-column foot-link'>
//                         <Link className="text-decoration-none text-light text-gray"
//                             to="/shop?category=T-Shirts">T-shirts</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/shop?category=Joggers">Joggers</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/shop?category=Hoodies">Hoodies</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/shop?category=Hats">Hats</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/shop?category=Shirts">Shirts</Link>
//                         <Link className="text-decoration-none text-gray text-light"
//                             to="/shop?category=Footwear">Slides</Link>
//                     </div>
//                 </div>

//                 <div>
//                     <h5>Contact</h5>
//                     <div className='d-flex flex-column foot-link'>
//                         <a href="mailto:urbangraphees@gmail.com" className='text-decoration-none text-light'>urbangraphtees@gmail.com</a>
//                         <a href="tel:+2349037900500" className='text-light'>(+234) 903 790 0500</a>
//                         <p>Surulere, Lagos State, Nigeria</p>
//                         <div className="d-flex gap-4">
//                             <a href="http://wa.me/2349037900500" className='text-light fs-4 '><i className="fa-brands fa-whatsapp"></i></a>
//                             <a href="https://www.instagram.com/urbangraphtees_thebrand?igsh=aGZyN25jaXk0aHA%3D&utm_source=qr" className=' fs-4 text-light'><i className="fa-brands fa-instagram"></i></a>
//                             <a href="mailto:urbangraphtees@gmail.com" className='text-light fs-4 '><i className="fa-regular fa-envelope"></i></a>
//                         </div>

//                         <div className='mt-3'>
//                             <h6>Subscribe to our Newsletter</h6>
//                             <form onSubmit={handleSubcribe} className="d-flex justify-content-center align-items-center gap-3">
//                                 <div className='input-group'>
//                                     <span className="input-group-text">
//                                         <FaEnvelope />
//                                     </span>
//                                     <input className='form-control' type="email" name="email" id="" value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder='hi@gmail.com' required />
//                                 </div>
//                                 <button className='btn btn-light' disabled={loading} type="submit">{loading ? 'Subcribing...' : 'Subscribe'}</button>
//                             </form>
//                             <p className="text-muted mt-3" style={{ fontSize: '13px' }}>Be the first to know about new drops, sales, and exclusive offers.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <hr className='text-light ' />
//             <p className='text-center text-light mb-0 pb-2'>&copy; {new Date().getFullYear()}  Urbangraphees. All Rights Reserved.</p>
//         </footer>
//     )
// }

// export default Footer

import React, { useState } from 'react'
import AboutUs from './AboutUs'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotificationLocal, createNotification } from '../redux/notificationSlice';

const Footer = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")

    const handleSubcribe = async (e) => {
        e.preventDefault()
        if (!email) return toast.error('Please enter your email')
        try {
            setLoading(true)
            const response = await Axios.post("https://urbangraphtees-be.onrender.com/newsletter/subscribe", { email });
            toast.success(response.data.message || "Subscription successful!")
            if (token) {
                dispatch(createNotification({
                    message: 'Thank you for subscribing to our newsletter!',
                    status: true,
                    type: "success"
                }))
                setEmail('')
            } else {
                dispatch(addNotificationLocal({
                    message: 'Thank you for subscribing to our newsletter!',
                    status: true,
                    type: "success"
                }))
                setEmail('')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <footer style={{ backgroundColor: "#000000" }} className="text-light">
            <div className="footer px-5 mb-0 pt-4 d-lg-flex">

                <div className="mb-3" style={{ flexBasis: '30%' }}>
                    <img src="./multimedia/ugtBlackBgLogo.jpg" className='mb-3' alt=" UrbanGraphTees logo" width={"100px"} />
                    <AboutUs />
                </div>


                <div className="col d-none d-lg-flex gap-4">
                    <div className="col">
                        <h5>Quick Actions</h5>
                        <div className="d-flex flex-column">
                            <Link to="/About" className="text-decoration-none text-light mb-1">About</Link>
                            <Link to="/Contact" className="text-decoration-none text-light mb-1">Contact</Link>
                            <Link to="/Size_guard" className="text-decoration-none text-light mb-1">Size Guide</Link>
                            <Link to="/Blog" className="text-decoration-none text-light mb-1">Blog</Link>
                            <Link to="/FAQs" className="text-decoration-none text-light mb-1">FAQs</Link>
                            <Link to="/Delivery-policy" className="text-decoration-none text-light mb-1">Delivery & Shipping Policy</Link>
                            <Link to="/Terms" className="text-decoration-none text-light mb-1">Terms & Conditions</Link>
                            <Link to="/Privacy" className="text-decoration-none text-light mb-1">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="col">
                        <h5>Categories</h5>
                        <div className="d-flex flex-column">
                            <Link to="/shop?category=T-Shirts" className="text-decoration-none text-light mb-1">T-shirts</Link>
                            <Link to="/shop?category=Joggers" className="text-decoration-none text-light mb-1">Joggers</Link>
                            <Link to="/shop?category=Hoodies" className="text-decoration-none text-light mb-1">Hoodies</Link>
                            <Link to="/shop?category=Hats" className="text-decoration-none text-light mb-1">Hats</Link>
                            <Link to="/shop?category=Shirts" className="text-decoration-none text-light mb-1">Shirts</Link>
                            <Link to="/shop?category=Footwear" className="text-decoration-none text-light mb-1">Slides</Link>
                        </div>
                    </div>
                    <div className="col">
                        <h5>Contact</h5>
                        <div className="d-flex flex-column">
                            <a href="mailto:urbangraphees@gmail.com" className='text-decoration-none text-light mb-1'>urbangraphtees@gmail.com</a>
                            <a href="tel:+2349037900500" className='text-light mb-1'>(+234) 903 790 0500</a>
                            <p>Surulere, Lagos State, Nigeria</p>
                            <div className="d-flex gap-3">
                                <a href="http://wa.me/2349037900500" className='text-light fs-4'><i className="fa-brands fa-whatsapp"></i></a>
                                <a href="https://www.instagram.com/urbangraphtees_thebrand" className='fs-4 text-light'><i className="fa-brands fa-instagram"></i></a>
                                <a href="mailto:urbangraphtees@gmail.com" className='text-light fs-4'><i className="fa-regular fa-envelope"></i></a>
                            </div>

                            {/* Newsletter desktop form */}
                            <div className='mt-3'>
                                <h6>Subscribe to our Newsletter</h6>
                                <form onSubmit={handleSubcribe} className="d-flex gap-3">
                                    <div className='input-group'>
                                        <span className="input-group-text">
                                            <FaEnvelope />
                                        </span>
                                        <input className='form-control' type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='hi@gmail.com' required />
                                    </div>
                                    <button className='btn btn-light' disabled={loading} type="submit">
                                        {loading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </form>
                                <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
                                    Be the first to know about new drops, sales, and exclusive offers.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Mobile Accordion */}
                <div className="accordion d-lg-none" id="footerAccordion">

                    {/* Quick Actions */}
                    <div className="accordion-item bg-black border-light">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed bg-black text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Quick Actions
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#footerAccordion">
                            <div className="accordion-body">
                                <Link to="/About" className="text-decoration-none text-light d-block mb-1">About</Link>
                                <Link to="/Contact" className="text-decoration-none text-light d-block mb-1">Contact</Link>
                                <Link to="/Size_guard" className="text-decoration-none text-light d-block mb-1">Size Guide</Link>
                                <Link to="/Blog" className="text-decoration-none text-light d-block mb-1">Blog</Link>
                                <Link to="/FAQs" className="text-decoration-none text-light d-block mb-1">FAQs</Link>
                                <Link to="/Delivery-policy" className="text-decoration-none text-light d-block mb-1">Delivery & Shipping Policy</Link>
                                <Link to="/Terms" className="text-decoration-none text-light d-block mb-1">Terms & Conditions</Link>
                                <Link to="/Privacy" className="text-decoration-none text-light d-block mb-1">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="accordion-item bg-black border-light">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed bg-black text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Categories
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#footerAccordion">
                            <div className="accordion-body">
                                <Link to="/shop?category=T-Shirts" className="text-decoration-none text-light d-block mb-1">T-shirts</Link>
                                <Link to="/shop?category=Joggers" className="text-decoration-none text-light d-block mb-1">Joggers</Link>
                                <Link to="/shop?category=Hoodies" className="text-decoration-none text-light d-block mb-1">Hoodies</Link>
                                <Link to="/shop?category=Hats" className="text-decoration-none text-light d-block mb-1">Hats</Link>
                                <Link to="/shop?category=Shirts" className="text-decoration-none text-light d-block mb-1">Shirts</Link>
                                <Link to="/shop?category=Footwear" className="text-decoration-none text-light d-block mb-1">Slides</Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="accordion-item bg-black border-light">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed bg-black text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Contact
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#footerAccordion">
                            <div className="accordion-body">
                                <a href="mailto:urbangraphees@gmail.com" className='text-decoration-none text-light d-block mb-1'>urbangraphtees@gmail.com</a>
                                <a href="tel:+2349037900500" className='text-light d-block mb-1'>(+234) 903 790 0500</a>
                                <p className='text-white'>Surulere, Lagos State, Nigeria</p>
                                <div className="d-flex gap-3 mb-3">
                                    <a href="http://wa.me/2349037900500" className='text-light fs-4'><i className="fa-brands fa-whatsapp"></i></a>
                                    <a href="https://www.instagram.com/urbangraphtees_thebrand" className='fs-4 text-light'><i className="fa-brands fa-instagram"></i></a>
                                    <a href="mailto:urbangraphtees@gmail.com" className='text-light fs-4'><i className="fa-regular fa-envelope"></i></a>
                                </div>

                                {/* Mobile Newsletter Form */}
                                <h6>Subscribe to our Newsletter</h6>
                                <form onSubmit={handleSubcribe} className="d-flex flex-column gap-2">
                                    <div className='input-group'>
                                        <span className="input-group-text">
                                            <FaEnvelope />
                                        </span>
                                        <input className='form-control' type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='hi@gmail.com' required />
                                    </div>
                                    <button className='btn btn-light' disabled={loading} type="submit">
                                        {loading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </form>
                                <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
                                    Be the first to know about new drops, sales, and exclusive offers.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <hr className='text-light' />
            <p className='text-center text-light mb-0 pb-2'>&copy; {new Date().getFullYear()} Urbangraphees. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;
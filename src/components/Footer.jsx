import React, { useState } from 'react'
import AboutUs from './AboutUs'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Axios from 'axios'
import { FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';


const Footer = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubcribe = async (e) => {
        e.preventDefault()
        if (!email) return toast.error('Please enter your email')
        try {
            setLoading(true)
            const response = await Axios.post("https://urbangraphtees-be.onrender.com/newsletter/subscribe", { email });
            toast.success(response.data.message || "Subscription successful!")
            dispatch(addNotification('Thank you for subscribing to our newsletter!'))
            setEmail('')
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <footer style={{ backgroundColor: " #000000" }}>
            <div className="footer px-3 mb-0 pt-4">
                <div>
                    <img src="./multimedia/ugtBlackBgLogo.jpg" className='mb-3' alt=" UrbanGraphTees logo" width={"100px"} />
                    <AboutUs />
                </div>

                <div>
                    <h5>Quick Actions</h5>
                    <div className='d-flex flex-column foot-link'>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/About">About</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Contact">Contact</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Size_guard">Size Guide</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Blog">Blog</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/FAQs">FAQs</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Delivery-policy">Delivery & Shipping Policy</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Terms">Terms & Conditions</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/Privacy">Privacy Policy</Link>
                    </div>
                </div>

                <div>
                    <h5>Categories</h5>
                    <div className='d-flex flex-column foot-link'>
                        <Link className="text-decoration-none text-light text-gray"
                            to="/shop?category=T-Shirts">T-shirts</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/shop?category=Joggers">Joggers</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/shop?category=Hoodies">Hoodies</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/shop?category=Hats">Hats</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/shop?category=Shirts">Shirts</Link>
                        <Link className="text-decoration-none text-gray text-light"
                            to="/shop?category=Footwear">Slides</Link>
                    </div>
                </div>

                <div>
                    <h5>Contact</h5>
                    <div className='d-flex flex-column foot-link'>
                        <a href="mailto:urbangraphees@gmail.com" className='text-decoration-none text-light'>urbangraphtees@gmail.com</a>
                        <a href="tel:+2349037900500" className='text-light'>(+234) 903 790 0500</a>
                        <p>Surulere, Lagos State, Nigeria</p>
                        <div className="d-flex gap-4">
                            <a href="http://wa.me/2349037900500" className='text-light fs-4 '><i className="fa-brands fa-whatsapp"></i></a>
                            <a href="https://www.instagram.com/urbangraphtees_thebrand?igsh=aGZyN25jaXk0aHA%3D&utm_source=qr" className=' fs-4 text-light'><i className="fa-brands fa-instagram"></i></a>
                            <a href="mailto:urbangraphtees@gmail.com" className='text-light fs-4 '><i className="fa-regular fa-envelope"></i></a>
                        </div>

                        <div className='mt-3'>
                            <h6>Subscribe to our Newsletter</h6>
                            <form onSubmit={handleSubcribe} className="d-flex justify-content-center align-items-center gap-3">
                                <div className='input-group'>
                                    <span className="input-group-text">
                                        <FaEnvelope />
                                    </span>
                                    <input className='form-control' type="email" name="email" id="" value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='hi@gmail.com' required />
                                </div>
                                <button className='btn btn-light' disabled={loading} type="submit">{loading ? 'Subcribing...' : 'Subscribe'}</button>
                            </form>
                            <p className="text-muted mt-3" style={{ fontSize: '13px' }}>Be the first to know about new drops, sales, and exclusive offers.</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='text-light ' />
            <p className='text-center text-light mb-0 pb-2'>&copy; {new Date().getFullYear()}  Urbangraphees. All Rights Reserved.</p>
            {/* <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item accordion-bg-dark">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer
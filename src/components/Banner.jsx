import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Banner = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="bg-black text-white py-5" style={{ minHeight: '70vh' }}>
                <div className="container">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-6">
                            <h1 className="display-3 fw-bold mb-4">DEFINE YOUR STREET STYLE</h1>
                            <p className="lead mb-4">Premium streetwear collection featuring hoodies, tees, joggers, and more. Express your urban identity.</p>
                            <button className="btn btn-white btn-lg px-4 py-2 border-0" onClick={() => navigate('/shop')}>
                                SHOP NOW
                            </button>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                                    alt="Hero"
                                    className="img-fluid rounded shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        // <div className="banner-img text-white text-center d-flex flex-column align-items-center justify-content-center py-5 ">
        //     <h1 className="fw-bold display-4 text-center">Urbangraphtees</h1>
        //     <p className="lead">Streetwear that Speaks.</p>
        //     <Link to={'/shop'} className="btn btn-light mt-3 px-4">Shop Now</Link>
        // </div>
    )
}

export default Banner
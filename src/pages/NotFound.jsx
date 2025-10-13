import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <div
                className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
                style={{
                    position: "relative",
                    backgroundColor: "#fff", 
                }}
            >
                <img
                    src={'/multimedia/ugtWhiteBgLogo.jpg'}
                    alt="Logo background"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 0.05,
                        width: "50%",
                        zIndex: 0,
                    }}
                />

                <div style={{ zIndex: 1 }}>
                    <h1 className="display-3 fw-bold">404</h1>
                    <p className="lead">Oops!  The page you are looking for does not exist.</p>
                    <Link to="/" className="btn text-light" style={{backgroundColor:"black"}}>
                        Go Back Home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NotFound
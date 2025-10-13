import React from 'react'
import { Link } from 'react-router-dom'

const BackHome = () => {
    return (
        <div>
            <Link to="/" className="btn btn-outline-dark mt-4">
                ← Back to Home
            </Link>
        </div>
    )
}

export default BackHome
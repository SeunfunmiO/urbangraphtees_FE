import React from 'react'
import { useNavigate } from 'react-router-dom'

const OverView = () => {
    const navigate = useNavigate()
  return (
    <div><div className="row">
                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">My Orders</h5>
                                    <p className="card-text">Track your recent orders</p>
                                    <div onClick={() => navigate('/orders')} className="btn text-light bg-black" >
                                        View Orders
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Wishlist</h5>
                                    <p className="card-text">See your saved items</p>
                                    <div onClick={() => navigate('/wishlist')} className="btn btn-secondary text-white">
                                        View Wishlist
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Profile</h5>
                                    <p className="card-text">Manage your details</p>
                                    <div onClick={() => navigate('/settings')} className="btn btn-success">
                                        Edit Profile
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div>
  )
}

export default OverView
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from "../redux/cartSlice";
import { Link, useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify';


const Cart = () => {
    const [loading, setLoading] = useState(false)
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        toast.success(`${item.name} added to cart`)
    }

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item.id))
        toast.success(`${item.name} removed from cart`)

    }

    const handleClearCart = () => {
        dispatch(clearCart())
        toast.success(`Cart cleared!`)

    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className='fw-bold mb-3'>My Cart</h3>
                <button
                    className="btn btn-0 text-danger border-0  "
                    onClick={() => handleClearCart()}
                >
                    Clear Cart
                </button></div>


            <div className='pb-3' style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <p style={{ color: '#6c757d', marginBottom: 0 }}>No items in cart yet...</p>
                    </div>

                ) : (
                    <>
                        <ul className="list-group mb-4">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item flex-wrap gap-2 d-flex justify-content-between align-items-center"
                                >
                                    <div className='d-flex'>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onClick={() => navigate(`/products/${item.id}`)} style={{ width: "60px", marginRight: "10px" }}
                                        />
                                        <div className='d-flex flex-column' >
                                            <div className="d-flex flex-column">
                                                <div>{item.name} </div>
                                                <div className='text-muted'>{item.size} {' '} <span
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '16px',
                                                        height: '16px',
                                                        borderRadius: '50%',
                                                        backgroundColor: item.color,
                                                        border: '1px solid #ccc'
                                                    }}
                                                ></span></div>
                                            </div>
                                            <small className='text-muted'>₦{item.price.toLocaleString()}</small>
                                        </div>
                                    </div>

                                    <div className='d-flex gap-2 '>
                                        <div className='border border-secondary rounded-2'>
                                            <button
                                                className="btn btn-sm btn-0"
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                            >
                                                -
                                            </button>
                                            {item.quantity}
                                            <button
                                                className="btn btn-sm btn-0"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-0 text-danger"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className='mx-3'>Total: ₦{total.toLocaleString()}</p>
                        <Link to={'/checkout'} className='text-decoration-none'>
                            <button
                                className="btn text-white bg-black mx-3 "
                                disabled={loading}
                                onClick={setLoading}
                                style={{
                                    minWidth: '120px', display: 'flex', justifyContent: "center", alignItems: "center", gap: '8px'
                                }}
                            >
                                {loading ? <DotLoader size={18} color="#fff" /> : 'Proceed to Checkout'}
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
export default Cart
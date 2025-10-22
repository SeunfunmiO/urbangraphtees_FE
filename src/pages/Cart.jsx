import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearCart, fetchCart, updateCartItem, removeCartItem } from "../redux/cartSlice";
import { Link, useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify';


const Cart = () => {
    const [loading, setLoading] = useState(false)
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const total = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    // const handleAddToCart = (item) => {
    //     dispatch(addToCart(item))
    //     toast.success(`${item.name} added to cart`)
    // }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        toast.success(`${productId.name} removed from cart`)

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
                                    key={item._id}
                                    className="list-group-item flex-wrap gap-2 d-flex justify-content-between align-items-center"
                                >
                                    <div className='d-flex'>
                                        <img
                                            src={
                                                item.images?.[0]?.url?.startsWith("http")
                                                    ? item.images[0].url
                                                    : item.images?.[0]?.startsWith("http")
                                                        ? item.images[0]
                                                        : `https://urbangraphtees-be.onrender.com/${item.images?.[0]?.url || item.images?.[0] || ""}`
                                            }
                                            alt={item.productId?.name}
                                            onClick={() => navigate(`/products/${item._id}`)} style={{ width: "60px", marginRight: "10px" }}
                                        />
                                        <div className='d-flex flex-column' >
                                            <div className="d-flex flex-column">
                                                <div>{item.productId?.name} </div>
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
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        dispatch(updateCartItem({ productId: item.productId._id, quantity: item.quantity - 1 }))
                                                    } else {
                                                        dispatch(removeCartItem(item.productId._id))
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            {item.quantity}
                                            <button
                                                className="btn btn-sm btn-0"
                                                onClick={() => dispatch(updateCartItem({ productId: item.productId._id, quantity: item.quantity + 1 }))}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-0 text-danger"
                                            onClick={() => handleRemoveFromCart(item.productId?._id || item._id)}
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
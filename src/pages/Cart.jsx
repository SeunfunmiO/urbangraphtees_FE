import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { clearCartLocal, clearCartServer, fetchCart, removeCartItem, removeItemLocal, updateCartItem } from '../redux/cartSlice';
import { BsCart2 } from 'react-icons/bs';
import { fetchNotifications } from '../redux/notificationSlice';


const Cart = () => {
    const [loading, setLoading] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = localStorage.getItem("token")


    
      useEffect(() => {
        dispatch(fetchNotifications());
      }, [dispatch]);


    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleRemoveFromCart = (productId) => {
        if (token) {
            dispatch(removeCartItem(productId))
        } else {
            dispatch(removeItemLocal(productId))
        }
        toast.success(`Removed from cart`)
    }

    const handleClearCart = () => {
        if (token) {
            dispatch(clearCartServer())
        } else {
            dispatch(clearCartLocal())
        }
        toast.success(`Cart cleared!`)

    }

    const handleDecreaseItem = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateCartItem({
                    productId: item.productId?._id || item.productId,
                    quantity: item.quantity - 1,
                })
            );
        } else {
            if (token) {
                dispatch(removeCartItem(item.productId?._id || item.productId));
            } else {
                dispatch(removeItemLocal(item._id));
            }
        }
    };

    const handleIncreaseItem = (item) => {
        dispatch(
            updateCartItem({
                productId: item.productId?._id || item.productId,
                quantity: item.quantity + 1,
            })
        );
    };


    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className='fw-bold mb-3'>My Cart</h3>
                <button
                    className="btn btn-0 text-danger border-0  "
                    onClick={() => handleClearCart()}
                >
                    Clear Cart
                </button>
            </div>

            <div className='pb-3' style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
                {cartItems.length === 0 ? (
                    <div className="text-center my-5 py-5">
                        <BsCart2 size={40} color="lightgray" />
                        <p className="text-muted mt-3">Your cart is currently empty</p>
                        <Link to="/shop" className="btn bg-black text-white mt-3">
                            Start Shopping
                        </Link>
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
                                            alt={item?.name}
                                            onClick={() => navigate(`/products/${item._id}`)} style={{ width: "60px", marginRight: "10px" }}
                                        />
                                        <div className='d-flex flex-column' >
                                            <div className="d-flex flex-column">
                                                <div>{item?.name} </div>
                                                <div className='text-muted'>{item.selectedSize} {' '} {" - "}<span
                                                // style={{
                                                //     display: 'inline-block',
                                                //     width: '16px',
                                                //     height: '16px',
                                                //     borderRadius: '50%',
                                                //     backgroundColor: item.selectedColor,
                                                //     border: '1px solid #ccc'
                                                // }}
                                                >{item.selectedColor}</span></div>
                                            </div>
                                            <small className='text-muted'>₦{item.price.toLocaleString()}</small>
                                        </div>
                                    </div>

                                    <div className='d-flex gap-2 '>
                                        <div className='border border-secondary rounded-2'>
                                            <button
                                                className="btn btn-sm btn-0 border-0"
                                                onClick={() => handleDecreaseItem(item)}
                                            >
                                                -
                                            </button>
                                            {item.quantity}
                                            <button
                                                className="btn btn-sm btn-0 border-0"
                                                onClick={() => handleIncreaseItem(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-0 text-danger border-0"
                                            onClick={() => handleRemoveFromCart(item.productId || item._id)}
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
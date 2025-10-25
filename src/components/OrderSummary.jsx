import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { removeCartItem, updateCartItem } from "../redux/cartSlice";
import { addNotificationLocal, createNotification } from "../redux/notificationSlice";

const OrderSummary = ({ showCheckoutButton = false, onCheckout }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 2000 : 0;
    const total = subtotal - discount + shipping;


    const applyPromo = (e) => {
        e.preventDefault();
        if (promoCode.trim().toLowerCase() === 'WELCOME10') {
            toast.success('Congratulations , 10% OFF 🎉!')
            setDiscount(subtotal * 0.1);
            if (token) {
                dispatch(createNotification({
                    title: 'Promo Applied',
                    message: ' You got 10% OFF your order. Thank you for shopping with Urbangraphtees!',
                    status: true,
                    type: "success"
                }))
                setPromoCode('')
            }
            else {
                dispatch(addNotificationLocal({
                    title: 'Promo Applied',
                    message: ' You got 10% OFF your order. Thank you for shopping with Urbangraphtees!',
                    status: true,
                    type: "success"
                }))
                setPromoCode('')
            }

        } else {
            setDiscount(0)
            toast.error('Invalid promo code!')
        }
    }


    return (
        <div className="card shadow-sm p-3">
            <h5 className="mb-3">Order Summary</h5>
            <div className="list-group-item">
                <ul className="list-group mb-4">
                    {cartItems.map((item) => (
                        <li
                            key={item._id}
                            className="flex-wrap gap-2 d-flex justify-content-between align-items-center"
                        >
                            <div className='d-flex'>
                                <img
                                    src={
                                        item.images?.[0]?.url?.startsWith("http")
                                            ? item.productId.images[0].url
                                            : item.images?.[0]?.startsWith("http")
                                                ? item.productId.images[0]
                                                : `https://urbangraphtees-be.onrender.com/${item.productId.images?.[0]?.url || item.images?.[0] || ""}`
                                    }

                                    alt={item.name}
                                    onClick={() => navigate(`/products/${item._id}`)} style={{ width: "60px", marginRight: "10px" }}
                                />
                                <div className='d-flex flex-column' >
                                    <div className="d-flex flex-column">
                                        <div>{item.name} </div>
                                        <div className='text-muted'>{item.selectedSize} - {item.selectedColor}</div>
                                    </div>
                                    <small className='text-muted'>₦{item.price.toLocaleString()}</small>
                                </div>
                            </div>

                            <div className='d-flex gap-2 mb-3'>
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
                                    onClick={() => dispatch(removeCartItem(item._id))}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>₦{shipping.toLocaleString()}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>₦{total.toLocaleString()}</span>
            </div>

            <div className="mt-3">
                <input type="text"
                    placeholder='Enter promo code'
                    value={promoCode}
                    className="form-control mb-3 text-uppercase"
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn btn-sm btn-outline-dark w-100"
                    disabled={!promoCode}
                    onClick={applyPromo}>Apply Promo</button>
            </div>

            {showCheckoutButton && (
                <button
                    className="btn btn-dark w-100 mt-3"
                    onClick={onCheckout}
                    disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default OrderSummary;

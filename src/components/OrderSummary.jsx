import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { addNotification } from "../redux/notificationSlice";

const OrderSummary = ({ showCheckoutButton = false, onCheckout }) => {
    const { items = [] } = useSelector((state) => state.cart || {});
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // calculate totals
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 2000 : 0;
    const total = subtotal - discount + shipping;


    const applyPromo = (e) => {
        if (promoCode.toLowerCase() === 'WELCOME10'.toLowerCase()) {
            toast.success('Congratulations , 10% OFF 🎉!')
            setDiscount(subtotal * 0.1);
            dispatch(addNotification('Congratulations , You got 10% OFF your order. Thank you for shopping with Urbangraphtees'))
        } else {
            e.preventDefault();
            setDiscount(0)
            toast.error('Invalid promo code!')
        }
    }


    return (
        <div className="card shadow-sm p-3">
            <h5 className="mb-3">Order Summary</h5>
            <div className="list-group-item">
                <ul className="list-group mb-4">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex-wrap gap-2 d-flex justify-content-between align-items-center"
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
                                        <div className='text-muted'>{item.size} - {item.color}</div>
                                    </div>
                                    <small className='text-muted'>₦{item.price.toLocaleString()}</small>
                                </div>
                            </div>

                            <div className='d-flex gap-2 mb-3'>
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
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-sm btn-0 text-danger"
                                    onClick={() => dispatch(removeFromCart(item.id))}
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
                    className="form-control mb-3"
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn btn-sm btn-outline-dark w-100" onClick={applyPromo}>Apply Promo</button>
            </div>

            {showCheckoutButton && (
                <button
                    className="btn btn-dark w-100 mt-3"
                    onClick={onCheckout}
                    disabled={items.length === 0}
                >
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default OrderSummary;

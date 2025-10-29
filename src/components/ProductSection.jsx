import React, { useEffect } from "react";
import { BiHeart, BiHeartCircle } from "react-icons/bi";
import { FaCartArrowDown, FaHeart, FaHeartBroken, FaStar, FaTrophy } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWishlist, addWishlistLocal, fetchWishlist, removeFromWishlistServer, removeWishlistLocal } from "../redux/wishlistSlice";
import { addNotificationLocal, createNotification, fetchNotifications } from "../redux/notificationSlice";


const ProductSection = ({ tag, products }) => {
    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || {})



    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        if (user._id) {
            dispatch(fetchWishlist(user._id))
        }
    }, [dispatch, user?._id])

    const filteredProducts = products.filter((p) => p.tag === tag);
    if (filteredProducts.length === 0) return null;

    const handleWishlist = (item) => {
        const isInWishlist = wishlistItems.some(
            (w) => w?._id?.toString() === item?._id?.toString()
        );
        if (token) {
            if (isInWishlist) {
                dispatch(removeFromWishlistServer({ userId: user?._id, productId: item?._id }));
                toast.warning(`${item.name} removed from wishlist`);
            } else {
                dispatch(addToWishlist({ userId: user?._id, productId: item?._id }));
                toast.success(`${item.name} added to wishlist`);
                dispatch(
                    createNotification({
                        message: `You added ${item.name} - ₦${item.price.toLocaleString()} to your wishlist`,
                        status: true,
                        type: "info",
                    })
                );
            }
        } else {
            if (isInWishlist) {
                dispatch(removeWishlistLocal(item.id));
                toast.warning("Removed from wishlist");
            } else {
                dispatch(addWishlistLocal(item));
                toast.success("Added to wishlist");
                dispatch(
                    addNotificationLocal({
                        message: `You added ${item.name} - ₦${item.price.toLocaleString()} to your wishlist`,
                        status: true,
                        type: "info",
                    })
                );
            }
        }
    };



    return (
        <div>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FF4500" />
                        <stop offset="100%" stopColor="#FF0000" />
                    </linearGradient>

                    <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFF00" />
                        <stop offset="50%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                </defs>
            </svg>
            <div>
                {filteredProducts.map((item) => {
                    const isInWishlist = wishlistItems.some((w) => w && w?._id === item?._id)

                    return (
                        < div key={item?._id} >
                            <div className="card h-100 shadow-sm position-relative" style={{ width: '18rem' }}>
                                <span
                                    className={`badge bg-black/ text-white position-absolute top-0 start-0 m-0 fs-6 d-flex gap-2 align-items-center
                                 ${item.tag === "BEST SELLER" ? "bg-warning" :
                                            item.tag === "NEW" ? "bg-success" :
                                                item.tag === "TRENDING" ? "bg-secondary " : "bg-secondary"}`}
                                    style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                                >
                                    {item.tag === "BEST SELLER" && <FaTrophy fill="white" />}
                                    {item.tag === "NEW" && <HiSparkles color="url(#sparkleGradient)" fill="url(#sparkleGradient)" />}
                                    {item.tag === "TRENDING" && <FaFireFlameCurved color="url(#flameGradient)" fill="url(#flameGradient)" />}
                                    {item.tag}
                                </span>
                                <button
                                    className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleWishlist(item)
                                    }}
                                >
                                    {isInWishlist ? <FaHeart fill="crimson" /> : <BiHeart fill="black" />}
                                </button>
                                <Link className="text-decoration-none" to={`/products/${item._id}`}>
                                    <img
                                        src={
                                            item.images?.[0]?.url?.startsWith("http")
                                                ? item.images[0].url
                                                : item.images?.[0]?.startsWith("http")
                                                    ? item.images[0]
                                                    : `https://urbangraphtees-be.onrender.com/${item.images?.[0]?.url || item.images?.[0] || ""}`
                                        }
                                        alt={item.name}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title text-black">{item.name}</h6>
                                        <div className="d-flex align-items-center mb-2">
                                            <FaStar size={16} fill="gold" className="text-warning" />
                                            <span className="ms-1 small text-muted">4</span>
                                            {/* <span className="ms-1 small text-muted">{item.rating} ({item.reviews})</span> */}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="text-muted mb-0">₦{item.price.toLocaleString()}</p>
                                            <button
                                                className="btn text-black btn-sm border-0 btn-none"
                                            >
                                                <FaCartArrowDown size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>)
                })}
            </div>
        </div >
    );
};

export default ProductSection;

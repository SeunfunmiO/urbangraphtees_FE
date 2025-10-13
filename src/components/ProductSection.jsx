import React from "react";
import { BiHeart, BiHeartCircle } from "react-icons/bi";
import { FaCartArrowDown, FaHeart, FaHeartBroken, FaStar, FaTrophy } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";


const ProductSection = ({ tag, products }) => {
    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wishlist.items)

    const filteredProducts = products.filter((p) => p.tag === tag);
    if (filteredProducts.length === 0) return null;

    const handleWishlist = (item) => {
        const isInWishlist = wishlistItems.some((w) => w.id === item.id)
        if (isInWishlist) {
            dispatch(removeFromWishlist(item.id))
            toast.success(<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaHeartBroken />
                Removed from wishlist
            </div>)
        } else {
            dispatch(addToWishlist(item))
            toast.success(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaHeart />
                    Added to wishlist
                </div>
            )
            dispatch(addNotification(`You added ${item.name} - ${item.price} to your wishlist`))
        }
    }



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
                    const isInWishlist = wishlistItems.some((w) => w && w.id === item.id)

                    return (
                        < div key={item.id} >
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
                                    className={`btn btn-0 border-0 wishlist-btn border-secondary position-absolute top-0 end-0`}
                                    onClick={() => handleWishlist(item)}
                                >
                                    {isInWishlist ? <FaHeart fill="crimson" /> : <BiHeart fill="black" />}
                                </button>
                                <Link className="text-decoration-none" to={`/products/${item.id}`}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title text-black">{item.name}</h6>
                                        <div className="d-flex align-items-center mb-2">
                                            <FaStar size={16} fill="gold" className="text-warning" />
                                            <span className="ms-1 small text-muted">{item.rating} ({item.reviews})</span>
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

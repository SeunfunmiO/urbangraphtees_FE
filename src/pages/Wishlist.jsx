import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeWishlistLocal,
  clearWishlistLocal,
  removeFromWishlistServer,
  clearWishlistServer,
  fetchWishlist,
} from "../redux/wishlistSlice";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    if (user._id) {
      dispatch(fetchWishlist(user._id))
    }
  }, [dispatch, user?._id])

  const handleRemove = (productId) => {
    const wishlistItems = localStorage.getItem('wishlist');
    if (token) {
      dispatch(removeFromWishlistServer({ userId: user?._id, productId }))
      toast.info(`${wishlistItems.name} removed from wishlist`);
    } else {
      dispatch(removeWishlistLocal(productId));
      toast.info(`${wishlistItems.name} removed from wishlist`);
    }
  };

  const handleClear = () => {
    if (token) {
      dispatch(clearWishlistServer(user?._id))
      toast.info("Wishlist cleared");
    } else {
      dispatch(clearWishlistLocal());
      toast.info("Wishlist cleared");
    }
  };

  
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="text-center my-5 py-5">
        <FaHeart size={40} color="lightgray" />
        <p className="text-muted mt-3">Your wishlist is currently empty</p>
        <Link to="/shop" className="btn btn-dark mt-3">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">My Wishlist</h3>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>

      <div className="row g-4">
        {wishlistItems.map((item) => (
          <div
            key={item?._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card border-0 shadow-sm wishlist-card position-relative">
              <div className="wishlist-image-container">
                <img
                  src={
                    item.images?.[0]?.url?.startsWith("http")
                      ? item.images[0].url
                      : item.images?.[0]?.startsWith("http")
                        ? item.images[0]
                        : `https://urbangraphtees-be.onrender.com/${item.images?.[0]?.url || item.images?.[0] || ""}`
                  }
                  alt={item.name}
                  className="card-img-top rounded wishlist-img"
                />
                <button
                  className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemove(item._id)}
                  title="Remove"
                >
                  <FaHeart size={15} color="crimson" />
                </button>
              </div>

              <div className="card-body text-center">
                <h6 className="fw-semibold text-truncate">{item.name}</h6>
                <p className="text-muted mb-2">
                  ₦{item.price?.toLocaleString()}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link to={`/products/${item._id}`} className="btn btn-dark btn-sm px-3">
                    View
                  </Link>
                  <button
                    className="btn btn-outline-dark btn-sm px-3"
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    <FaCartArrowDown size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
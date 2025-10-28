
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { addToWishlist, addWishlistLocal, removeFromWishlistServer, removeWishlistLocal } from "../redux/wishlistSlice";
import { addNotificationLocal, createNotification } from "../redux/notificationSlice";
import { ClipLoader } from "react-spinners";


function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    if (products.length > 0 && !queryParams.get("category")) {
      setSelectedCategory('All')
    }
  }, [products]);

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://urbangraphtees-be.onrender.com/products/product");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Unable to load products");
      }finally{
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);



  useEffect(() => {
    const newCategory = queryParams.get("category") || "All";
    setSelectedCategory(newCategory);
  }, [location.search]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);


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
            type: "success",
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
            type: "success",
          })
        );
      }
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">Shop All Products</h4>

      <div className="mb-4">
        {loading ? (<div className="d-flex h-100 justify-content-center align-items-center my-5">
          <ClipLoader size={30} color="#000" />
        </div>) :
          categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm me-auto border-0 ${selectedCategory === cat
                ? "text-decoration-underline"
                : "text-decoration-none"
                }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
      </div>


      <div className="row">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlistItems.some(
            (w) => w?._id?.toString() === product?._id?.toString()
          );
          return (
            <div className="col-md-4 mb-4" key={product?._id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={
                    product.images?.[0]?.url?.startsWith("http")
                      ? product.images[0].url
                      : product.images?.[0]?.startsWith("http")
                        ? product.images[0]
                        : `https://urbangraphtees-be.onrender.com/${product.images?.[0]?.url || product.images?.[0] || ""}`
                  }
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    cursor: "pointer",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onClick={() => navigate(`/products/${product?._id}`)}
                />
                <button
                  className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2"
                  onClick={() => {
                    handleWishlist(product)
                  }}
                >
                  {isInWishlist ? <FaHeart fill="crimson" /> : <BiHeart fill="black" />}
                </button>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    ₦{product.price?.toLocaleString()}
                  </p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-0 border-0"
                      onClick={() => navigate(`/products/${product?._id}`)}
                    >
                      View Details
                    </button>
                    <FaArrowRightLong />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
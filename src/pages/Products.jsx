// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import productsData from "../data/ProductsData";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
// import { BiHeart } from "react-icons/bi";
// import { FaHeart } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { addNotification } from "../redux/notificationSlice";

// function Products() {
//   const navigate = useNavigate();
//   const location = useLocation()
//   const dispatch = useDispatch()
//   const wishlistItems = useSelector((state) => state.wishlist.items)
//    const user = useSelector((state) => state.auth.user)

//   const queryParams = new URLSearchParams(location.search)
//   const intialCategory = queryParams.get('category') || "All"
//   const [selectedCategory, setSelectedCategory] = useState(intialCategory)
//   useEffect(() => {
//     const newCategory = queryParams.get('category') || 'All'
//     setSelectedCategory(newCategory)
//   }, [location.search]);

//   const categories = ['All', ...new Set(productsData.map((p) => p.category))]

//   const filteredProducts =
//     selectedCategory === "All"
//       ? productsData
//       : productsData.filter((p) => p.category === selectedCategory);

//   const handleWishlist = (item) => {
//     const userName = user?.userName || user?.fullname?.split(' ')[0] || "User"
//     const isInWishlist = wishlistItems.some((w) => w.id === item.id)
//     if (isInWishlist) {
//       dispatch(removeFromWishlist(item.id))
//       toast.success('Removed from wishlist')
//           dispatch(addNotification({ message: `Hello ${userName}, You added ${item.name} to cart `, status: true, type: 'success' }))
//     } else {
//       dispatch(addToWishlist(item))
//       toast.success('Added to wishlist')
//     }
//   }


//   return (
//     <div className="container py-4">
//       <h4 className="mb-4 fw-bold">Shop All Products</h4>

//       {/* Category Filter */}
//       <div className="mb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`btn btn-sm me-auto border-0 ${selectedCategory === cat ? "text-decoration-underline" : "text-decoration-none"
//               }`}
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="row">
//         {filteredProducts.map((product) => {
//           const isInWishlist = wishlistItems.some((w) => w.id === product.id)
//           return (
//             < div className="col-md-4 mb-4" key={product.id} >
//               <div className="card h-100 shadow-sm position-relative">
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ cursor: "pointer", height: "250px", objectFit: "cover" }}
//                   onClick={() => navigate(`/products/${product.id}`)}
//                 />
//                 <button
//                   className={`btn btn-0 border-0 wishlist-btn border-secondary position-absolute top-0 end-0`}
//                   onClick={() => handleWishlist(product)}
//                 >
//                   {isInWishlist ? <FaHeart fill="crimson" /> : <BiHeart fill="black" />}
//                 </button>
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">₦{product.price.toLocaleString()}</p>
//                   <div className="d-flex align-items-center">
//                     <button
//                       className="btn btn-sm btn-0"
//                       onClick={() => navigate(`/products/${product.id}`)}
//                     >
//                       View Details
//                     </button>
//                     <FaArrowRightLong />
//                   </div>
//                 </div>
//               </div>
//             </div>)
//         })}
//       </div>
//     </div >
//   );
// }

// export default Products;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";
import axios from "axios";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://urbangraphtees-be.onrender.com/products/product");
        setProducts(res.data);        
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Unable to load products");
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
    const userName = user?.userName || user?.fullname?.split(" ")[0] || "User";
    const isInWishlist = wishlistItems.some((w) => w._id === item._id) || wishlistItems.some((w) => w.id === item.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(item._id || item.id));
      toast.success("Removed from wishlist");
      dispatch(
        addNotification({
          message: ` Hello ${userName}, you removed ${item.name} from wishlist.`,
          status: true,
          type: "success",
        })
      );
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">Shop All Products</h4>

      <div className="mb-4">
        {categories.map((cat) => (
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
          const isInWishlist = wishlistItems.some((w) => w._id === product._id);
          return (
            <div className="col-md-4 mb-4" key={product._id}>
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
                  onClick={() => navigate(`/products/${product._id}`)}
                />
                <button
                  className="btn btn-0 border-0 position-absolute top-0 end-0"
                  onClick={() => handleWishlist(product)}
                >
                  {isInWishlist ? (
                    <FaHeart fill="crimson" />
                  ) : (
                    <BiHeart fill="black" />
                  )}
                </button>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    ₦{product.price?.toLocaleString()}
                  </p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-0"
                      onClick={() => navigate(`/products/${product._id}`)}
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
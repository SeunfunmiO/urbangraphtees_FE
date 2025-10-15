import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import productsData from "../data/ProductsData";
import { FaCartArrowDown, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../redux/cartSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";
// import axios from 'axios'

function ProductDetailsPage() {
  const { id } = useParams();
  // const [product, setProduct] = useState(null)
  const product = productsData.find((p) => p.id === parseInt(id));
  const dispatch = useDispatch()
  const [recentItem, setrecentItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedSize, setselectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const notifications = useSelector((state) => state.notification.notifications)
  // const [productsData, setProductsData] = useState([])


  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setLoading(true)
  //     try {
  //       const allProducts = await axios.get("https://urbangraphtees-be.onrender.com/products/product")
  //       setProductsData(allProducts.data)

  //       const singleProduct = await axios.get(`https://urbangraphtees-be.onrender.com/products/product${id}`)
  //       setProduct(singleProduct.data)
  //     }
  //     catch (error) {
  //       console.log('Error fetching products:', error);
  //     }
  //     finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProduct()
  // }, [id])




  const animateFlyToCart = (imageEl) => {
    const cartIcon = document.querySelector("#cartIcon");
    if (!imageEl || !cartIcon) return;

    const imgClone = imageEl.cloneNode(true);
    const imgRect = imageEl.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    imgClone.style.position = "fixed";
    imgClone.style.left = imgRect.left + "px";
    imgClone.style.top = imgRect.top + "px";
    imgClone.style.width = imgRect.width + "px";
    imgClone.style.height = imgRect.height + "px";
    imgClone.style.borderRadius = "8px";
    imgClone.style.transition =
      "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    imgClone.style.zIndex = 2000;

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      imgClone.style.left = cartRect.left + "px";
      imgClone.style.top = cartRect.top + "px";
      imgClone.style.width = "30px";
      imgClone.style.height = "30px";
      imgClone.style.opacity = "0.2";
    });

    imgClone.addEventListener("transitionend", () => {
      imgClone.remove();
    });
  };

  const handleLoader = () => {
    setLoading(true);
    setTimeout(() => {
      handleAddToCart(product);
      setLoading(false);
    }, 1500)
  }
  const handleAddToCart = (item) => {
    const userName = user?.userName || user?.fullname?.split(' ')[0] || "User"

    if (!selectedSize || !selectedColor) {
      toast.warning('Please select a size and color before adding to cart')
      return;
    }
   
    dispatch(addToCart({ ...item, size: selectedSize, color: selectedColor }))
    dispatch(addNotification({ message: `Hello ${userName}, You added ${item.name} to cart `, status: true, type: 'success' }))
    setrecentItem(item)
    toast.success(<div>
      {item.name} added to cart
      {recentItem && (
        <button onClick={() => handleUndo(product)} className="border border-0 bg-transparent ms-2"><small className="text-danger">Undo</small></button>
      )}
    </div>)
    
      const imageEl = document.querySelector("#productImage");
      animateFlyToCart(imageEl);
  }

  const handleUndo = (item) => {
    dispatch(decreaseQuantity(item.id))
    setrecentItem(null)
    toast.success('Undone')
  }



  if (!product) return <h6 className="text-center mt-5">Product not found...</h6>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            id="productImage"
            src={product.image}
            alt={product.name}
            className="img-fluid w-50 rounded shadow-sm position-relative"
          />
        </div>

        <div className="prod col-md-6">
          <h6>{product.name}</h6>
          <p className="text-muted">₦{product.price.toLocaleString()}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Product Details:</strong> {product.material}</p>

          <div className="mb-3">
            <strong>Size: </strong>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setselectedSize(size)}
                className={` btn border-0 btn-none btn-sm ${selectedSize === size ? 'text-success fw-bold' : 'text-dark'}`}>
                {size}
              </button>
            ))}
          </div>

          <div className="mb-3">
            <strong>Color: </strong>
            {product.colors.map((color) => (
              <button key={color}
                onClick={() => setSelectedColor(color)}
                className={`btn btn-none btn-sm border-0 ${selectedColor === color ? 'text-success fw-bold' : 'text-dark'} `}>
                {color}
              </button>
            ))}
          </div>

          <button
            id="liveToastBtn"
            type="button"
            disabled={loading}
            className="btn border btn-md border-0 text-light d-flex justify-content-center align-items-center gap-2"
            onClick={() => handleLoader(product)}
            style={{
              backgroundColor: 'black', minWidth: '120px', display: 'flex', justifyContent: "center", alignItems: "center", gap: '8px'
            }}
          >
            {loading ? <ClipLoader size={18} color="#fff" /> : "Add to Cart"}
            <FaCartArrowDown />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h4>Related Products</h4>
        <div className="row">
          {productsData
            .filter((p) => p.category === product.category && p.id !== product.id)
            .map((related) => (
              <div className="col-md-3 mb-3" key={related.id}>
                <Link
                  to={`/products/${related.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100 shadow-sm related-card">
                    <img
                      src={related.image}
                      className="card-img-top"
                      alt={related.name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{related.name}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted mb-0">₦{related.price.toLocaleString()}</p>
                        <button
                          className="btn btn-sm border-0 btn-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(related));
                            toast.success(`${related.name} added to cart 🛒`)
                          }}
                        >
                          <FaCartArrowDown size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

    </div >
  );
}
export default ProductDetailsPage;


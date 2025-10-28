import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCartArrowDown, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader, MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { addItemLocal, addToCart } from "../redux/cartSlice";
import { addNotificationLocal, createNotification } from "../redux/notificationSlice";


function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedSize, setselectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const [productsData, setProductsData] = useState([])


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const allProducts = await axios.get("https://urbangraphtees-be.onrender.com/products/product")
        setProductsData(allProducts.data)

        const singleProduct = await axios.get(`https://urbangraphtees-be.onrender.com/products/product/${id}`)
        setProduct(singleProduct.data)
      }
      catch (error) {
        console.log('Error fetching products:', error);
        toast.error('Error fetching product')
      }
      finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])




  const animateFlyToCart = (imageEl) => {
    const cartIcon = document.querySelector("#cartIcon");
    if (!imageEl || !cartIcon) return;

    const imgClone = imageEl.cloneNode(true);
    const imgRect = imageEl.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();


    const scrollX = window.scrollX || window.pageXOffset;
    // const scrollY = window.scrollY || window.pageYOffset;

    imgClone.style.position = "absolute";
    imgClone.style.right = `${imgRect.right + scrollX}px`;
    // imgClone.style.bottom = `${imgRect.bottom + scrollY}px`;
    imgClone.style.width = `${imgRect.width}px`;
    imgClone.style.height = `${imgRect.height}px`;
    imgClone.style.borderRadius = "8px";
    imgClone.style.transition = "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";
    imgClone.style.zIndex = 2000;
    imgClone.style.pointerEvents = "none";

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      const translateX = cartRect.right + scrollX - (imgRect.right + scrollX);
      // const translateY = cartRect.bottom + scrollY - (imgRect.bottom + scrollY);


      imgClone.style.transform = `translate(${translateX}px scale(0.1)`;
      imgClone.style.opacity = "0.2";
    });

    imgClone.addEventListener("transitionend", () => imgClone.remove());
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
    const token = localStorage.getItem("token")

    if (!selectedSize || !selectedColor) {
      toast.warning('Please select a size and color before adding to cart')
      return;
    }
    if (token) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        images: [{ url: product.images }],
        selectedSize,
        selectedColor,
        quantity: 1
      }))
      dispatch(createNotification({ message: `Hello ${userName}, You added ${item.name} to cart `, status: true, type: 'success' }))
    } else {
      dispatch(addItemLocal({
        productId: product._id,
        name: product.name,
        price: product.price,
        images: [{ url: product.images }],
        selectedSize,
        selectedColor,
        quantity: 1
      }))
      dispatch(addNotificationLocal({ message: `Hello ${userName}, You added ${item.name} to cart `, status: true, type: 'success' }))
    }
    toast.success(`${item.name} added to cart`);

    const imageEl = document.querySelector("#productImage");
    animateFlyToCart(imageEl);
  }


  if (!product) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center my-5">
        <BarLoader size={30} color="#000" />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            id="productImage"
            src={
              product.images?.[0]?.url?.startsWith("http")
                ? product.images[0].url
                : product.images?.[0]?.startsWith("http")
                  ? product.images[0]
                  : `https://urbangraphtees-be.onrender.com/${product.images?.[0]?.url || product.images?.[0] || ""}`
            }
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
            {product.sizes?.map((size) => (
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
            {product.colors?.map((color) => (
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
            disabled={loading || !selectedSize || !selectedColor}
            className="btn border btn-md border-0 text-light d-flex justify-content-center align-items-center gap-2"
            onClick={() => handleLoader(product)}
            style={{
              backgroundColor: 'black', minWidth: '120px', display: 'flex',
              justifyContent: "center", alignItems: "center", gap: '8px', opacity: !selectedColor || !selectedSize ? 0.7 : 1,
              cursor: !selectedColor || !selectedSize ? 'not-allowed' : "pointer"
            }}
          >
            {loading ? <MoonLoader size={18} color="#fff" /> : "Add to Cart"}
            <FaCartArrowDown />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h4>Related Products</h4>
        <div className="row">
          {productsData
            .filter((p) => p.category === product.category && p._id !== product._id)
            .map((related) => (
              <div className="col-md-3 mb-3" key={related._id}>
                <Link
                  to={`/products/${related._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100 shadow-sm related-card">
                    <img
                      src={
                        related.images?.[0]?.url?.startsWith("http")
                          ? related.images[0].url
                          : related.images?.[0]?.startsWith("http")
                            ? related.images[0]
                            : `https://urbangraphtees-be.onrender.com/${product.images?.[0]?.url || product.images?.[0] || ""}`
                      }
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


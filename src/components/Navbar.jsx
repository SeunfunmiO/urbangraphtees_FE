import { BiBell, BiMenuAltLeft, BiSearch, BiShoppingBag, BiUser } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../redux/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { BarLoader } from 'react-spinners';



const Navbar = () => {
  const navigate = useNavigate()
  const cartCount = useSelector((state) => state.cart.cartItems)
  const wishlistCount = useSelector((state) => state.wishlist.items)
  const notificationsCount = useSelector((state) => state.notification.unreadCount)
  const { token } = useSelector((state) => state.auth)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://urbangraphtees-be.onrender.com/products/product");
        setProducts(res.data);

      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Unable to load products");
      } finally {
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleUser = () => {
    if (token) {
      navigate('/dashboard')
    } else {
      navigate('/signin')
    }
  }

  const cursor = document.createElement("div");
  cursor.classList.add("cursor-ball");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  return (
    <nav className="glass-nav/ navbar bg-white containe/r navbar-expand-lg sticky-top mx-auto mt-3 px-4 py-2 rounded/-pill d-flex justify-content-between align-items-center">
      <div className="navReverse">
        <a href="/" className="fw-bold fs-6 navbar-brand  text-white/ text-uppercase">
          UrbanGraphTees
        </a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className='border-0'><BiMenuAltLeft className='border-0' /></span>
        </button>
      </div>

      <div className="offcanvas offcanvas-start " tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
          <button type="button" className="btn-close border-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav d-flex gap-3 justify-content-center flex-grow-1 pe-3">
            <li className="nav-item" data-bs-dismiss="offcanvas"> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-black text-decoration-none active-link" : "navRoute text-decoration-none text-black"
            } aria-current="page" to="/" end >Home</NavLink></li>
            <hr className="divider" />
            <li className="nav-item dropdown"> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none dropdown-toggle active-link" : "navRoute text-decoration-none text-black dropdown-toggle"
            } role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/Shop">Shop</NavLink>
              <ul className="dropdown-menu">
                <li data-bs-dismiss="offcanvas">
                  <NavLink className="dropdown-item" to="/shop?category=T-Shirts">
                    T-Shirts
                  </NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink className="dropdown-item" to="/shop?category=Joggers">
                    Joggers
                  </NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink className="dropdown-item" to="/shop?category=Hoodies">
                    Hoodies
                  </NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink className="dropdown-item" to="/shop?category=Shirts">
                    Shirts
                  </NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink className="dropdown-item" to="/shop?category=Hats">
                    Hats
                  </NavLink>
                </li>
              </ul>
            </li>
            <hr className="divider" />
            <li className="nav-item " data-bs-dismiss="offcanvas"> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none active-link" : "navRoute text-decoration-none text-black"
            } to="/About">About</NavLink></li>
            <hr className='divider' />
            <li className="nav-item" data-bs-dismiss="offcanvas"> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none active-link text-black" : "navRoute text-decoration-none text-black"
            } to="/Contact">Contact</NavLink></li>
            <hr className="divider" />
            <li className="nav-item  appear" data-bs-dismiss="offcanvas" style={{ display: "none" }}> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none active-link  text-black" : "navRoute text-decoration-none text-black"
            } to="/FAQs">Frequently Asked Questions</NavLink></li>
            <hr className="divider" />
            <li className="nav-item  appear" data-bs-dismiss="offcanvas" style={{ display: "none" }}> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none active-link text-black" : "navRoute text-decoration-none text-black"
            } to="/Delivery-policy">Delivery & Shipping Policy</NavLink></li>
            <hr className="divider" />
            <li className="nav-item  appear" data-bs-dismiss="offcanvas" style={{ display: "none" }}> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none active-link text-black" : "navRoute text-decoration-none text-black"
            } to="/Terms">Terms and Conditions</NavLink></li>
            <hr className="divider" />
            <li className="nav-item  appear" data-bs-dismiss="offcanvas" style={{ display: "none" }}> <NavLink className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none  active-link text-black" : "navRoute text-decoration-none text-black"
            } to="/Privacy">Privacy Policy</NavLink></li>
            <hr className="divider" />
            <li className="nav-item  appear" data-bs-dismiss="offcanvas" style={{ display: "none" }}> <NavLink onClick={() => logout()} className={({ isActive }) =>
              isActive ? "navRoute text-decoration-none  text-danger" : "navRoute text-decoration-none text-danger"
            } >Log Out</NavLink></li>
          </ul>

        </div>
      </div>
      <div className="d-flex navIcon gap-4 justify-content-center align-items-center">
        <button
          className="btn text-black border-0 p-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSearch"
          aria-controls="offcanvasSearch"
        >
          <BiSearch />
        </button>
        {/* <NavLink className='text-decoration-none text-black' title='Search' to="/Search"><BiSearch /></NavLink> */}
        <button type="button" className="btn badgeBtn  position-relative">
          <NavLink className='text-decoration-none text-black' title='Wishlist' to="/Wishlist"><i className="fa-regular fa-heart"></i></NavLink>
          <span className="position-absolute text-center top-0 start-100 translate-middle badge rounded-pill bg-light text-black">
            {wishlistCount.length}
            <span className="visually-hidden">Wishlist Items</span>
          </span>
        </button>
        <button type="button" className="btn badgeBtn  position-relative">
          <NavLink className='text-decoration-none text-black' title='Notification' to="/notifications"><BiBell /></NavLink>
          <span className="position-absolute text-center top-0 start-100 translate-middle badge rounded-pill bg-light text-black">
            {notificationsCount}
            <span className="visually-hidden">Notification</span>
          </span>
        </button>
        <BiUser title='Profile' style={{ cursor: 'pointer' }} onClick={handleUser} />
        <button type="button" className="btn badgeBtn  position-relative">
          <NavLink id='cartIcon' className='text-decoration-none text-black' title='Cart' to="/Cart"><BiShoppingBag /></NavLink>
          <span className="position-absolute text-center top-0 start-100 translate-middle badge rounded-pill bg-light text-black">
            {cartCount.length}
            <span className="visually-hidden">Cart Items</span>
          </span>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasSearch"
        aria-labelledby="offcanvasSearchLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasSearchLabel">Search Products</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />

          {loading ? <div className="d-flex justify-content-center align-items-center">
            <BarLoader />
          </div> : filteredProducts.length > 0 ? (
            <div className="list-group">
              {filteredProducts.map((product) => (
                <div key={product._id} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        product.images?.[0]?.url || product.images
                      }
                      alt={product.name}
                      className="me-3 rounded"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="mb-0">{product.name}</h6>
                      <small className="text-muted">₦{product.price}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No products found.</p>
          )}
        </div></div>
    </nav >

  )
}


export default Navbar
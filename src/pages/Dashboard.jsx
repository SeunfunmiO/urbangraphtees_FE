import React, { useState, useMemo } from "react";
import {
  FaUser, FaBox, FaHeart, FaShoppingCart, FaCog, FaSignOutAlt,
  FaHome,
  FaUserCheck,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * PROPS (adapt to your app):
 * - user: { id, username, email, phone, avatarUrl, addresses: [{label, line1, city, country}] }
 * - cart: [{ id, title, price, qty, image }]
 * - wishlist: [{ id, title, price, image }]
 * - orders: [{ id, date, status, total, items: [...] }]
 * - onLogout: () => void
 *
 * For now this page uses internal mock data if props aren’t provided.
 */
  // const wishlistCount = useSelector((state) => state.wishlist.items)


const Dashboard = ({
  user: userProp,
  cart: cartProp,
  wishlist: wishlistProp,
  orders: ordersProp,
  onLogout,
}) => {
  const navigate = useNavigate();

  // -------- Mock data fallback (remove when you plug MongoDB) ----------
  const user = userProp || {
    id: "u1",
    username: "Seun",
    email: "seun@urbangraphtees.com",
    phone: "+234 902 000 0000",
    avatarUrl: "",
    addresses: [
      { label: "Default", line1: "12 Urban Avenue", city: "Lagos", country: "Nigeria" },
    ],
  };

  const [cart, setCart] = useState(
    cartProp || [
      { id: 101, title: "Black Luxe Tee", price: 45000, qty: 1, image: "/multimedia/ugtTshirt.jpg" },
      { id: 102, title: "Minimalist Hoodie", price: 85000, qty: 1, image: "/multimedia/acidTee.jpeg" },
    ]
  );

  const [wishlist, setWishlist] = useState(
    wishlistProp || [
      { id: 201, title: "White Classic Tee", price: 40000, image: "https://via.placeholder.com/120x120?text=Classic+Tee" },
      { id: 202, title: "Urban Cap", price: 25000, image: "https://via.placeholder.com/120x120?text=Cap" },
    ]
  );

  const [orders] = useState(
    ordersProp || [
      { id: "ORD-00912", date: "2025-08-02", status: "Delivered", total: 125000, items: 3 },
      { id: "ORD-00937", date: "2025-08-18", status: "Processing", total: 85000, items: 1 },
    ]
  );

  // -------- Tabs ----------
  const [active, setActive] = useState("overview"); // overview | orders | wishlist | cart | settings
  const currency = (n) =>
    n.toLocaleString("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 });

  const cartTotal = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cart]
  );

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/"); // redirect home
  };

  // -------- Actions (front-end only for now) ----------
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const removeFromWishlist = (id) => setWishlist((prev) => prev.filter((it) => it.id !== id));

  // -------- Sections ----------
  const Overview = () => (
    <div>
      <h3 className="mb-3">Welcome, {user.username} 👋</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-3"><FaBox /></div>
                <div>
                  <div className="fw-bold">Orders</div>
                  <div className="text-muted">{orders.length} total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-3"><FaHeart /></div>
                <div>
                  <div className="fw-bold">Wishlist</div>
                  <div className="text-muted">{wishlist.length} items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-3"><FaShoppingCart /></div>
                <div>
                  <div className="fw-bold">Cart Total</div>
                  <div className="text-muted">{currency(cartTotal)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="mt-4">Quick Links</h5>
      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-dark" onClick={() => setActive("orders")}>Track Orders</button>
        <button className="btn btn-outline-dark" onClick={() => setActive("wishlist")}>View Wishlist</button>
        <button className="btn btn-outline-dark" onClick={() => setActive("cart")}>Go to Cart</button>
        <button className="btn btn-outline-dark" onClick={() => setActive("settings")}>Account Settings</button>
      </div>
    </div>
  );

  const Orders = () => (
    <div>
      <h3 className="mb-3">My Orders</h3>
      {orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Items</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="fw-semibold">{o.id}</td>
                  <td>{o.date}</td>
                  <td>
                    <span className={`badge ${o.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{currency(o.total)}</td>
                  <td>{o.items}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-dark">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const Wishlist = () => (
    <div>
      <h3 className="mb-3">My Wishlist</h3>
      {wishlist.length === 0 ? (
        <p className="text-muted">No items saved yet.</p>
      ) : (
        <div className="row g-3">
          {wishlist.map((w) => (
            <div className="col-12 col-sm-6 col-lg-4" key={w.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img src={w.image} className="card-img-top" alt={w.title} />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-semibold mb-1">{w.title}</h6>
                  <div className="text-muted mb-3">{currency(w.price)}</div>
                  <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-dark btn-sm">Add to Cart</button>
                    <button className="btn btn-outline-dark btn-sm" onClick={() => removeFromWishlist(w.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const CartSection = () => (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0">My Cart</h3>
        <Link to="/cart" className="btn btn-outline-dark btn-sm">Open Cart Page</Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="list-group mb-3">
            {cart.map((item) => (
              <div key={item.id} className="list-group-item">
                <div className="d-flex align-items-center gap-3">
                  <img src={item.image} alt={item.title} width="70" height="70" style={{ objectFit: "cover" }} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="text-muted">{currency(item.price)}</div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="px-2">{item.qty}</span>
                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateQty(item.id, +1)}>+</button>
                      <button className="btn btn-sm btn-link text-danger ms-3" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="fw-semibold">{currency(item.price * item.qty)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="fw-semibold">Subtotal</div>
            <div className="fw-bold fs-5">{currency(cartTotal)}</div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <Link to="/checkout" className="btn btn-dark">Proceed to Checkout</Link>
            <Link to="/shop" className="btn btn-outline-dark">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );

  const AccountSettings = () => {
    const [form, setForm] = useState({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      line1: user.addresses?.[0]?.line1 || "",
      city: user.addresses?.[0]?.city || "",
      country: user.addresses?.[0]?.country || "",
    });
    const [profileImage, setprofileImage] = useState(null)
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setprofileImage(URL.createObjectURL(e.target.files[0]))
      }
    }
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

  
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSave = async (e) => {
      e.preventDefault();
      setSaving(true);
      setMsg("");
      // TODO: call your API to save in MongoDB
      setTimeout(() => {
        setSaving(false);
        toast.success('Profile updated')
        // setMsg("Profile updated ✅ (hook this to your real API)");
      }, 1500);
    };

    return (
      <div>
        <h3 className="mb-3">Account Settings</h3>
        <div className="text-center mb-4">
          <img src={profileImage || 'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=184&h=183&c=7&r=0&o=7&pid=1.7&rm=3'} className="rounded-circle mb-3" alt="Profile" width={150} height={150} />
          <div>
            <label htmlFor="" className="btn text-light mb-3" style={{ backgroundColor: "black" }}>Upload New Profile Picture
              <input className='d-none' type="file" accept="image/*" onClick={handleImageChange} />
            </label>
          </div>
        </div>



        <form className="row g-3" onSubmit={onSave}>
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input name="username" className="form-control" value={form.username} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-control" value={form.phone} onChange={onChange} />
          </div>

          <div className="col-12">
            <hr />
            <h6 className="mb-2">Default Shipping Address</h6>
          </div>
          <div className="col-12">
            <label className="form-label">Address Line</label>
            <input name="line1" className="form-control" value={form.line1} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input name="city" className="form-control" value={form.city} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input name="country" className="form-control" value={form.country} onChange={onChange} />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-dark" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" className="btn btn-outline-dark">Change Password</button>
          </div>

          {msg && <p className="text-success mt-2">{msg}</p>}
        </form>

      </div>
    );
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 col-lg-2 bg-black text-light py-4 vh-100" >
          <div className="px-3 mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48, overflow: "hidden" }}
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <FaUserCheck className="text-dark" />
                )}
              </div>
              <div>
                <div className="small text-muted ">Signed in as</div>
                <div className="fw-semibold">{user.username}</div>
              </div>
            </div>
          </div>

          <nav className="nav flex-column px-2">
            <button
              className={`btn text-start nav-link text-light ${active === "overview" ? "active bg-dark" : ""}`}
              onClick={() => setActive("overview")}
            >
              <FaUser className="me-2" /> Overview
            </button>
            <button
              className={`btn text-start nav-link text-light ${active === "orders" ? "active bg-dark" : ""}`}
              onClick={() => setActive("orders")}
            >
              <FaBox className="me-2" /> Orders
            </button>
            <button
              className={`btn text-start nav-link text-light ${active === "wishlist" ? "active bg-dark" : ""}`}
              onClick={() => setActive("wishlist")}
            >
              <FaHeart className="me-2" /> Wishlist
            </button>
            <button
              className={`btn text-start nav-link text-light ${active === "cart" ? "active bg-dark" : ""}`}
              onClick={() => setActive("cart")}
            >
              <FaShoppingCart className="me-2" /> Cart
            </button>
            <button
              className={`btn text-start nav-link text-light ${active === "settings" ? "active bg-dark" : ""}`}
              onClick={() => setActive("settings")}
            >
              <FaCog className="me-2" /> Account Settings
            </button>

            <hr className="border-secondary my-3" />

            <button className="btn btn-outline-light text-start" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="col-12 col-md-9 col-lg-10 p-4">
          {active === "overview" && <Overview />}
          {active === "orders" && <Orders />}
          {active === "wishlist" && <Wishlist />}
          {active === "cart" && <CartSection />}
          {active === "settings" && <AccountSettings />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

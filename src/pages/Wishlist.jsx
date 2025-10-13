import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";


const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [toastMsg, settoastMsg] = useState('')
  const [textColor, settextColor] = useState('text-success')

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item))
    settoastMsg(`✔ Removed from wishlist`)
    settextColor('text-success')
    showToast()
  }
  const handleClearWishlist = () => {
    dispatch(clearWishlist())
    settoastMsg('✔ Wishlist cleared')
    settextColor('text-success')
    showToast()
  }

  const showToast = () => {
    const toastEl = document.getElementById('cartToast')
    if (toastEl) {
      const bsToast = new window.bootstrap.Toast(toastEl)
      bsToast.show()
    }
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return <div className='mx-4 mt-5' style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ color: '#6c757d', marginBottom: 0 }}>Your wishlist is empty ...</p>
      </div>
    </div>;
  }
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h2>My Wishlist</h2>
        <button
          className="mb-3 border-0 bg-transparent text-danger fw-5"
          onClick={() => handleClearWishlist()}
        >
          Clear Wishlist
        </button>
      </div>
      <div className="row">
        {wishlistItems.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-3">
            <div className="card">
              <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '250px' }} />
              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-muted mb-0">₦{item.price.toLocaleString()}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-sm border-0 text-danger"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                  <Link className="text-decoration-none text-black" to={`/products/${item.id}`}>
                    <button
                      className="btn text-black btn-sm border-0 btn-none"
                    >
                      <FaCartArrowDown size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="toast-container position-fixed bottom-0 end-0 p-3" >
        <div id="cartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex align-items-center justify-content-center">
            <div className={`toast-body ${textColor}`}>{toastMsg}</div>
            <div className="mx-3/">
              {/* {recentItem && (
                <button onClick={() => handleUndo(product)} className="border border-0 bg-transparent"><small className="text-danger">Undo</small></button>
              )} */}
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

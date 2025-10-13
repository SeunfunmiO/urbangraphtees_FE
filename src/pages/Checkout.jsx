import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from 'yup'
import OrderSummary from "../components/OrderSummary";
import { DotLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, updateOrderStatus } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";


const Checkout = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: false
    },
    onSubmit: (values) => {
      console.log(values);

    },
    validationSchema: yup.object({
      firstName: yup.string().required('Firstname is required!'),
      lastName: yup.string().required('lastname is required!'),
      email: yup.string().required('Email is required!'),
      phone: yup.string().required('Phone number is required!'),
      address: yup.string().required('Address is required!'),
      city: yup.string().required('City is required!'),
      country: yup.boolean()
        .oneOf([true], "You must select your country"),
    })
  })
  console.log(formik.values);
  console.log(formik.errors);
  console.log(formik.touched);


  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setloading] = useState(false)


  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return;
    }
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    dispatch(placeOrder({ cartItems, total }));
    setloading(true)
    // 🚀 Simulate payment (replace with real gateway)
    setTimeout(() => {
      const lastOrderId = `ORD${String(cartItems.length).padStart(5, "0")}`;


      dispatch(updateOrderStatus({ id: lastOrderId, status: "Paid" }));

      dispatch(clearCart());

      toast.success(" Payment successful! Check your Dashboard → Orders")
      setloading(false);

    }, 2000);
  };


  return (
    <div className="container py-5">
      <h5 className="text-center" style={{ fontFamily: 'sans-serif', fontSize: '18px' }}>URBANGRAPHTEES</h5>
      <h2 className="mb-4 text-center " style={{ fontSize: '40px' }}>Checkout</h2>
      <p className="text-muted text-center">Complete your purchase securely using card,Bank transfer or USSD</p>
      <div className="row">
        {/* Billing & Shipping Form */}
        <div className="col-md-7" style={{ fontSize: '14px' }}>
          <form onSubmit={handleCheckout}>
            <h4 className="mb-3">Billing Information</h4>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Firstname</label>
                <input type="text" name="firstName"
                 className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'border border-danger form-control' : 'form-control'} `} 
                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.firstName ? <small className='text-danger'>{formik.errors.firstName}</small> : ''}
              </div>
              <div className="col-md-6">
                <label className="form-label">Lastname</label>
                <input type="text" name="lastName"
                className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'border border-danger form-control' : 'form-control'} `} 
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.lastName ? <small className='text-danger'>{formik.errors.lastName}</small> : ''}
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input type="email" name="email" 
                className={`form-control ${formik.touched.email && formik.errors.email ? 'border border-danger form-control' : 'form-control'} `} 
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''}
              </div>
              <div className="col-12">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone"
                className={`form-control ${formik.touched.phone && formik.errors.phone ? 'border border-danger form-control' : 'form-control'} `}
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.phone ? <small className='text-danger'>{formik.errors.phone}</small> : ''}
              </div>
              <div className="col-12">
                <label className="form-label">Birthday</label>
                <input type="text" className="form-control" placeholder="🎉 We'll send you a special gift" />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input type="text" name="address"
                 className={`form-control ${formik.touched.address && formik.errors.address ? 'border border-danger form-control' : 'form-control'} `}
                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.address ? <small className='text-danger'>{formik.errors.address}</small> : ''}
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input type="text" name="city" 
               className={`form-control ${formik.touched.city && formik.errors.city ? 'border border-danger form-control' : 'form-control'} `} 
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.city ? <small className='text-danger'>{formik.errors.city}</small> : ''}
              </div>
              <div className="col-md-3">
                <label className="form-label">Zip (optional)</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Country</label>
                <select className="form-select" name="country" onChange={formik.handleChange} onBlur={formik.handleBlur} >
                  <option value="">Choose...</option>
                  <option>Nigeria</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
                {formik.touched.country ? <small className='text-danger'>{formik.errors.country}</small> : ''}
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment Method</h4>
            <div className="form-check">
              <input
                className="form-check-input "
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input "
                type="radio"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Bank Transfer</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input "
                type="radio"
                value="ussd"
                checked={paymentMethod === "ussd"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">USSD</label>
            </div>

            <button type="submit" disabled={loading} onClick={handleCheckout} className="btn my-4 w-100 text-light" style={{ backgroundColor: 'black' }}>
              {loading ? <DotLoader size={18} color="#fff" /> : "PAY NOW"}
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

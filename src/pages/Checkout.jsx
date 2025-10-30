// import { useFormik } from "formik";
// import React, { useState } from "react";
// import * as yup from 'yup'
// import OrderSummary from "../components/OrderSummary";
// import { DotLoader } from "react-spinners";
// import { useSelector, useDispatch } from "react-redux";
// import { placeOrder, updateOrderStatus } from "../redux/orderSlice";
// import { toast } from "react-toastify";
// import { clearCartServer } from "../redux/cartSlice";


// const Checkout = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       address: '',
//       city: '',
//       country: false
//     },
//     onSubmit: (values) => {
//       console.log(values);

//     },
//     validationSchema: yup.object({
//       firstName: yup.string().required('Firstname is required!'),
//       lastName: yup.string().required('lastname is required!'),
//       email: yup.string().required('Email is required!'),
//       phone: yup.string().required('Phone number is required!'),
//       address: yup.string().required('Address is required!'),
//       city: yup.string().required('City is required!'),
//       country: yup.boolean()
//         .oneOf([true], "You must select your country"),
//     })
//   })

//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [loading, setloading] = useState(false)


//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       toast.error('Cart is empty')
//       return;
//     }
//     const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     dispatch(placeOrder({ cartItems, total }));
//     setloading(true)
//     // 🚀 Simulate payment (replace with real gateway)
//     setTimeout(() => {
//       const lastOrderId = `ORD${String(cartItems.length).padStart(5, "0")}`;


//       dispatch(updateOrderStatus({ id: lastOrderId, status: "Paid" }));

//       dispatch(clearCartServer());

//       toast.success(" Payment successful! Check your Dashboard → Orders")
//       setloading(false);

//     }, 2000);
//   };


//   return (
//     <div className="container py-5">
//       <h5 className="text-center" style={{ fontFamily: 'sans-serif', fontSize: '18px' }}>URBANGRAPHTEES</h5>
//       <h2 className="mb-4 text-center " style={{ fontSize: '40px' }}>Checkout</h2>
//       <p className="text-muted text-center">Complete your purchase securely using card,Bank transfer or USSD</p>
//       <div className="row">
//         {/* Billing & Shipping Form */}
//         <div className="col-md-7" style={{ fontSize: '14px' }}>
//           <form onSubmit={handleCheckout}>
//             <h4 className="mb-3">Billing Information</h4>

//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">Firstname</label>
//                 <input type="text" name="firstName"
//                  className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'border border-danger form-control' : 'form-control'} `} 
//                  onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.firstName ? <small className='text-danger'>{formik.errors.firstName}</small> : ''}
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Lastname</label>
//                 <input type="text" name="lastName"
//                 className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'border border-danger form-control' : 'form-control'} `} 
//                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.lastName ? <small className='text-danger'>{formik.errors.lastName}</small> : ''}
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Email</label>
//                 <input type="email" name="email" 
//                 className={`form-control ${formik.touched.email && formik.errors.email ? 'border border-danger form-control' : 'form-control'} `} 
//                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''}
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Phone</label>
//                 <input type="tel" name="phone"
//                 className={`form-control ${formik.touched.phone && formik.errors.phone ? 'border border-danger form-control' : 'form-control'} `}
//                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.phone ? <small className='text-danger'>{formik.errors.phone}</small> : ''}
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Birthday</label>
//                 <input type="text" className="form-control" placeholder="🎉 We'll send you a special gift" />
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Address</label>
//                 <input type="text" name="address"
//                  className={`form-control ${formik.touched.address && formik.errors.address ? 'border border-danger form-control' : 'form-control'} `}
//                  onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.address ? <small className='text-danger'>{formik.errors.address}</small> : ''}
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input type="text" name="city" 
//                className={`form-control ${formik.touched.city && formik.errors.city ? 'border border-danger form-control' : 'form-control'} `} 
//                 onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 {formik.touched.city ? <small className='text-danger'>{formik.errors.city}</small> : ''}
//               </div>
//               <div className="col-md-3">
//                 <label className="form-label">Zip (optional)</label>
//                 <input type="text" className="form-control" />
//               </div>
//               <div className="col-md-3">
//                 <label className="form-label">Country</label>
//                 <select className="form-select" name="country" onChange={formik.handleChange} onBlur={formik.handleBlur} >
//                   <option value="">Choose...</option>
//                   <option>Nigeria</option>
//                   <option>United States</option>
//                   <option>United Kingdom</option>
//                   <option>Canada</option>
//                 </select>
//                 {formik.touched.country ? <small className='text-danger'>{formik.errors.country}</small> : ''}
//               </div>
//             </div>

//             <hr className="my-4" />

//             <h4 className="mb-3">Payment Method</h4>
//             <div className="form-check">
//               <input
//                 className="form-check-input "
//                 type="radio"
//                 value="card"
//                 checked={paymentMethod === "card"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label">Credit/Debit Card</label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 value="paypal"
//                 checked={paymentMethod === "paypal"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label">PayPal</label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input "
//                 type="radio"
//                 value="bank"
//                 checked={paymentMethod === "bank"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label">Bank Transfer</label>
//             </div>

//             <div className="form-check">
//               <input
//                 className="form-check-input "
//                 type="radio"
//                 value="ussd"
//                 checked={paymentMethod === "ussd"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label">USSD</label>
//             </div>

//             <button type="submit" disabled={loading} onClick={handleCheckout} className="btn my-4 w-100 text-light" style={{ backgroundColor: 'black' }}>
//               {loading ? <DotLoader size={18} color="#fff" /> : "PAY NOW"}
//             </button>
//           </form>
//         </div>
//         <div className="col-md-4">
//           <OrderSummary />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/orderSlice";
import { clearCartServer } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import { PaystackButton } from "react-paystack"
import OrderSummary from "../components/OrderSummary";
import { formatDistanceToNow } from "date-fns";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((data) => setCountries(data.data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.name === selectedCountry);
      setStates(country?.states || []);
    }
  }, [selectedCountry, countries]);


  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry,
          state: selectedState,
        }),
      })
        .then((res) => res.json())
        .then((data) => setCities(data.data || []))
        .catch(console.error);
    }
  }, [selectedCountry, selectedState]);


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      paymentMethod: "card",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email().required("Email is required"),
      phone: yup.string().required("Phone number is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (cartItems.length === 0) return toast.error("Cart is empty");
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const handlePaystackSuccess = async (reference) => {
        const orderData = {
          orderItems: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            sizes: item.sizes || "M",
            colors: item.colors || "Default",
          })),
          shippingAddress: values,
          paymentMethod: "Paystack",
          totalAmount,
          paymentReference: reference.reference,
        };

        try {
          const result = await dispatch(createOrder(orderData));
          setLoading(true);
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(clearCartServer());
            toast.success("Payment successful! Check your Orders page");
            resetForm();
          } else {
            toast.error("Something went wrong while saving your order.");
          }
        } catch (error) {
          toast.error("Error creating order:", error);
        } finally {
          setLoading(false);
        }
      }

      const paystackConfig = {
        reference: new Date().getTime().toString(),
        email: formik.values.email,
        amount: totalAmount * 100,
        publicKey: paystackKey,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phone: formik.values.phone
      }

    },
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">

        <div className="col-md-7">
          <form onSubmit={formik.handleSubmit}>
            <h4 className="mb-3">Billing Information</h4>

            <div className="row g-3">
              {["firstName", "lastName", "email", "phone", "address"].map((field, i) => (
                <div
                  key={field}
                  className={i < 2 ? "col-md-6" : "col-12"}
                >
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    className={`form-control ${formik.touched[field] && formik.errors[field]
                      ? "border-danger"
                      : ""
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[field] && (
                    <small className="text-danger">{formik.errors[field]}</small>
                  )}
                </div>
              ))}


              <div className="col-md-4">
                <label>Country</label>
                <select
                  name="country"
                  className="form-select"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedCountry(e.target.value);
                    setStates([]);
                    setCities([]);
                  }}
                  value={formik.values.country}
                >
                  <option value="">Select Country</option>
                  {countries.map((c, i) => (
                    <option key={i} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-md-4">
                <label>State</label>
                <select
                  className="form-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((s, i) => (
                    <option key={i} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>City</label>
                <select
                  name="city"
                  className="form-select"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                >
                  <option value="">Select City</option>
                  {cities.map((ct, i) => (
                    <option key={i} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment Method</h4>


            {["card", "bank transfer", "ussd", "paypal"].map((method) => (
              <div className="form-check" key={method}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formik.values.paymentMethod === method}
                  onChange={formik.handleChange}
                />
                <label className="form-check-label text-capitalize">
                  {method}
                </label>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn bg-black text-white w-100 my-4"
            >
              {loading ? <DotLoader size={20} color="#fff" /> : "Place Order"}
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

// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder } from "../redux/orderSlice";
// import { clearCartServer } from "../redux/cartSlice";
// import { toast } from "react-toastify";
// import { DotLoader } from "react-spinners";
// import { PaystackButton } from "react-paystack";
// import OrderSummary from "../components/OrderSummary";
// import { Navigate, useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate()
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");

//   const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

//   // ✅ Fetch countries and states
//   useEffect(() => {
//     fetch("https://countriesnow.space/api/v0.1/countries/states")
//       .then((res) => res.json())
//       .then((data) => setCountries(data.data || []))
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       const country = countries.find((c) => c.name === selectedCountry);
//       setStates(country?.states || []);
//     }
//   }, [selectedCountry, countries]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           country: selectedCountry,
//           state: selectedState,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => setCities(data.data || []))
//         .catch(console.error);
//     }
//   }, [selectedCountry, selectedState]);

//   // ✅ Formik setup
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       country: "",
//     },
//     validationSchema: yup.object({
//       firstName: yup.string().required("First name is required"),
//       lastName: yup.string().required("Last name is required"),
//       email: yup.string().email().required("Email is required"),
//       phone: yup.string().required("Phone number is required"),
//       address: yup.string().required("Address is required"),
//       city: yup.string().required("City is required"),
//       country: yup.string().required("Country is required"),
//     }),
//     onSubmit: () => { },
//   });

//   // ✅ Calculate total amount
//   const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + item.price * item.quantity,
//     0
//   ) : 0;


//   // ✅ Paystack success handler
//   const handlePaystackSuccess = async (reference) => {
//     setLoading(true);
//     const values = formik.values;

//     const orderData = {
//       orderItems: cartItems.map((item) => ({
//         product: item._id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         image: item.image,
//         sizes: item.sizes || "M",
//         colors: item.colors || "Default",
//       })),
//       shippingAddress: values,
//       paymentMethod: "Paystack",
//       totalAmount,
//       paymentReference: reference.reference,
//     };

//     try {
//       const result = await dispatch(createOrder(orderData));
//       if (result.meta.requestStatus === "fulfilled") {
//         dispatch(clearCartServer());
//         navigate('/success')
//         // toast.success("Payment successful! 🎉 Check your Orders page.");
//         formik.resetForm();
//       } else {
//         toast.error("Something went wrong while saving your order.");
//       }
//     } catch (error) {
//       toast.error("Error creating order.");
//       console.log(error);

//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Paystack configuration
//   const paystackConfig = {
//     reference: new Date().getTime().toString(),
//     email: formik.values.email,
//     amount: totalAmount * 100, // Paystack expects kobo
//     publicKey: paystackKey,
//     onSuccess: handlePaystackSuccess,
//     onClose: () => toast.info("Payment window closed"),
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Checkout</h2>
//       <div className="row">
//         <div className="col-md-7">
//           <form onSubmit={formik.handleSubmit}>
//             <h4 className="mb-3">Billing Information</h4>
//             <div className="row g-3">
//               {["firstName", "lastName", "email", "phone", "address"].map(
//                 (field, i) => (
//                   <div
//                     key={field}
//                     className={i < 2 ? "col-md-6" : "col-12"}
//                   >
//                     <label className="form-label text-capitalize">{field}</label>
//                     <input
//                       type={
//                         field === "email"
//                           ? "email"
//                           : field === "phone"
//                             ? "tel"
//                             : "text"
//                       }
//                       name={field}
//                       className={`form-control ${formik.touched[field] && formik.errors[field]
//                         ? "border-danger"
//                         : ""
//                         }`}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values[field]}
//                     />
//                     {formik.touched[field] && (
//                       <small className="text-danger">
//                         {formik.errors[field]}
//                       </small>
//                     )}
//                   </div>
//                 )
//               )}

//               <div className="col-md-4">
//                 <label>Country</label>
//                 <select
//                   name="country"
//                   className="form-select"
//                   onChange={(e) => {
//                     formik.handleChange(e);
//                     setSelectedCountry(e.target.value);
//                     setStates([]);
//                     setCities([]);
//                   }}
//                   value={formik.values.country}
//                 >
//                   <option value="">Select Country</option>
//                   {countries.map((c, i) => (
//                     <option key={i} value={c.name}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-4">
//                 <label>State</label>
//                 <select
//                   className="form-select"
//                   value={selectedState}
//                   onChange={(e) => setSelectedState(e.target.value)}
//                 >
//                   <option value="">Select State</option>
//                   {states.map((s, i) => (
//                     <option key={i} value={s.name}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-4">
//                 <label>City</label>
//                 <select
//                   name="city"
//                   className="form-select"
//                   onChange={formik.handleChange}
//                   value={formik.values.city}
//                 >
//                   <option value="">Select City</option>
//                   {cities.map((ct, i) => (
//                     <option key={i} value={ct}>
//                       {ct}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <hr className="my-4" />
//             <h4 className="mb-3">Payment Method</h4>

//             <PaystackButton
//               {...paystackConfig}
//               text={loading ? "Processing..." : "Pay with Paystack"}
//               className="btn bg-black text-white w-100"
//               disabled={loading || !formik.isValid}
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn bg-black text-white w-100 my-4"
//             >
//               {loading ? <DotLoader size={20} color="#fff" /> : "Place Order"}
//             </button>
//           </form>
//         </div>

//         <div className="col-md-4">
//           <OrderSummary />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
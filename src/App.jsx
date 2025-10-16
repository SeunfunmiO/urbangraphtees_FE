import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import ProductsGrid from './components/ProductsGrid'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About";
import Footer from './components/Footer';
import TermsPage from './pages/TermsPage';
import Privacy from './pages/Privacy';
import Delivery from './pages/Delivery';
import FaqPage from './pages/FaqPage';
import Header from './components/Header';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import NotFound from './pages/NotFound';
import ContactPage from './pages/ContactPage';
import Search from './pages/Search';
// import Dashboard from './pages/Dashboard';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import Cart from './pages/Cart';
import FeaturedProd from './components/FeaturedProd';
import OrderSummary from './components/OrderSummary';
import Wishlist from './pages/Wishlist';
import UserDashboard from './pages/UserDashboard';
import UserOrder from './pages/UserOrder';
import Settings from './pages/Settings';
import Notification from './pages/Notification';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import ForgetPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
// import OverView from './pages/Overview'
import NotificationDetails from './pages/NotificationDetails'
import AdminAuthGuard from './components/AdminAuthGuard'
import AdminDashboard from './pages/admin/AdminDashboard'

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/dashboard" && "/admin";


  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Banner />
            <FeaturedProd />
            <ProductsGrid />
            <BlogPage />
            <Footer />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/delivery-policy" element={<Delivery />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>} />
        <Route path='/shop' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Ordersummary' element={<OrderSummary />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>} />
        <Route path='/dashboard/orders' element={<UserOrder />} />
        {/* <Route path='/overview' element={<OverView />} /> */}
        <Route path='/settings' element={<Settings />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/notifications/:id' element={<NotificationDetails />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path='/admin/*' element={
          <AdminAuthGuard >
            <AdminDashboard />
          </AdminAuthGuard>
        } />










        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer position='top-right' autoClose={3000} />
    </>
  );
};

export default App;

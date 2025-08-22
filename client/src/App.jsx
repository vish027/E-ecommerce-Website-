import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

// Context
import { useAppContext } from "./context/AppContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Pages
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

// Seller Pages
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

// Agriculture
import AgricultureWebsite from "./components/AgricultureWebsite";
import IrrigationInfo from "./components/IrrigationInfo";
import DroneTechnology from "./components/DroneTechnology";
import DigitalAgriTech from "./components/DigitalAgriTech";
import PestManagementControl from "./components/PestManagementControl";
import PlantDiseases from "./components/PlantDiseases";
import About from "./components/About";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Refresh handler
import RefreshHandler from "./RefreshHandler";

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const { isSeller } = useAppContext();
  const location = useLocation();

  // Detect paths
  const isSellerPath = location.pathname.startsWith("/seller");
  const isAuthPath = location.pathname === "/login" || location.pathname === "/signup";

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="text-default min-h-screen text-gray-700 bg-green">
      {/* Show Navbar only when not Seller and not Auth pages */}
      {!isSellerPath && !isAuthPath && <Navbar />}
      <Toaster />
      <div className={`${isSellerPath || isAuthPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />

          {/* Seller routes */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Authentication (no Navbar/Footer here) */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

          {/* Agriculture Private Routes */}
          <Route path="/agriculture-website" element={<PrivateRoute><AgricultureWebsite /></PrivateRoute>} />
          <Route path="/irrigation" element={<PrivateRoute><IrrigationInfo /></PrivateRoute>} />
          <Route path="/drone-technology" element={<PrivateRoute><DroneTechnology /></PrivateRoute>} />
          <Route path="/digital-agri-tech" element={<PrivateRoute><DigitalAgriTech /></PrivateRoute>} />
          <Route path="/pest-mgt-control" element={<PrivateRoute><PestManagementControl /></PrivateRoute>} />
          <Route path="/diseases-of-plants" element={<PrivateRoute><PlantDiseases /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        </Routes>
      </div>
      {/* Show Footer only when not Seller and not Auth pages */}
      {!isSellerPath && !isAuthPath && <Footer />}
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </>
  );
}

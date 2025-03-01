// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductDetailPage from './pages/ProductDetailPage';
import BasketPage from './pages/BasketPage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile'
import Configurator from './pages/Configurator';  // import Configurator page
import ProductsPage from './pages/ProductsPage';
import Guide from './pages/Guide'
import Sets from './pages/Sets'
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactForm from './pages/ContactForm';
import Support from './pages/Support';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css"

function Logout() {
  localStorage.clear();

  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const App = () => {

  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
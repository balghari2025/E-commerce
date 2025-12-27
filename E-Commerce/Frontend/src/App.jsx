// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import VideoHeroSection from "./Components/VideoHeroSection";
import Categories from "./Components/Categories";
import Filters from "./Components/Filter";
import Footer from "./Components/Footer";
import Products from "./Components/All_Products";
import CartProvider from "./Components/CartProvider";
import CartPage from "./Components/CartPage";
import OrderNow from "./Components/OrderNow";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/Contact";
import OurTeam from "./Components/OurTeam";
import OurHistory from "./Components/OurHistory";
import DryFruit from "./Components/DryFruit"; // ✅ fix file name casing
import HerbalHealth from "./Components/HerbalHealth";
import OilandHealth from "./Components/OilandHealth";
import GrainandNfruits from "./Components/GrainandNfruits";
import Specials from "./Components/Specials";
import NewArrival from "./Components/NewArrival";
import BestSellers from "./Components/BestSeller";
import Discount from "./Components/Discount";
import Popular from "./Components/Popular";
function HomePage() {
  return (
    <>
      <VideoHeroSection />
      <Categories />
      <Filters />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/view-cart" element={<CartPage />} />
              <Route path ="/order-now" element={<OrderNow />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/history" element={<OurHistory />} />
              <Route path="DryFruit" element={<DryFruit />} />
              <Route path="HerbalHealth" element={<HerbalHealth />} />
              <Route path="OilandHealth" element={<OilandHealth />} />
              <Route path="GrainandNfruits" element={<GrainandNfruits />} />
              <Route path="Specials" element={<Specials />} />
              <Route path="NewArrival" element={<NewArrival />} />
              <Route path="BestSellers" element={<BestSellers />} />
              <Route path="Discount" element={<Discount />} />
              <Route path="Popular" element={<Popular />} />
              
            </Routes>

            <div className="text-center my-4">
              <Link
                to="/view-cart"
                className="text-blue-600 hover:underline font-semibold"
              >
                
              </Link>
            </div>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

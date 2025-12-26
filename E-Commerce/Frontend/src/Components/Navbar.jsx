import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronDown,
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from 'react-icons/fa';

// Navigation data
const navItems = [
  { name: "Home", path: "/", dropdown: null },
  {
    name: "About",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about-us" },
      { name: "Our Team", path: "/team" },
      { name: "Our History", path: "/history" },
      { name: "Contact Us", path: "/contact" }
    ]
  },
  {
    name: "Categories",
    path: "/categories",
    dropdown: [
      { name: "Dry Fruits", path: "/DryFruit" },
      { name: "Herbal and Health", path: "/HerbalHealth" },
      { name: "Oils and Health", path: "/OilandHealth" },
      { name: "Grains and Natural Fruits", path: "/GrainandNfruits" },
      { name: "Specials", path: "/Specials" },
      { name: "Other", path: "/category/other" }
    ]
  },
  {
    name: "Products",
    path: "/products",
    dropdown: [
      { name: "New Arrivals", path: "/NewArrival" },
      { name: "Best Sellers", path: "/products/bestsellers" },
      { name: "Discounts", path: "/products/discounts" },
      { name: "Popular", path: "/products/popular" },
      { name: "All products", path: "/products" }
    ]
  },
  {
    name: "FAQ",
    path: "/faq",
    dropdown: [
      { name: "Shipping and Delivery", path: "/faq/shipping" },
      { name: "Returns and Refunds", path: "/faq/returns" },
      { name: "Payment methods", path: "/faq/payment" },
      { name: "Order Tracking", path: "/faq/tracking" },
      { name: "Contact support", path: "/faq/contact" }
    ]
  },
];

const userMenuItems = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
  { name: "Logout", path: "/logout" }
];

const cartMenuItems = [
  { name: "View Cart", path: "/view-cart" },
  { name: "Checkout", path: "/" },
  { name: "Order History", path: "/orders" }
];

// Theme styles helper
const getThemeStyles = (darkMode) => {
  return {
    navBg: darkMode ? 'bg-gray-900' : 'bg-stone-800',
    dropdownBg: darkMode ? 'bg-gray-800' : 'bg-stone-800',
    mobileMenuBg: darkMode ? 'bg-gray-800' : 'bg-stone-800',
    text: 'text-white',
    dropdownText: darkMode ? 'text-white' : 'text-stone-100',
    mobileText: darkMode ? 'text-white' : 'text-stone-100',
    dropdownHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-stone-700',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };
};

// Desktop Dropdown
const DesktopDropdown = ({ items, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <ul className={`absolute left-0 mt-2 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2`}>
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.path} className={`block px-4 py-2 ${theme.dropdownHover} transition-colors duration-200`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Desktop Nav Links
const DesktopNavLinks = ({ navItems, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <ul className="hidden lg:flex gap-8 font-medium text-base">
      {navItems.map((item, index) => (
        <li key={index} className="relative group">
          {item.dropdown ? (
            <>
              <span className={`${theme.text} hover:opacity-80 cursor-pointer flex items-center transition-all duration-200`}>
                {item.name}
                <FaChevronDown className="ml-1 text-xs transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <DesktopDropdown items={item.dropdown} darkMode={darkMode} />
            </>
          ) : (
            <Link to={item.path} className={`${theme.text} hover:opacity-80 transition-colors duration-200`}>
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

// Search Bar
const SearchBar = ({ darkMode, isMobile = false }) => {
  return (
    <div className={`relative ${isMobile ? 'block' : 'hidden lg:flex'}`}>
      <input
        type="text"
        placeholder="Search products..."
        className={`px-5 py-2 rounded-full text-sm focus:outline-none focus:ring-2 w-64 ${
          darkMode
            ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400'
            : 'bg-white text-gray-800 focus:ring-blue-600'
        }`}
      />
      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

// Cart Dropdown
const CartDropdown = ({ isOpen, onToggle, darkMode, cartCount, onCloseAll }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <div className="relative">
      <button onClick={onToggle} className="relative text-white hover:opacity-80 transition">
        <FaShoppingCart className="text-xl" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {cartCount}
        </span>
      </button>
      {isOpen && (
        <ul className={`absolute right-0 mt-3 w-52 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-xl py-2 z-50`}>
          {cartMenuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className={`block px-4 py-2 ${theme.dropdownHover}`} onClick={onCloseAll}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Mobile Menu Dropdown Item
const MobileDropdownItem = ({ item, isActive, onToggle, darkMode, onCloseAll }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <div className={`border-b ${theme.border}`}>
      <button
        className={`flex justify-between items-center w-full px-4 py-4 font-medium ${theme.mobileText}`}
        onClick={onToggle}
      >
        {item.name}
        <FaChevronDown className={`transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>
      {isActive && (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} py-2`}>
          {item.dropdown.map((subItem, i) => (
            <Link key={i} to={subItem.path} className="block px-8 py-3 text-gray-600 hover:bg-blue-50" onClick={onCloseAll}>
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile Menu
const MobileMenu = ({ isOpen, darkMode, navItems, activeDropdown, onToggleDropdown, onCloseAll }) => {
  const theme = getThemeStyles(darkMode);
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onCloseAll}></div>
      <div className={`fixed top-16 left-0 right-0 ${theme.mobileMenuBg} shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden`}>
        <div className="p-4 border-b">
          <SearchBar darkMode={darkMode} isMobile={true} />
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <MobileDropdownItem
                key={index}
                item={item}
                isActive={activeDropdown === index}
                onToggle={() => onToggleDropdown(index)}
                darkMode={darkMode}
                onCloseAll={onCloseAll}
              />
            ) : (
              <div key={index} className={`border-b ${theme.border}`}>
                <Link to={item.path} className={`block px-4 py-4 font-medium ${theme.mobileText} hover:bg-gray-700`} onClick={onCloseAll}>
                  {item.name}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

// Main Navbar Component
const Navbar = ({
  darkMode: initialDarkMode = false,
  showCart = true,
  showUserMenu = true,
  showWishlist = true,
  cartCount = 3,
}) => {
  const [darkMode] = useState(initialDarkMode);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleCartMenu = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const toggleDropdown = (index) => setActiveDropdown(activeDropdown === index ? null : index);
  const closeAll = () => {
    setIsCartOpen(false);
    setIsMobileOpen(false);
    setActiveDropdown(null);
  };

  const theme = getThemeStyles(darkMode);

  return (
    <>
      {/* Fixed Clean Navbar */}
      <nav className={`fixed top-0 left-0 right-0 ${theme.navBg} z-50 shadow-lg`}>
        <div className="flex items-center justify-between h-16 px-4 md:px-8">
          {/* Logo - Text version to match screenshot */}
          <Link to="/" className="text-white font-bold text-xl tracking-wider">
            fa Nuts
          </Link>

          {/* Desktop Links (hidden on mobile/tablet) */}
          <DesktopNavLinks navItems={navItems} darkMode={darkMode} />

          {/* Right Icons Group */}
          <div className="flex items-center gap-6">
            {/* Desktop Search & Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <SearchBar darkMode={darkMode} />
              {showCart && (
                <CartDropdown
                  isOpen={isCartOpen}
                  onToggle={toggleCartMenu}
                  darkMode={darkMode}
                  cartCount={cartCount}
                  onCloseAll={closeAll}
                />
              )}
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-6 lg:hidden">
              {showCart && (
                <div className="relative">
                  <FaShoppingCart className="text-white text-2xl cursor-pointer hover:opacity-80" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                </div>
              )}
              <button onClick={toggleMobileMenu} className="text-white text-2xl">
                {isMobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileOpen}
        darkMode={darkMode}
        navItems={navItems}
        activeDropdown={activeDropdown}
        onToggleDropdown={toggleDropdown}
        onCloseAll={closeAll}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../icon/logo.png'; // Update this path to your logo
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

// Navigation data - easy to modify (all pages included with clickable paths)
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

// User menu items
const userMenuItems = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
  { name: "Logout", path: "/logout" }
];

// Cart menu items
const cartMenuItems = [
  { name: "View Cart", path: "/view-cart" },
  { name: "Checkout", path: "/checkout" },
  { name: "Order History", path: "/orders" }
];

// Logo Component - Displays the company logo with adjusted size for professional fit
const Logo = ({ darkMode, logoUrl }) => {
  return (
   <Link to="/" className="flex items-center gap-2">
  <img
    src={logo}
    alt="Khobani Logo"
    className="h-24 mr-12 md:mr-24 md:h-32 w-96 "
  />
  <span className="text-white font-semibold"></span>
</Link>


  );
};

// Desktop Dropdown Component - Shows dropdown menu on hover with smooth animation
const DesktopDropdown = ({ items, darkMode }) => {
  const theme = getThemeStyles(darkMode);

  return (
    <ul className={`absolute left-0 mt-2 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50`}>
      {items.map((item, index) => (
        <li key={index}>
          <Link
            to={item.path}
            className={`block px-4 py-2 ${theme.dropdownHover} transition-colors duration-200`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Desktop Navigation Links - Main menu for desktop screens, centered
const DesktopNavLinks = ({ navItems, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <ul className="hidden md:flex gap-8 font-medium text-base">
      {navItems.map((item, index) => (
        <li key={index} className="relative group">
          {item.dropdown ? (
            <>
              <span className={`${theme.text} hover:${theme.hoverText} cursor-pointer flex items-center transition-all duration-200`}>
                {item.name}
                <FaChevronDown className="ml-1 text-xs transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <DesktopDropdown items={item.dropdown} darkMode={darkMode} />
            </>
          ) : (
            <Link
              to={item.path}
              className={`${theme.text} hover:${theme.hoverText} transition-colors duration-200`}
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

// Search Bar Component - Search input with icon, responsive widths
const SearchBar = ({ darkMode, isMobile = false }) => {
  const theme = getThemeStyles(darkMode);
  const inputClass = isMobile
    ? `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${theme.searchBg} ${theme.searchText} ${theme.searchBorder} ${theme.searchFocus}`
    : `w-40 md:w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${theme.searchBg} ${theme.searchText} ${theme.searchBorder} ${theme.searchFocus}`;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className={inputClass}
        aria-label="Search products"
      />
      <FaSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.iconText}`} />
    </div>
  );
};

// User Dropdown Component - User menu with dropdown
const UserDropdown = ({
  isOpen,
  onToggle,
  darkMode,
  userMenuItems,
  onCloseAll
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center ${theme.iconText} hover:${theme.hoverText} transition-colors`}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <FaUser className="text-lg" />
      </button>
      {isOpen && (
        <ul className={`absolute right-0 mt-3 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-lg py-2 z-50`}>
          {userMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block px-4 py-2 ${theme.dropdownHover} transition-colors duration-200`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Cart Dropdown Component - Shopping cart with badge and dropdown
const CartDropdown = ({
  isOpen,
  onToggle,
  darkMode,
  cartMenuItems,
  cartCount,
  onCloseAll
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`${theme.iconText} hover:${theme.hoverText} transition-colors relative`}
        aria-label="Shopping cart"
        aria-expanded={isOpen}
      >
        <FaShoppingCart className="text-lg" />
        <span className="absolute -top-2 right-0 left-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      </button>
      {isOpen && (
        <ul className={`absolute right-0 mt-3 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-lg py-2 z-50`}>
          {cartMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block px-4 py-2 ${theme.dropdownHover} transition-colors duration-200`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Desktop Action Buttons - Right side buttons for desktop
const DesktopActionButtons = ({
  darkMode,
  onToggleDarkMode,
  onToggleUser,
  onToggleCart,
  isUserOpen,
  isCartOpen,
  showUserMenu,
  showWishlist,
  showCart,
  cartCount,
  onCloseAll
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="hidden md:flex items-center gap-4">
      <SearchBar darkMode={darkMode} />
      <button
        onClick={onToggleDarkMode}
        className={`${theme.iconText} hover:${theme.hoverText} transition-all duration-300`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
      </button>
      {showUserMenu && (
        <UserDropdown
          isOpen={isUserOpen}
          onToggle={onToggleUser}
          darkMode={darkMode}
          userMenuItems={userMenuItems}
          onCloseAll={onCloseAll}
        />
      )}
      {showWishlist && (
        <Link
          to="/wishlist"
          className={`${theme.iconText} hover:${theme.hoverText} transition-colors`}
          aria-label="Wishlist"
        >
          <FaHeart className="text-lg" />
        </Link>
      )}
      {showCart && (
        <CartDropdown
          isOpen={isCartOpen}
          onToggle={onToggleCart}
          darkMode={darkMode}
          cartMenuItems={cartMenuItems}
          cartCount={cartCount}
          onCloseAll={onCloseAll}
        />
      )}
    </div>
  );
};

// Mobile Action Buttons - Right side buttons for mobile, with cart clickable
const MobileActionButtons = ({
  darkMode,
  onToggleMobileMenu,
  isMobileOpen,
  onToggleCart,
  showCart,
  cartCount
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="flex md:hidden items-center gap-4">
      <button
        onClick={onToggleCart}
        className={`${theme.iconText} hover:${theme.hoverText} transition-colors relative`}
        aria-label="Shopping cart"
      >
        <FaShoppingCart className="text-lg" />
        <span className="absolute -top-2 right-1 left-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      </button>
      <button
        onClick={onToggleMobileMenu}
        className={`${theme.iconText} text-lg`}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

// Mobile Dropdown Item - Accordion style for mobile menu
const MobileDropdownItem = ({
  item,
  isActive,
  onToggle,
  darkMode,
  onCloseAll
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className={`border-b ${theme.border}`}>
      <button
        className={`flex justify-between items-center w-full px-4 py-3 font-medium ${theme.mobileText} hover:${theme.hoverBg}`}
        onClick={onToggle}
        aria-expanded={isActive}
      >
        {item.name}
        <FaChevronDown className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
      </button>
      {isActive && (
        <div className={`${theme.mobileSubBg} py-1`}>
          {item.dropdown.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              to={subItem.path}
              className={`block px-6 py-2 ${theme.mobileText} hover:${theme.hoverBg} transition-colors`}
              onClick={onCloseAll}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile Menu - Full screen menu for mobile devices, including dark mode toggle and wishlist
const MobileMenu = ({
  isOpen,
  darkMode,
  navItems,
  activeDropdown,
  onToggleDropdown,
  onCloseAll,
  onToggleDarkMode,
  showWishlist,
  cartMenuItems,
  userMenuItems,
  onToggleCart
}) => {
  const theme = getThemeStyles(darkMode);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onCloseAll}
        aria-hidden="true"
      ></div>
      <div className={`fixed top-16 left-0 right-0 bottom-0 ${theme.mobileMenuBg} shadow-lg z-40 transform transition-transform duration-300 md:hidden overflow-y-auto ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="p-4 border-b">
          <SearchBar darkMode={darkMode} isMobile={true} />
        </div>
        <div>
          {navItems.map((item, index) => (
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
                <Link
                  to={item.path}
                  className={`block px-4 py-3 font-medium ${theme.mobileText} hover:${theme.hoverBg} transition-colors`}
                  onClick={onCloseAll}
                >
                  {item.name}
                </Link>
              </div>
            )
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex flex-col gap-2">
            {showWishlist && (
              <Link
                to="/wishlist"
                className={`flex items-center px-4 py-3 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors`}
                onClick={onCloseAll}
              >
                <FaHeart className="mr-2" /> Wishlist
              </Link>
            )}
            <button
              onClick={onToggleCart}
              className={`flex items-center px-4 py-3 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors text-left`}
            >
              <FaShoppingCart className="mr-2" /> Cart
            </button>
            {cartMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`px-6 py-2 ${theme.mobileText} hover:${theme.hoverBg} transition-colors block`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            ))}
            {userMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`px-4 py-3 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={onToggleDarkMode}
              className={`flex items-center px-4 py-3 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors text-left`}
            >
              {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get theme styles based on dark mode - professional colors
const getThemeStyles = (darkMode) => {
  return {
    navBg: darkMode ? 'bg-gray-900' : 'bg-gray-800',
    dropdownBg: darkMode ? 'bg-gray-900' : 'bg-gray-800',
    mobileMenuBg: darkMode ? 'bg-gray-800' : 'bg-gray-700',
    mobileSubBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    text: darkMode ? 'text-gray-100' : 'text-white',
    hoverText: darkMode ? 'text-gray-300' : 'text-gray-600',
    dropdownText: darkMode ? 'text-gray-300' : 'text-gray-400',
    mobileText: darkMode ? 'text-gray-100' : 'text-white',
    iconText: darkMode ? 'text-gray-300' : 'text-white',
    hoverBg: darkMode ? 'bg-gray-200' : 'bg-gray-700',
    dropdownHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    searchBg: darkMode ? 'bg-gray-800' : 'bg-gray-50',
    searchText: darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500',
    searchBorder: darkMode ? 'border-gray-700' : 'border-gray-300',
    searchFocus: darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500',
  };
};

// Main Navbar Component
const Navbar = ({
  darkMode: initialDarkMode = false,
  showCart = true,
  showUserMenu = true,
  showWishlist = true,
  cartCount = 3,
  logoUrl = "/src/assets/logo.png" // Update this path to your logo
}) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleUserMenu = () => {
    setIsUserOpen(!isUserOpen);
    setIsCartOpen(false);
  };
  const toggleCartMenu = () => {
    setIsCartOpen(!isCartOpen);
    setIsUserOpen(false);
  };
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const closeAllDropdowns = () => {
    setIsUserOpen(false);
    setIsCartOpen(false);
    setActiveDropdown(null);
    setIsMobileOpen(false);
  };

  const theme = getThemeStyles(darkMode);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 ${theme.navBg} h-16 md:h-20 flex items-center justify-between px-4 md:px-8 z-50 shadow-md transition-colors duration-300`}>
        <Logo darkMode={darkMode} logoUrl={logoUrl} />
        <div className="flex-1 flex justify-center">
          <DesktopNavLinks navItems={navItems} darkMode={darkMode} />
        </div>
        <div className="flex items-center mx-16 gap-0">
          <DesktopActionButtons
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onToggleUser={toggleUserMenu}
            onToggleCart={toggleCartMenu}
            isUserOpen={isUserOpen}
            isCartOpen={isCartOpen}
            showUserMenu={showUserMenu}
            showWishlist={showWishlist}
            showCart={showCart}
            cartCount={cartCount}
            onCloseAll={closeAllDropdowns}
          />
          <MobileActionButtons
            darkMode={darkMode}
            onToggleMobileMenu={toggleMobileMenu}
            isMobileOpen={isMobileOpen}
            onToggleCart={toggleCartMenu}
            showCart={showCart}
            cartCount={cartCount}
          />
        </div>
      </nav>
      <MobileMenu
        isOpen={isMobileOpen}
        darkMode={darkMode}
        navItems={navItems}
        activeDropdown={activeDropdown}
        onToggleDropdown={toggleDropdown}
        onCloseAll={closeAllDropdowns}
        onToggleDarkMode={toggleDarkMode}
        showWishlist={showWishlist}
        cartMenuItems={cartMenuItems}
        userMenuItems={userMenuItems}
        onToggleCart={toggleCartMenu}
      />
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
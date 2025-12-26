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

// Navigation data - easy to modify
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
  { name: "Checkout", path: "/" },
  { name: "Order History", path: "/orders" }
];

// Logo Component - Displays the company logo
const Logo = ({ darkMode, logoUrl }) => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src={logo} 
        alt="Khobani Logo" 
        className="h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] w-auto transition-all duration-300" 
      />
    </Link>
  );
};

// Desktop Dropdown Component - Shows dropdown menu on hover
const DesktopDropdown = ({ items, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  
  return (
    <ul className={`absolute left-0 mt-2 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2`}>
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

// Desktop Navigation Links - Main menu for desktop screens
const DesktopNavLinks = ({ navItems, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <ul className="hidden md:flex gap-6 xl:gap-6 font-medium text-base">
      {navItems.map((item, index) => (
        <li key={index} className="relative group">
          {item.dropdown ? (
            // Item with dropdown menu
            <>
              <span className={`${theme.text} hover:opacity-80 cursor-pointer flex items-center transition-all duration-200`}>
                {item.name}
                <FaChevronDown className="ml-1 text-xs transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <DesktopDropdown items={item.dropdown} darkMode={darkMode} />
            </>
          ) : (
            // Simple menu item without dropdown
            <Link 
              to={item.path}
              className={`${theme.text} hover:opacity-80 transition-colors duration-200`}
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

// Search Bar Component - Search input with icon
const SearchBar = ({ darkMode, isMobile = false }) => {
  const theme = getThemeStyles(darkMode);
  const inputClass = isMobile 
    ? `w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
        darkMode 
          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' 
          : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-600'
      }`
    : `width-20 px-5 py-2 rounded-full text-sm focus:outline-none focus:ring-2 ${
        darkMode 
          ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400' 
          : 'bg-white text-gray-800 focus:ring-blue-600'
      }`;

  return (
    <div className={`relative ${isMobile ? 'block' : 'hidden md:flex'}`}>
      <input
        type="text"
        placeholder="Search products..."
        className={inputClass}
        aria-label="Search products"
      />
      <FaSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`} />
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
        className={`flex items-center ${theme.text} cursor-pointer hover:opacity-80 transition-colors`}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <FaUser className="text-lg" />
      </button>
      {isOpen && (
        <ul className={`absolute right-0 mt-3 w-40 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-xl py-2 z-50`}>
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
        className={`${theme.text} text-lg cursor-pointer hover:opacity-80 transition-colors relative`}
        aria-label="Shopping cart"
        aria-expanded={isOpen}
      >
        <FaShoppingCart className="text-lg" />
        {/* Cart item count badge - fixed for mobile */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      </button>
      {isOpen && (
        <ul className={`absolute right-0 mt-3 w-48 ${theme.dropdownBg} ${theme.dropdownText} text-sm rounded-lg shadow-xl py-2 z-50`}>
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
      {/* Dark/Light mode toggle */}
      {/* Search bar */}
      <SearchBar darkMode={darkMode} />
       <button 
        onClick={onToggleDarkMode}
        className={`p-3 rounded-full ${theme.text} hover:opacity-80 transition-all duration-300`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>


      {/* User dropdown */}
      {showUserMenu && (
        <UserDropdown 
          isOpen={isUserOpen}
          onToggle={onToggleUser}
          darkMode={darkMode}
          userMenuItems={userMenuItems}
          onCloseAll={onCloseAll}
        />
      )}

      {/* Wishlist - hidden on mobile, visible on sm and above */}
      {showWishlist && (
        <Link 
          to="/wishlist"
          className={`${theme.text} cursor-pointer hover:opacity-80 transition-colors hidden sm:block`}
          aria-label="Wishlist"
        >
          <FaHeart className="text-lg" />
        </Link>
      )}

      {/* Cart dropdown */}
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

// Mobile Action Buttons - Right side buttons for mobile
const MobileActionButtons = ({ 
  darkMode, 
  onToggleMobileMenu, 
  isMobileOpen,
  showCart,
  cartCount 
}) => {
  const theme = getThemeStyles(darkMode);
  
  return (
    <div className="flex md:hidden items-center gap-3 sm:gap-4">
      {/* Search icon - hidden on mobile, visible on sm and above */}
      <FaSearch className={`${theme.text} text-lg cursor-pointer hidden sm:block`} />
      
      {/* Mobile cart icon - fixed position for mobile */}
      {showCart && (
        <div className="relative">
          <FaShoppingCart className={`${theme.text} text-lg cursor-pointer`} />
          {/* Fixed cart badge for mobile - smaller and properly positioned */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        </div>
      )}

      {/* Mobile menu toggle button */}
      <button 
        onClick={onToggleMobileMenu}
        className={`${theme.text} text-xl p-1`}
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
        className={`flex justify-between items-center w-full px-4 py-4 font-medium cursor-pointer ${theme.mobileText}`}
        onClick={onToggle}
        aria-expanded={isActive}
      >
        {item.name}
        <FaChevronDown className={`transform transition-transform duration-200 ${
          isActive ? 'rotate-180' : ''
        }`} />
      </button>
      {isActive && (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} py-2`}>
          {item.dropdown.map((subItem, subIndex) => (
            <Link 
              key={subIndex} 
              to={subItem.path}
              className={`block px-6 py-3 transition-colors ${
                darkMode ? 'text-white hover:bg-gray-600' : 'text-gray-600 hover:bg-blue-50'
              }`}
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

// Mobile Menu - Full screen menu for mobile devices
const MobileMenu = ({ 
  isOpen, 
  darkMode, 
  navItems, 
  activeDropdown, 
  onToggleDropdown, 
  onCloseAll 
}) => {
  const theme = getThemeStyles(darkMode);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Mobile menu overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
        onClick={onCloseAll}
        aria-hidden="true"
      ></div>

      {/* Mobile menu content */}
      <div className={`fixed top-16 left-0 right-0 ${theme.mobileMenuBg} shadow-xl z-40 transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        
        {/* Mobile search bar */}
        <div className="p-4 border-b">
          <SearchBar darkMode={darkMode} isMobile={true} />
        </div>

        {/* Mobile navigation items */}
        <div className="max-h-[70vh] overflow-y-auto">
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
                  className={`block px-4 py-4 font-medium transition-colors ${
                    darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={onCloseAll}
                >
                  {item.name}
                </Link>
              </div>
            )
          ))}
        </div>

        {/* Mobile user menu */}
        <div className="p-4 border-t">
          <div className="flex flex-col gap-2">
            {userMenuItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-blue-50'
                }`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get theme styles based on dark mode
const getThemeStyles = (darkMode) => {
  return {
    // Background colors
    navBg: darkMode ? 'bg-gray-900' : 'bg-stone-800',
    dropdownBg: darkMode ? 'bg-gray-800' : 'bg-stone-800',
    mobileMenuBg: darkMode ? 'bg-gray-800' : 'bg-stone-800',
    
    // Text colors
    text: darkMode ? 'text-white' : 'text-white',
    dropdownText: darkMode ? 'text-white' : 'text-stone-100',
    mobileText: darkMode ? 'text-white' : 'text-stone-100',
    
    // Hover colors
    hover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-400',
    dropdownHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-stone-700',
    
    // Border colors
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
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
  // State for all dropdowns and menus
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Toggle functions
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleUserMenu = () => {
    setIsUserOpen(!isUserOpen);
    setIsCartOpen(false); // Close cart when opening user menu
  };
  const toggleCartMenu = () => {
    setIsCartOpen(!isCartOpen);
    setIsUserOpen(false); // Close user menu when opening cart
  };
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Close all dropdowns and menus
  const closeAllDropdowns = () => {
    setIsUserOpen(false);
    setIsCartOpen(false);
    setActiveDropdown(null);
    setIsMobileOpen(false);
  };

  // Get theme styles
  const theme = getThemeStyles(darkMode);

  return (
    <>
      {/* Main Navigation Bar - Fixed with proper spacing */}
      <nav className={`fixed top-0 left-0 right-0 ${theme.navBg} h-16 md:h-20 py-3 flex items-center justify-between px-4 md:px-8 z-50 shadow-lg transition-colors duration-300`}>
        
        {/* Logo */}
        <Logo 
          darkMode={darkMode} 
          logoUrl={logoUrl}
        />

        {/* Desktop Navigation Links */}
        <div className="flex-1 justify-center">
          <DesktopNavLinks navItems={navItems} darkMode={darkMode} />
        </div>

        {/* Action Buttons - Fixed spacing for mobile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
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
            showCart={showCart}
            cartCount={cartCount}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileOpen}
        darkMode={darkMode}
        navItems={navItems}
        activeDropdown={activeDropdown}
        onToggleDropdown={toggleDropdown}
        onCloseAll={closeAllDropdowns}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
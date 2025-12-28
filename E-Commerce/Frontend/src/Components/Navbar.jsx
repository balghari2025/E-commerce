import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../icon/logo.png'; // Update this path to your logo
import LoginModal from "./LoginModal"; // Changed from default import
import RegisterModal from "./RegisterModal";
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


// Navigation data - centralized and easy to modify
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
      { name: "Best Sellers", path: "/BestSellers" },
      { name: "Discounts", path: "/Discount" },
      { name: "Popular", path: "/Popular" },
      { name: "All products", path: "/products" }
    ]
  },
  {
    name: "FAQ",
    path: "/faq",
    dropdown: [
      { name: "Shipping and Delivery", path: "/ShippingDelivery" },
      { name: "Returns and Refunds", path: "/ReturnRefund" },
      { name: "Payment methods", path: "/PaymentMethod" },
      { name: "Order Tracking", path: "/OrderTraking" },
      { name: "Contact support", path: "/Contact" }
    ]
  },
];

// User menu items
const userMenuItems = [
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
  { name: "Logout", path: "/logout" }
];

// Cart menu items
const cartMenuItems = [
  { name: "View Cart", path: "/view-cart" },
  { name: "Checkout", path: "/CheackOut" },
  { name: "Order History", path: "/orders" }
];
// Logo Component - Responsive logo with alt text and proper sizing

const Logo = ({ darkMode, logoUrl }) => {
  return (
    <Link to="/" className="flex ">
      <img
        src={logo}
        alt="Khalis Online Logo"
        className="h-32 mr-20 gap-2 w-auto md:h-24"
      />
      <span className="text-xl font-bold text-white hidden sm:block"></span>
    </Link>
  );
};

// Desktop Dropdown - Smooth fade-in animation, shadow, and rounded corners
const DesktopDropdown = ({ items, darkMode }) => {
  const theme = getThemeStyles(darkMode);

  return (
    <ul className={`absolute left-0 top-full mt-2 w-48 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50 ${theme.dropdownBg} ${theme.dropdownText}`}>
      {items.map((item, index) => (
        <li key={index}>
          <Link
            to={item.path}
            className={`block px-4 py-2 text-sm ${theme.dropdownHover} transition-colors duration-200`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Desktop Nav Links - Centered, with hover effects and dropdown indicator
const DesktopNavLinks = ({ navItems, darkMode }) => {
  const theme = getThemeStyles(darkMode);
  return (
    <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-base">
      {navItems.map((item, index) => (
        <li key={index} className="relative group">
          {item.dropdown ? (
            <>
              <span className={`flex items-center cursor-pointer ${theme.text} hover:${theme.hoverText} transition-colors duration-200`}>
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

// Search Bar - Responsive width, with focus ring and placeholder
const SearchBar = ({ darkMode, isMobile = false }) => {
  const theme = getThemeStyles(darkMode);
  const inputClass = isMobile
    ? `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.searchBg} ${theme.searchText} ${theme.searchBorder} ${theme.searchFocus}`
    : `w-32 sm:w-48 md:w-64 lg:w-80 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.searchBg} ${theme.searchText} ${theme.searchBorder} ${theme.searchFocus}`;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className={inputClass}
        aria-label="Search products"
      />
      <FaSearch className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.iconText} text-lg`} />
    </div>
  );
};

// User Dropdown - With login/register and other items
const UserDropdown = ({
  isOpen,
  onToggle,
  darkMode,
  userMenuItems,
  onCloseAll,
  onLoginClick,
  onRegisterClick
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center ${theme.iconText} hover:${theme.hoverText} transition-colors duration-200`}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <FaUser className="text-lg" />
      </button>
      {isOpen && (
        <ul className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl py-2 z-50 ${theme.dropdownBg} ${theme.dropdownText}`}>
          <li>
            <button
              onClick={() => { onLoginClick(); onCloseAll(); }}
              className={`block w-full text-left px-4 py-2 text-sm ${theme.dropdownHover} transition-colors duration-200`}
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => { onRegisterClick(); onCloseAll(); }}
              className={`block w-full text-left px-4 py-2 text-sm ${theme.dropdownHover} transition-colors duration-200`}
            >
              Register
            </button>
          </li>
          {userMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block px-4 py-2 text-sm ${theme.dropdownHover} transition-colors duration-200`}
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

// Cart Dropdown - With badge and menu items
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
        className={`${theme.iconText} hover:${theme.hoverText} transition-colors duration-200 relative`}
        aria-label={`Shopping cart with ${cartCount} items`}
        aria-expanded={isOpen}
      >
        <FaShoppingCart className="text-lg" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-medium">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>
      {isOpen && (
        <ul className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl py-2 z-50 ${theme.dropdownBg} ${theme.dropdownText}`}>
          {cartMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block px-4 py-2 text-sm ${theme.dropdownHover} transition-colors duration-200`}
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

// Desktop Actions - Search, theme toggle, user, wishlist, cart
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
  onCloseAll,
  onLoginClick,
  onRegisterClick
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div className="hidden md:flex items-center gap-4 lg:gap-6">
      <SearchBar darkMode={darkMode} />
      <button
        onClick={onToggleDarkMode}
        className={`${theme.iconText} hover:${theme.hoverText} transition-colors duration-200`}
        aria-label="Toggle theme"
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
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      )}
      {showWishlist && (
        <Link
          to="/wishlist"
          className={`${theme.iconText} hover:${theme.hoverText} transition-colors duration-200`}
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

// Mobile Actions - Cart and hamburger
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
      {showCart && (
        <button
          onClick={onToggleCart}
          className={`${theme.iconText} hover:${theme.hoverText} transition-colors duration-200 relative`}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <FaShoppingCart className="text-lg" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-medium">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      )}
      <button
        onClick={onToggleMobileMenu}
        className={`${theme.iconText} text-xl`}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

// Mobile Dropdown Item - Accordion with smooth transition
const MobileDropdownItem = ({
  item,
  isActive,
  onToggle,
  darkMode,
  onCloseAll
}) => {
  const theme = getThemeStyles(darkMode);

  return (
    <div>
      <button
        className={`flex justify-between items-center w-full px-6 py-4 text-left font-medium ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200 border-b ${theme.border}`}
        onClick={onToggle}
        aria-expanded={isActive}
      >
        {item.name}
        <FaChevronDown className={`text-sm transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-96' : 'max-h-0'}`}>
        <div className={`${theme.mobileSubBg} py-2`}>
          {item.dropdown.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              to={subItem.path}
              className={`block px-8 py-3 text-sm ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
              onClick={onCloseAll}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile Menu - Slide-in from top, with search, nav, actions
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
  onToggleCart,
  onLoginClick,
  onRegisterClick
}) => {
  const theme = getThemeStyles(darkMode);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onCloseAll}
      />
      <div className={`fixed top-[4rem] md:top-[5rem] left-0 right-0 bottom-0 ${theme.mobileMenuBg} overflow-y-auto z-50 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="p-4 border-b ${theme.border}">
          <SearchBar darkMode={darkMode} isMobile={true} />
        </div>
        <nav>
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
              <Link
                key={index}
                to={item.path}
                className={`block px-6 py-4 font-medium ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200 border-b ${theme.border}`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>
        <div className="p-4 border-t ${theme.border}">
          <div className="space-y-1">
            <button
              onClick={() => { onLoginClick(); onCloseAll(); }}
              className={`w-full text-left px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
            >
              Login
            </button>
            <button
              onClick={() => { onRegisterClick(); onCloseAll(); }}
              className={`w-full text-left px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
            >
              Register
            </button>
            {userMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`block px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            ))}
            {showWishlist && (
              <Link
                to="/wishlist"
                className={`flex items-center px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
                onClick={onCloseAll}
              >
                <FaHeart className="mr-3 text-lg" /> Wishlist
              </Link>
            )}
            <button
              onClick={() => { onToggleCart(); onCloseAll(); }}
              className={`flex items-center w-full text-left px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
            >
              <FaShoppingCart className="mr-3 text-lg" /> Cart
            </button>
            {cartMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`block px-8 py-3 text-sm ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
                onClick={onCloseAll}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => { onToggleDarkMode(); onCloseAll(); }}
              className={`flex items-center w-full text-left px-6 py-4 rounded-lg ${theme.mobileText} hover:${theme.hoverBg} transition-colors duration-200`}
            >
              {darkMode ? <FaSun className="mr-3 text-lg" /> : <FaMoon className="mr-3 text-lg" />} Toggle Theme
            </button>
          </div>
        </div>
      </div>
      </>
      
  );}
  


// Theme styles - Professional color palette with good contrast
const getThemeStyles = (darkMode) => {
  return {
    navBg: darkMode ? 'bg-gray-900' : 'bg-gray-800',
    text: darkMode ? 'text-gray-200' : 'text-white',
    hoverText: darkMode ? 'text-white' : 'text-gray-300',
    iconText: darkMode ? 'text-gray-300' : 'text-gray-200',
    dropdownBg: darkMode ? 'bg-gray-900' : 'bg-gray-800',
    dropdownText: darkMode ? 'text-gray-200' : 'text-white',
    dropdownHover: darkMode ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-600 hover:text-gray-200',
    border: darkMode ? 'border-gray-700' : 'border-gray-600',
    mobileMenuBg: darkMode ? 'bg-gray-900' : 'bg-gray-800',
    mobileSubBg: darkMode ? 'bg-gray-800' : 'bg-gray-700',
    mobileText: darkMode ? 'text-gray-200' : 'text-white',
    hoverBg: darkMode ? 'bg-gray-800' : 'bg-gray-700',
    searchBg: darkMode ? 'bg-gray-800' : 'bg-gray-700',
    searchText: darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-white placeholder-gray-400',
    searchBorder: darkMode ? 'border-gray-700' : 'border-gray-600',
    searchFocus: darkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-400 focus:ring-offset-gray-800',
  };
};

// Main Navbar - State management, fixed positioning, spacer
const Navbar = ({
  darkMode: initialDarkMode = false,
  showCart = true,
  showUserMenu = true,
  showWishlist = true,
  cartCount = 3,
  logoUrl = "../icon/logo.png"
}) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
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
    setIsMobileOpen(false);
    setActiveDropdown(null);
  };

  const theme = getThemeStyles(darkMode);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${theme.navBg} shadow-lg transition-colors duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-2 h-16 md:h-20 flex items-center justify-between">
          <Logo darkMode={darkMode} logoUrl={logoUrl} />
          <DesktopNavLinks navItems={navItems} darkMode={darkMode} />
          <div className="flex items-center gap-4 md:gap-6">
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
              onLoginClick={() => setLoginOpen(true)}
              onRegisterClick={() => setRegisterOpen(true)}
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
        </div>
      </nav>
      <div className="h-16 md:h-20" /> {/* Spacer */}
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
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onRegisterClick={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onLoginClick={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
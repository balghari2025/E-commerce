/**
 * Footer Component for Dry-Fruit Ecommerce Site
 *
 * Features:
 * - Fully responsive design (mobile-first with Tailwind breakpoints)
 * - Dark/light mode support with improved color schemes
 * - Newsletter signup with validation and feedback
 * - Accessible markup with ARIA attributes
 * - SEO-friendly structured data
 * - Customizable links, branding, and sections
 *
 * Installation:
 * 1. Place in your components folder
 * 2. Install required icons: npm install lucide-react
 * 3. Customize brand colors, links, and content in the component
 *
 * Props:
 * - darkMode: boolean - Toggle dark/light theme
 * - brandName: string - Your brand name
 * - logoSrc: string - Path to logo image
 * - LogoComponent: React Component - Custom logo component
 * - links: object - Override default links
 * - showNewsletter: boolean - Show/hide newsletter section
 * - year: number - Copyright year (defaults to current)
 * - onSubscribe: function - Newsletter callback
 * - sticky: boolean - Make footer sticky at bottom
 *
 * Customization:
 * - Update links in the defaultLinks object
 * - Replace social/payment icons in respective sections
 * - Modify colors using Tailwind classes or CSS variables
 * - Update contact information in the contact section
 */
import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';

const Footer = ({
  darkMode = false,
  brandName = "NutriDry Fruits",
  logoSrc = null,
  LogoComponent = null,
  links = null,
  showNewsletter = true,
  year = new Date().getFullYear(),
  onSubscribe = null,
  sticky = false
}) => {
  // Default links structure - can be overridden via props
  const defaultLinks = {
    shop: [
      { name: 'Almonds', href: '/category/almonds' },
      { name: 'Cashews', href: '/category/cashews' },
      { name: 'Walnuts', href: '/category/walnuts' },
      { name: 'Pistachios', href: '/category/pistachios' },
      { name: 'Gift Packs', href: '/category/gift-packs' },
      { name: 'Seeds & Nuts', href: '/category/seeds-nuts' }
    ],
    customer: [
      { name: 'My Orders', href: '/orders' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Shipping & Returns', href: '/shipping-returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '/contact' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  };

  const currentLinks = links || defaultLinks;

  // Newsletter state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onSubscribe) {
        onSubscribe(email);
      }
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Improved theme classes for better dark/light contrast
  const theme = {
    background: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: darkMode ? 'text-gray-300' : 'text-gray-700',
    heading: darkMode ? 'text-white' : 'text-gray-900',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    accent: darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700',
    button: darkMode
      ? 'bg-green-600 hover:bg-green-500 text-white disabled:bg-green-800'
      : 'bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400',
    input: darkMode
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500',
    error: darkMode ? 'text-red-400' : 'text-red-600',
    success: darkMode ? 'text-green-400' : 'text-green-600'
  };

  return (
    <footer className={`${theme.background} ${theme.text} relative ${sticky ? 'sticky bottom-0 z-10' : ''}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-4">
              {LogoComponent ? (
                <LogoComponent />
              ) : logoSrc ? (
                <img
                  src={logoSrc}
                  alt={brandName}
                  className="h-8 w-auto"
                />
              ) : (
                <h2 className={`text-2xl font-bold ${theme.heading}`}>
                  {brandName}
                </h2>
              )}
            </div>

            <p className="mb-6 max-w-md">
              Premium quality dry fruits, nuts, and seeds sourced directly from nature's finest orchards.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
                { Icon: MessageCircle, label: 'WhatsApp', href: 'https://whatsapp.com' }
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* Newsletter Section */}
            {showNewsletter && (
              <div className="mt-8">
                <h3 className={`font-semibold text-lg mb-4 ${theme.heading}`}>
                  Subscribe to Our Newsletter
                </h3>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${theme.input}`}
                    aria-label="Email for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${theme.button}`}
                    aria-label="Subscribe"
                  >
                    <Send size={16} />
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {error && <p className={`mt-2 text-sm ${theme.error}`}>{error}</p>}
                {subscribed && <p className={`mt-2 text-sm ${theme.success}`}>Subscribed successfully!</p>}
              </div>
            )}
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${theme.heading}`}>
              Shop Categories
            </h3>
            <ul className="space-y-2">
              {currentLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${theme.accent} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${theme.heading}`}>
              Customer Care
            </h3>
            <ul className="space-y-2">
              {currentLinks.customer.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${theme.accent} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${theme.heading}`}>
              Company
            </h3>
            <ul className="space-y-2">
              {currentLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${theme.accent} transition-colors duration-200`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-start-5 lg:row-start-1 lg:row-span-2 lg:mt-0 mt-8">
            <h3 className={`font-semibold text-lg mb-4 ${theme.heading}`}>
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <a
                    href="tel:+923555711812"
                    className={`${theme.accent} transition-colors duration-200`}
                  >
                    +923555711812
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a
                    href="mailto:shoaibbalghari@gmail.com"
                    className={`${theme.accent} transition-colors duration-200`}
                  >
                    shoaibbalghari@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Visit Us</p>
                  <address className="not-italic">
                    Sooq Balghar, District Ghanche, Pakistan
                  </address>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${theme.accent} transition-colors duration-200`}
                  >
                    View on Map
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p>Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Trust Section */}
      <div className={`border-t ${theme.border} py-6`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center space-x-4">
              <span className="text-sm font-medium">We Accept:</span>
              <div className="flex flex-wrap items-center gap-3">
                {['Visa', 'Mastercard', 'JazzCash', 'EasyPaisa', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>GMP Certified</span>
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="/sitemap" className={`${theme.accent}`}>
                Sitemap
              </a>
              <a href="/accessibility" className={`${theme.accent}`}>
                Accessibility
              </a>
              <select
                className={`bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer ${theme.text}`}
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className={`border-t ${theme.border} py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm">
            <div>
              <p>
                &copy; {year} {brandName}. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/privacy" className={`${theme.accent}`}>
                Privacy Policy
              </a>
              <a href="/terms" className={`${theme.accent}`}>
                Terms of Service
              </a>
              <a href="/accessibility" className={`${theme.accent}`}>
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": brandName,
            "url": "https://nutridry.com",
            "logo": "https://nutridry.com/logo.png",
            "description": "Premium quality dry fruits, nuts, and seeds",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+923555711812",
              "contactType": "customer service",
              "email": "shoaibbalghari@gmail.com"
            },
            "sameAs": [
              "https://facebook.com/nutridry",
              "https://twitter.com/nutridry",
              "https://instagram.com/nutridry"
            ]
          })
        }}
      />
    </footer>
  );
};

export default Footer;
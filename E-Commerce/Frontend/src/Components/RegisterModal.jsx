import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaMapMarkerAlt, FaTimes, FaGoogle, FaFacebook, FaUserCircle } from "react-icons/fa";

const RegisterModal = ({ open, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, and numbers";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setCurrentStep(2);
      return;
    }
    
    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", formData);
      setIsLoading(false);
      // Handle successful registration here
      onClose(); // Close modal on success
    }, 2000);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Add social registration logic here
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Content */}
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Modal Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              Create Your Account
            </h2>
            <p className="mt-1 text-sm text-white/90">
              Join our community today
            </p>
            
            {/* Progress Steps */}
            <div className="mt-6 flex justify-center space-x-2">
              <div className={`h-2 w-16 rounded-full ${currentStep >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
              <div className={`h-2 w-16 rounded-full ${currentStep >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Account Information */}
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full rounded-lg border py-3 pl-10 pr-3 focus:outline-none focus:ring-2 transition-colors ${
                          errors.fullName 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full rounded-lg border py-3 pl-10 pr-3 focus:outline-none focus:ring-2 transition-colors ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`w-full rounded-lg border py-3 pl-10 pr-12 focus:outline-none focus:ring-2 transition-colors ${
                            errors.password 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                          }`}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`w-full rounded-lg border py-3 pl-10 pr-12 focus:outline-none focus:ring-2 transition-colors ${
                            errors.confirmPassword 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                          }`}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        disabled={isLoading}
                      />
                      <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                        I agree to the{" "}
                        <button type="button" className="text-emerald-600 hover:text-emerald-500 font-medium">
                          Terms and Conditions
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-emerald-600 hover:text-emerald-500 font-medium">
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                    )}

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="receiveNewsletter"
                        name="receiveNewsletter"
                        checked={formData.receiveNewsletter}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        disabled={isLoading}
                      />
                      <label htmlFor="receiveNewsletter" className="ml-2 text-sm text-gray-700">
                        I want to receive updates, promotions, and newsletters via email
                      </label>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                    <p className="font-medium mb-2">Password must contain:</p>
                    <ul className="space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 8 ? 'text-emerald-600' : ''}`}>
                        <span className="mr-2">•</span>
                        At least 8 characters
                      </li>
                      <li className={`flex items-center ${/(?=.*[a-z])/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                        <span className="mr-2">•</span>
                        One lowercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*[A-Z])/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                        <span className="mr-2">•</span>
                        One uppercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*\d)/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                        <span className="mr-2">•</span>
                        One number
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {/* Step 2: Additional Information */}
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full rounded-lg border py-3 pl-10 pr-3 focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, State, ZIP Code"
                        rows="3"
                        className={`w-full rounded-lg border py-3 pl-10 pr-3 focus:outline-none focus:ring-2 transition-colors ${
                          errors.address 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                    <h3 className="font-medium text-emerald-800 mb-1">Review Your Information</h3>
                    <p className="text-sm text-emerald-700">
                      Please review your details before completing registration.
                    </p>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 flex gap-3">
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1 rounded-lg border border-gray-300 bg-white py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-70 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 py-3 px-4 font-medium text-white hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all ${
                    currentStep === 2 ? 'flex-1' : 'w-full'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {currentStep === 1 ? 'Continue' : 'Creating Account...'}
                    </span>
                  ) : (
                    currentStep === 1 ? 'Continue' : 'Complete Registration'
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or register with</span>
              </div>
            </div>

            {/* Social Registration Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialRegister("Google")}
                disabled={isLoading}
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-70 transition-colors"
              >
                <FaGoogle className="mr-2 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button
                onClick={() => handleSocialRegister("Facebook")}
                disabled={isLoading}
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-70 transition-colors"
              >
                <FaFacebook className="mr-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => {
                  onClose();
                  onLoginClick?.();
                }}
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="rounded-b-2xl bg-gray-50 px-6 py-4">
            <p className="text-center text-xs text-gray-500">
              Your information is protected and secure. We never share your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
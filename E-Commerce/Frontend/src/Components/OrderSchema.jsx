import { z } from 'zod';
const phoneRegex = /^\+?[\d\s-()]{10,}$/;
const cardNumberRegex = /^\d{16}$/;
const cvcRegex = /^\d{3,4}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

export const orderSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(phoneRegex, 'Please enter a valid phone number'),
  // Shipping Address
  shippingAddress1: z.string()
    .min(5, 'Address must be at least 5 characters'),
  
  shippingAddress2: z.string().optional(),
  
  city: z.string()
    .min(2, 'City is required'),
  
  state: z.string()
    .min(2, 'State/Province is required'),
  
  country: z.string()
    .min(1, 'Please select a country'),
  
  postalCode: z.string()
    .min(3, 'Postal code is required')
    .max(10, 'Postal code is too long'),

  // Shipping Method
  shippingMethod: z.enum(['standard', 'express'], {
    required_error: 'Please select a shipping method',
  }),

  // Billing Address
  billingSameAsShipping: z.boolean().default(true),
  billingAddress1: z.string().optional(),
  billingAddress2: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingCountry: z.string().optional(),
  billingPostalCode: z.string().optional(),

  // Payment
  paymentMethod: z.enum(['card', 'paypal', 'cod'], {
    required_error: 'Please select a payment method',
  }),

  // Card Details (required only if payment method is 'card')
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),

  // Order Notes
  orderNotes: z.string()
    .max(300, 'Order notes cannot exceed 300 characters')
    .optional(),
})
.refine((data) => {
  // If billing is not same as shipping, billing address is required
  if (!data.billingSameAsShipping) {
    return data.billingAddress1 && data.billingAddress1.length >= 5;
  }
  return true;
}, {
  message: 'Billing address is required',
  path: ['billingAddress1'],
})
.refine((data) => {
  // If payment method is card, card details are required
  if (data.paymentMethod === 'card') {
    return data.cardName && data.cardNumber && data.cardExpiry && data.cardCvc;
  }
  return true;
}, {
  message: 'Card details are required for card payments',
  path: ['cardNumber'],
});
export const calculateTotals = (items, shippingMethod, discount = 0) => {
  const subtotal = items.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return total + (price * (item.quantity || 1));
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 500 : 200; // Example costs
  const taxRate = 0.07; // 7% tax
  const tax = subtotal * taxRate;
  
  const discountAmount = discount;
  const total = subtotal + shippingCost + tax - discountAmount;

  return {
    subtotal,
    shipping: shippingCost,
    tax,
    discount: discountAmount,
    total,
  };
};
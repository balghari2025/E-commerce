import React from "react";
import { useCart } from "./CartContex";
const newArrivalsData = [
  {
    id: 1,
    name: "Premium Almonds",
    price: "₨ 1,450",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 2,
    name: "Organic Walnuts",
    price: "₨ 1,800",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "Fresh Pistachios",
    price: "₨ 2,200",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "Natural Dates",
    price: "₨ 950",
    image: "https://via.placeholder.com/300x300",
  },
];

const NewArrivals = () => {
    const { addToCart } = useCart();
  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        🆕 New Arrivals
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {newArrivalsData.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="mt-4 text-lg font-semibold">
              {item.name}
            </h3>

            <p className="text-green-600 font-bold">
              {item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

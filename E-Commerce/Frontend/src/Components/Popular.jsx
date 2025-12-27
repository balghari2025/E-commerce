import React from "react";
import { useCart } from "./CartProvider";

import almondsImg from "../img/almonds.jpg";
import walnutsImg from "../img/walnuts.jpg";
import pistachiosImg from "../img/pistachios.jpg";
import datesImg from "../img/dates.jpg";

const popularProducts = [
  {
    id: 301,
    name: "Popular Almonds",
    price: "₨ 1,500",
    image: almondsImg,
    tag: "Popular",
  },
  {
    id: 302,
    name: "Most Loved Walnuts",
    price: "₨ 1,850",
    image: walnutsImg,
    tag: "Trending",
  },
  {
    id: 303,
    name: "Top Pistachios",
    price: "₨ 2,250",
    image: pistachiosImg,
    tag: "Hot",
  },
  {
    id: 304,
    name: "Customer Favorite Dates",
    price: "₨ 1,000",
    image: datesImg,
    tag: "Best",
  },
];

const Popular = () => {
  const { addToCart } = useCart();

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-600">
        ⭐ Popular Products
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {popularProducts.map((item) => (
          <div
            key={item.id}
            className="relative border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Tag Badge */}
            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              {item.tag}
            </span>

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

export default Popular;

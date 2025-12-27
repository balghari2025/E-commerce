import React from "react";
import { useCart } from "./CartProvider";

import almondsImg from "../img/almonds.jpg";
import walnutsImg from "../img/walnuts.jpg";
import pistachiosImg from "../img/pistachios.jpg";
import datesImg from "../img/dates.jpg";

const discountProducts = [
  {
    id: 201,
    name: "Almonds (20% OFF)",
    originalPrice: "₨ 1,450",
    discountPrice: "₨ 1,160",
    image: almondsImg,
    discount: "20%",
  },
  {
    id: 202,
    name: "Walnuts (15% OFF)",
    originalPrice: "₨ 1,800",
    discountPrice: "₨ 1,530",
    image: walnutsImg,
    discount: "15%",
  },
  {
    id: 203,
    name: "Pistachios (25% OFF)",
    originalPrice: "₨ 2,200",
    discountPrice: "₨ 1,650",
    image: pistachiosImg,
    discount: "25%",
  },
  {
    id: 204,
    name: "Dates (10% OFF)",
    originalPrice: "₨ 950",
    discountPrice: "₨ 855",
    image: datesImg,
    discount: "10%",
  },
];

const Discount = () => {
  const { addToCart } = useCart();

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
        💸 Discount Sale
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {discountProducts.map((item) => (
          <div
            key={item.id}
            className="relative border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
              {item.discount} OFF
            </span>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="mt-4 text-lg font-semibold">
              {item.name}
            </h3>

            <p className="text-gray-500 line-through">
              {item.originalPrice}
            </p>

            <p className="text-green-600 font-bold text-lg">
              {item.discountPrice}
            </p>

            <button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.discountPrice,
                  image: item.image,
                })
              }
              className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discount;

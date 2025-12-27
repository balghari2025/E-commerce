import React from "react";
import { useCart } from "./CartProvider";
import almondsImg from "../img/almonds.jpg";
import walnutsImg from "../img/walnuts.jpg";
import pistachiosImg from "../img/pistachios.jpg";
import datesImg from "../img/dates.jpg";

const bestSellersData = [
  {
    id: 101,
    name: "Best Almonds Pack",
    price: "₨ 1,550",
    image: almondsImg,
  },
  {
    id: 102,
    name: "Top Quality Walnuts",
    price: "₨ 1,900",
    image: walnutsImg,
  },
  {
    id: 103,
    name: "Hot Selling Pistachios",
    price: "₨ 2,350",
    image: pistachiosImg,
  },
  {
    id: 104,
    name: "Premium Dates Box",
    price: "₨ 1,050",
    image: datesImg,
  },
];

const BestSellers = () => {
  const { addToCart } = useCart();

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        🔥 Best Sellers
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bestSellersData.map((item) => (
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

export default BestSellers;

import React from 'react'
import { useCart } from "./CartProvider";

function OilandHealth() {
    const { addToCart } = useCart();
    const oilData = [
        {
            id: 1,
            name: "Apricot Kernel Oil (Khubani Oil)",
            price: "₨ 1,800",
            image: "https://m.media-amazon.com/images/I/81+Zt6NVkmL.jpg",
        },
        {
            id: 2,
            name: "Mustard Oil (Sarson ka Tail)",
            price: "₨ 750",
            image: "https://static-01.daraz.pk/p/5b1bf2805db6381c38a8a3d503041607.jpg"},
        {
            id: 3,
            name: "Walnut Oil (Akhrot Oil)",
            price: "₨ 2,200",
            image: "https://m.media-amazon.com/images/I/61TUAbT7n7S.jpg",
        },
        {
            id: 4,
            name: "Almond Oil (Badam Oil)",
            price: "₨ 2,500",
            image: "https://www.hamdard.in/patented-medicines/img/product/rogan-badam-shirin-1200x688.jpg",
        },
        {
            id: 5,
            name: "Sesame Oil (Til Oil)",
            price: "₨ 1,100",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCQKdptwWG9Wc8IzQDzZUelZezpNGiJwSk-A&s",
        },
        {
            id: 6,
            name: "Flaxseed Oil (Alsi Oil)",
            price: "₨ 1,400",
            image: "https://bioshop.pk/cdn/shop/files/Flaxseedoil.jpg?v=1745545756&width=1445",
        },
        {
            id: 7,
            name: "Coconut Oil",
            price: "₨ 1,300",
            image: "https://saeedghani.pk/cdn/shop/files/Coconutoil_8dc0669b-caca-42ed-98a9-414d054be9c6_1024x1024.webp?v=1759678136",
        },
    ];

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Oils & Health Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {oilData.map((oil) => (
                        <div key={oil.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={oil.image}
                                alt={oil.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{oil.name}</h3>

                                <p className="text-gray-600 font-medium mt-2">{oil.price}</p>
                            </div>
                            <div className="flex gap-2 p-4">
                                <button className="w-32 h-8 bg-green-600 text-white text-xs py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                    Add to Cart
                                </button>
                                <button className="w-32 h-9 bg-yellow-500 text-white text-xs py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                                    Show More
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OilandHealth

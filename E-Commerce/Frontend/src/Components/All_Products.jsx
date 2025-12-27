import React from "react";
import { useCart } from "./CartProvider"; 

const products = [
  {
    id: 1,
    name: "Black Cardamom (Badi Elaichi)",
    price: "₨ 1,250",
    image: "https://gbdryfruitsupplier.pk/wp-content/uploads/2024/09/Untitled-design-4-350x443.jpg.webp",
  },
  {
    id: 2,
    name: "Dried Ginger",
    price: "₨ 900 ",
    image: "https://rukminim2.flixcart.com/image/704/844/kialrww0-0/spice-masala/j/f/l/100-sonth-zingiber-officinale-dry-ginger-seed-pouch-kotaliya-original-imafy4hhgupt27pw.jpeg?q=90&crop=false",
  },
  {
    id: 3,
    name: "Herbs",
    price: "₨ 700",
    image: "https://www.allrecipes.com/thmb/iSvE3f2yih1tZLWUGW20fml9-B8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-223272-herbs-de-provence-DDMFS-4x3-e46ae8e6383c48b8bd33328e1555930d.jpg",
  },
  {
    id: 4,
    name: "Mamra Almond (Badam)",
    price: "₨ 2,800",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSackYDW0Pw2Xu4p-8Je8xUSo9VuPzzv3CzxA&s",
  },
  {
    id: 5,
    name: "Kaju (Cashew Nuts)",
    price: "₨ 2,800 ",
    image: "https://chandravilas.com/wp-content/uploads/2022/09/masalakaju-font1.jpg",
  },
  {
    id: 6,
    name: "Pistachios",
    price: "₨ 2,800 ",
    image: "https://static.fanpage.it/wp-content/uploads/sites/22/2018/09/pistachios.jpg",
  },
  {
    id: 7,
    name: "Fig",
    price: "₨ 2,800",
    image: "https://minnetonkaorchards.com/wp-content/uploads/2023/03/fig-tree-seeds-2.jpg",
  },
  {
    id: 8,
    name: "Raisins",
    price: "₨ 2,800",
    image: "https://www.healthbenefitstimes.com/9/gallery/raisins/Raisins-3.jpg",
  },
  {
    id: 9,
    name: "Dates",
    price: "₨ 2,800",
    image: "https://purepng.com/public/uploads/large/purepng.com-datesfruitsdatedatespalm-981525181195hx9lv.png",
  },
  {
    id: 10,
    name: "Coconut (Dried)",
    price: "₨ 2,800",
    image: "https://static.independent.co.uk/2022/09/02/09/11181047-27ecb272-8177-4b3a-bb72-2f12a0a11a3a.jpg",
  },
  {
    id: 11,
    name: "Dry Plums",
    price: "₨ 2,800",
    image: "https://harmainglobal.com/wp-content/uploads/2024/06/Dry-Plum-1.jpg",
  },
  {
    id: 12,
    name: "Dried Cherries",
    price: "₨ 2,800",
    image: "https://foodtolive.com/wp-content/uploads/2017/04/Organic_Dried_Cherries.jpg",
  },
  {
    id: 13,
    name: "Dried Tomatoes",
    price: "₨ 2,800",
    image: "https://i1.wp.com/frugalhausfrau.com/wp-content/uploads/2016/09/oven-dried-tomatoes-2.jpg?fit=1200%2C1156&ssl=1",
  },
  {
    id: 14,
    name: "Dried Prunes",
    price: "₨ 2,800",
    image: "https://www.thespruceeats.com/thmb/GsEQMD8Vri1y-aBwc-aU_8SLdnk=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/raw-organic-dry--prunes-1089810482-9d07ae69933e4161b7cf0d9f53f1188b.jpg",
  },
  {
    id: 15,
    name: "Sultanas (Raisins)",
    price: "₨ 2,800 ",
    image: "https://www.voicevale.com/wp-content/uploads/2018/02/SULTANAS-e1520618427989-1024x845.jpg",
  },
  {
    id: 16,
    name: "Musk Melon Seeds",
    price: "₨ 2,800 ",
    image: "http://themill.in/wp-content/uploads/2021/07/muskmelon-seed.jpg",
  },
];

const Products = () => {
  const { addToCart } = useCart(); // ✅ Access cart context

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 font-medium mt-2">{product.price}</p>
            </div>
            <div className="flex gap-2 p-4">
              {/* ✅ Working Add to Cart */}
              <button
                onClick={() => addToCart(product)}
                className="w-32 h-8 bg-green-600 text-white text-xs py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
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
  );
};

export default Products;

import React from 'react'
import { useCart } from "./CartContex";

function GrainandNfruits() {
    const { addToCart } = useCart();
    const grainsAndFruitsData = [
  {
    id: 1,
    name: "Buckwheat (Phapar)",
    price: "₨ 650",
    image: "https://junifoods.com/wp-content/uploads/2023/03/Buckwheat-Buckwheat-Crepe-Phapar-Ko-Roti-%E0%A4%AB%E0%A4%BE%E0%A4%AA%E0%A4%B0%E0%A4%95%E0%A5%8B-%E0%A4%B0%E0%A5%8B%E0%A4%9F%E0%A4%BF-300x300.jpeg",
  },
  {
    id: 2,
    name: "Barley (Jau)",
    price: "₨ 450",
    image: "https://www.dineshflourmills.com/cdn/shop/files/Untitled_design_10.png?v=1732360089",
  },
  {
    id: 3,
    name: "Brown Rice (Desi Chawal)",
    price: "₨ 550",
    image: "https://cdn.tarladalal.com/media/recipeuse/photo/2025/01/29/brown-rice-recipes.webp",
  },
  {
    id: 4,
    name: "Dry Apricots (Khubani)",
    price: "₨ 1,200",
    image: "https://punjabistore.com.pk/wp-content/uploads/2022/02/Khubani-Aprocit-1.jpg",
  },
  {
    id: 5,
    name: "Dried Mulberries (Shahtoot)",
    price: "₨ 900",
    image: "https://dryfruitsmart.pk/wp-content/uploads/2025/11/Dry-Mulberries-Shahtoot.webp",
  },
  {
    id: 6,
    name: "Raisins (Kishmish)",
    price: "₨ 800",
    image: "https://www.anaajpur.com/cdn/shop/products/raisin_gold_class_grande.jpg?v=1608010095g",
  },
  {
    id: 7,
    name: "Dried Apples",
    price: "₨ 950",
    image: "https://www.honestlymodern.com/wp-content/uploads/2020/09/Homemade-Dried-Apple-Chips-08.jpg",
  },
  {
    id: 8,
    name: "Dried Figs (Anjeer)",
    price: "₨ 1,700",
    image: "https://ayoubs.ca/cdn/shop/articles/dried_figs_520x500_520x500_2f44883e-6fe8-4993-b160-f7df8dcd8d3f_500x.png?v=1744047961",
  },
];

  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Grains & Dry Fruits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {grainsAndFruitsData.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"    
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.name}</h3>  
                            <p className="text-gray-600 font-medium mt-2">{item.price}</p>
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

export default GrainandNfruits

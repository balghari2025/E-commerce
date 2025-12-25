import React from 'react'
import { useCart } from "./CartContex";
function Specials() {
    const { addToCart } = useCart();
    const specialProductsData = [
  {
    id: 1,
    name: "Apricot Kernel Oil (GB Special)",
    price: "₨ 1,900",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZOPCp1RClHD0u7_ZAGcqXjwd5Q95t7Pckg&s",
  },
  {
    id: 2,
    name: "Organic Dry Apricots (Khubani)",
    price: "₨ 1,300",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD4DAn2JyukYaO06gmBoQx9IIXGqeo4AAxog&s",
  },
  {
    id: 3,
    name: "Dried Mulberries (Shahtoot – GB)",
    price: "₨ 950",
    image: "https://gbdigimart.com/wp-content/uploads/2023/12/black-sweet-mulberries.jpg",
  },
  {
    id: 4,
    name: "Walnut Kernels (Akhrot Maghaz)",
    price: "₨ 2,400",
    image: "https://alkhalis.pk/wp-content/uploads/2021/08/16-440x440.jpg",
  },
  {
    id: 5,
    name: "Mamra Almond (Premium)",
    price: "₨ 2,800",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSackYDW0Pw2Xu4p-8Je8xUSo9VuPzzv3CzxA&s",
  },
  {
    id: 6,
    name: "Raw Honey (Mountain Honey – GB)",
    price: "₨ 1,600",
    image: "https://www.therawhoneyshop.com/cdn/shop/files/preview_images/d47c0e164a964a70abb74fa5a9f10138.thumbnail.0000000000.jpg?v=1744896439&width=576",
  },
  {
    id: 7,
    name: "Flaxseed Oil (Cold Pressed)",
    price: "₨ 1,450",
    image: "https://bioshop.pk/cdn/shop/files/Flaxseedoil.jpg?v=1745545756&width=1445",
  },
  {
    id: 8,
    name: "Organic Raisins (Kishmish)",
    price: "₨ 850",
    image: "https://img.drz.lazcdn.com/static/pk/p/72252c903e8b3539c5811cf1fa226d73.jpg_960x960q80.jpg_.webp",
  },
];

  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Special Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {specialProductsData.map((item) => (
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
                            <button
                                    onClick={() => addToCart(item)} 
                             className="w-32 h-8 bg-green-600 text-white text-xs py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                
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

export default Specials

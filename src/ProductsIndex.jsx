import { CartedProductsNew } from "./CartedProductsNew"
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from "./context/CartContext";

export function ProductsIndex({products, onShow, onEdit, userActions}) {
  const [searchFilter, setSearchFilter] = useState("");
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const { cartItems } = useCart();

  const nextImage = (productId) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % products.find(p => p.id === productId).images_with_default.length
    }));
  };

  const prevImage = (productId) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + products.find(p => p.id === productId).images_with_default.length) % 
        products.find(p => p.id === productId).images_with_default.length
    }));
  };

  return(
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            value={searchFilter} 
            onChange={(event) => setSearchFilter(event.target.value)} 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                     placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 
                     focus:ring-green-700 focus:border-green-700 sm:text-sm"
            placeholder="Search products..."
          />
        </div>
      </div>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products
          .filter((product) => product.name.toLowerCase().includes(searchFilter.toLowerCase()))
          .map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-200">
                <img
                  src={product.images_with_default[currentImageIndexes[product.id] || 0].url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
                {product.images_with_default.length > 1 && (
                  <div className="absolute bottom-2 w-full flex justify-between items-center px-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(product.id);
                      }}
                      className="bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(product.id);
                      }}
                      className="bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-green-700 font-medium text-lg mb-1">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-normal text-sm">
                  {product.description}
                </p>

                <div className="space-y-2 pt-4">
                  {userActions.canAddToCart && (
                    <div className="pb-2">
                      <CartedProductsNew
                        product={product}
                        currentQuantity={cartItems[product.id]?.quantity || 0}
                      />
                    </div>
                  )}

                  <div className={`${userActions.canEdit ? 'pt-0' : 'pt-0.5'}`}>
                    {userActions.canAddToCart && (
                      <button
                        onClick={() => onShow(product)}
                        className="w-full bg-gray-100 text-green-700 px-4 py-2 rounded-md hover:bg-gray-200
                                  transition-colors duration-200"
                      >
                        More Info
                      </button>
                    )}

                    {userActions.canViewDetails && !userActions.canAddToCart && !userActions.canEdit && (
                      <button
                        onClick={() => onShow(product)}
                        className="w-full bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800
                                  transition-colors duration-200"
                      >
                        More Info
                      </button>
                    )}

                    {userActions.canEdit && (
                      <button
                        onClick={() => onEdit(product)}
                        className="w-full bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800
                                transition-colors duration-200"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
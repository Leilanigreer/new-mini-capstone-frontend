import { CartedProductsNew } from "./CartedProductsNew";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductsShow({ product, onAddToCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % product.images_with_default.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + product.images_with_default.length) % product.images_with_default.length
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-gray-100">
            <img
              src={product.images_with_default[currentImageIndex].url}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.images_with_default.length > 1 && (
              <div className="absolute bottom-2 w-full flex justify-between items-center px-2">
                <button 
                  onClick={prevImage}
                  className="bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button 
                  onClick={nextImage}
                  className="bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="p-6 flex flex-col">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <p className="text-2xl font-semibold text-green-700">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Supplier
                  </h2>
                  <p className="text-gray-600">
                    {product.supplier.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <CartedProductsNew
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
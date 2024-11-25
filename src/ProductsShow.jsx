import { CartedProductsNew } from "./CartedProductsNew";

export function ProductsShow({ product, onAddToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative aspect-square bg-gray-100">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No image available</span>
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
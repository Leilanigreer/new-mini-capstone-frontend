import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

export function ProductUpdate({ product, suppliers, onUpdate, onDestroy }) {
  const [imageUrls, setImageUrls] = useState(product.images_with_default.map(image => image.url))

  const addImage = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(product.id, params, () => event.target.reset());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Update Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={product.name}
              className="block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-green-700 focus:ring-green-700 sm:text-sm
                       p-2 border"
            />
          </div>

          <div>
            <label 
              htmlFor="price" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={product.price}
              className="block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-green-700 focus:ring-green-700 sm:text-sm
                       p-2 border"
            />
          </div>

          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              defaultValue={product.description}
              className="block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-green-700 focus:ring-green-700 sm:text-sm
                       p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <select 
              name="supplier_id" 
              defaultValue={product.supplier.id}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>  
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
              <button 
                type="button"
                onClick={addImage} 
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </button>
            </div>

            {imageUrls.map((url, index) => (
              <div key={index}>
                <input 
                  type="text"
                  name="image_urls[]"
                  defaultValue={url}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 
                     border border-transparent rounded-md shadow-sm text-sm 
                     font-medium text-white bg-green-700 hover:bg-green-800 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-green-700 transition-colors duration-200"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => onDestroy(product.id)}
            className="w-full inline-flex justify-center items-center px-4 py-2 
                     border border-transparent rounded-md shadow-sm text-sm 
                     font-medium text-white bg-red-600 hover:bg-red-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}
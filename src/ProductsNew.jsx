import { useState } from "react";
import apiClient from "./config/axios";
import { Plus } from "lucide-react";
import { useLoaderData } from "react-router-dom";

export function ProductsNew() {
  const [notification, setNotification] = useState(null);
  const [imageUrls, setImageUrls] = useState([""]);
  const suppliers = useLoaderData ();
  
  const addImage = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    
    apiClient.post("/products.json", params)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        const productName = params.get("name");
        setNotification({
          type: "success",
          message: `${productName} has been created successfully!`
        });
        event.target.reset();
        setTimeout(() => setNotification(null), 5000);
      });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h1>
      
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex justify-between items-center">
            <p>{notification.message}</p>
            <button onClick={handleCloseNotification} className="text-gray-500 hover:text-gray-700">x</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              name="name" 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              name="price" 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <select 
              name="supplier_id" 
              id="supplier_id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>  
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Product Images</h2>
            <button 
              type="button"
              onClick={addImage} 
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Image
            </button>
          </div>

          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <input 
                type="text" 
                name="image_urls[]" 
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
import { Link, useLoaderData } from "react-router-dom";
import { Calendar, ArrowLeft } from 'lucide-react';

export function OrdersShow() {
  const order = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(order.ordered_date).toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-lg font-medium">${parseFloat(order.subtotal).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tax</p>
              <p className="text-lg font-medium">${parseFloat(order.tax).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-medium text-green-700">${parseFloat(order.total).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {order.carted_products.map(cp => (
            <div key={cp.id} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{cp.product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">Quantity: {cp.product_quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Price per item: ${parseFloat(cp.purchased_price).toFixed(2)}</p>
                  <p className="text-lg font-medium text-green-700">Total: ${parseFloat(cp.total_carted_price).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-6">
          <Link 
            to="/orders" 
            className="inline-flex items-center text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
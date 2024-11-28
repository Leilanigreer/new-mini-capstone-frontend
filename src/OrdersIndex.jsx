import { Link, useLoaderData } from "react-router-dom";
import { Calendar, ArrowRight } from 'lucide-react';

export function OrdersIndex() {
  const orders = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium">Order #{order.id}</span>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(order.ordered_date).toLocaleDateString()}
                </div>
              </div>
              <Link 
                to={`/orders/${order.id}`}
                className="inline-flex items-center text-green-700 hover:text-green-800"
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}
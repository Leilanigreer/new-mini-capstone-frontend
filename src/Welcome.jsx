import { ShoppingBag, Truck, CreditCard, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WelcomePage() {
  const features = [
    {
      name: 'Easy Shopping',
      description: 'Browse through our carefully curated selection of products',
      icon: ShoppingBag
    },
    {
      name: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      icon: Truck
    },
    {
      name: 'Secure Payments',
      description: 'Safe and protected payment processing',
      icon: CreditCard
    },
    {
      name: 'Customer Love',
      description: 'Dedicated support and satisfaction guarantee',
      icon: Heart
    }
  ];

  // const categories = [
  //   { name: 'Electronics', image: '/api/placeholder/400/300' },
  //   { name: 'Clothing', image: '/api/placeholder/400/300' },
  //   { name: 'Home & Garden', image: '/api/placeholder/400/300' },
  //   { name: 'Sports & Outdoors', image: '/api/placeholder/400/300' }
  // ];

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative bg-gray-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <img
              src="/Shopping_4_US.png"
              alt="Shopping 4 US"
              className="h-32 mx-auto mb-8"
            />
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-green-700">Shopping 4 US</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your one-stop destination for all your shopping needs. Discover amazing products at great prices.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadoww-full sm:w-auto">
                <Link
                  to="/products"
                  className="w-full flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 md:text-lg md:px-10"
                >
                  Start Shopping
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 w-full sm:w-auto">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 md:text-lg md:px-10"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/products"
                className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg 
                         transition-shadow duration-300"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
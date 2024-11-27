import {createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"
import apiClient from "./config/axios";
import Header from "./components/layout/Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./components/layout/Footer";
import { SignupPage } from "./components/auth/SignupPage";
import { LoginPage } from "./components/auth/LoginPage";
import { CartedProductIndex } from "./CartedProductsIndex";
import { OrdersIndex } from "./OrdersIndex";
import { OrdersShow } from "./OrdersShow";
import { ProductsNew } from "./ProductsNew";
import { WelcomePage } from "./Welcome";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from './context/useAuth';



// Admin route wrapper
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Shopper route wrapper
const ShopperRoute = ({ children }) => {
  const { isShopper, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isShopper) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const authLoader = async (path) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return apiClient.get(path).then(response => response.data);
};

const Layout = () => {
  return (
    <div className="min-h-screen w-full flex-col">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const Router = () => {
    const router = createBrowserRouter([
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <WelcomePage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/products",
            element: <ProductsPage />,
            loader: async () => {
              const suppliers = await apiClient.get("/suppliers.json").then(response => response.data);
              
              let cartItems = {};
              try {
                const cartResponse = await apiClient.get("/carted_products.json");
                // Transform the cart data into a map of product_id -> product_quantity
                cartItems = cartResponse.data.reduce((acc, item) => {
                  acc[item.product.id] = item.product_quantity;
                  return acc;
                }, {});
              } catch (error) {
                console.error("Error loading cart:", error);
              }
              
              return { suppliers, cartItems };
            }
          },
          {
            path: "/carted_products",
            element: (
              <ShopperRoute>
                <CartedProductIndex />
              </ShopperRoute>
            ),
            loader: () => authLoader("/carted_products.json")
          },
          {
            path: "/orders",
            element: (
              <ShopperRoute>
                <OrdersIndex />
              </ShopperRoute>
            ),
            loader: () => authLoader("/orders.json")
          },
          {
            path: "/orders/:id",
            element: (
              <ShopperRoute>
                <OrdersShow />
              </ShopperRoute>
            ),
            loader: ({params}) => authLoader(`/orders/${params.id}.json`)
          },
          {
            path: "/products/new",
            element: (
              <AdminRoute>
                <ProductsNew />
              </AdminRoute>
            ),
            loader: () => authLoader("/suppliers.json")
          },
        ],
      }
    ]);

    return <RouterProvider router={router} />;
  }

  return (
    <AuthProvider>
      <div className="w-full min-h-screen overflow-x-hidden">
        <Router />
      </div>
    </AuthProvider>
  )
}

export default App;
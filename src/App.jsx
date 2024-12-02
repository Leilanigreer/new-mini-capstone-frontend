import {createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
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
import { shopperLoader, adminLoader, authLoader } from "./loaders/protectedLoaders";
import { AdminRoute, ShopperRoute } from "./components/auth/ProtectedRoutes";
import { CartProvider } from "./context/CartProvider";



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
              
              const token = localStorage.getItem('jwt');
              let cartItems = {};
              
              if (token) {
                try {
                  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const cartResponse = await apiClient.get("/carted_products.json");
                  cartItems = cartResponse.data.reduce((acc, item) => {
                    acc[item.product.id] = item.product_quantity;
                    return acc;
                  }, {});
                } catch (error) {
                  console.error("Error loading cart:", error);
                  if (error.response?.status === 401) {
                    localStorage.removeItem('jwt');
                    delete apiClient.defaults.headers.common["Authorization"];
                  }
                }
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
            loader: shopperLoader(() => authLoader("/carted_products.json"))
          },
          {
            path: "/orders",
            element: (
              <ShopperRoute>
                <OrdersIndex />
              </ShopperRoute>
            ),
            loader: shopperLoader(() => authLoader("/orders.json"))
          },
          {
            path: "/orders/:id",
            element: (
              <ShopperRoute>
                <OrdersShow />
              </ShopperRoute>
            ),
            loader: shopperLoader(({params}) => authLoader(`/orders/${params.id}.json`))
          },
          {
            path: "/products/new",
            element: (
              <AdminRoute>
                <ProductsNew />
              </AdminRoute>
            ),
            loader: adminLoader(() => authLoader("/suppliers.json"))
          }
        ],
      }
    ]);

    return <RouterProvider router={router} />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="w-full min-h-screen overflow-x-hidden">
          <Router />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
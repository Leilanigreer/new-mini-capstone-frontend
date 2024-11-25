import {createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import apiClient from "./config/axios";
import Header from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { CartedProductIndex } from "./CartedProductsIndex";
import { OrdersIndex } from "./OrdersIndex";
import { OrdersShow } from "./OrdersShow";
import { ProductsNew } from "./ProductsNew";
import { WelcomePage } from "./Welcome";

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
      loader: () => apiClient.get("/suppliers.json").then(response => response.data)
    }, 
    {
      path: "/carted_products",
      element: <CartedProductIndex />,
      loader: () => apiClient.get("/carted_products.json").then(response => response.data)
    },
    {
      path: "/orders",
      element: <OrdersIndex />,
      loader: () => apiClient.get("/orders.json").then(response => response.data)
    },
    {
      path: "/orders/:id",
      element: <OrdersShow />,
      loader: ({params}) => apiClient.get(`/orders/${params.id}.json`).then(response => response.data)
    },
    {
      path: "/products/new",
      element: <ProductsNew />,
      loader: () => apiClient.get("/suppliers.json").then(response => response.data)
    },
  ],
}]);

function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
    <RouterProvider router={router} />
    </div>
    )
}

export default App;
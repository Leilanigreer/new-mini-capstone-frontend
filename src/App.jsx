import {createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import axios from "axios"

import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";
import { LogoutLink } from "./LogoutLink";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { CartedProductIndex } from "./CartedProductsIndex";
import { OrdersIndex } from "./OrdersIndex";

const router = createBrowserRouter([
  {
  element: (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
  children: [
    {
      path: "/signup",
      element: <SignupPage />,
    }, 
    {
      path: "/login",
      element: <LoginPage />,
    }, 
    {
      path: "/",
      element: <ProductsPage />,
    }, 
    {
      path: "/carted-products",
      element: <CartedProductIndex />,
      loader: () => axios.get("http://localhost:3000/carted-products.json").then(response => response.data)
    },
    {
      path: "/orders",
      element: <OrdersIndex />,
      loader: () => axios.get("http://localhost:3000/orders.json").then(response => response.data)
    }
  ]
}])

function App() {
  return (
    <div className="container">
    <RouterProvider router={router} />
    </div>
    )
}

export default App;
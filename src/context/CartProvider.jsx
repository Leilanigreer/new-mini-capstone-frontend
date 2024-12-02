import { useState, useCallback } from "react";
import apiClient from "../config/axios";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCartItems = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    
    try {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await apiClient.get("/carted_products.json");
      const newCartItems = response.data.reduce((acc, item) => {
        acc[item.product.id] = {
          quantity: item.product_quantity,
          status: item.status,
          id: item.id
        };
        return acc;
      }, {});
      setCartItems(newCartItems);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt');
        delete apiClient.defaults.headers.common["Authorization"];
        setCartItems({});
      }
    }
  }, []);

  const updateCartItems = useCallback(async (productId, quantity) => {
    setLoading(true);
    const token = localStorage.getItem('jwt');
    if (!token) return;
  
    try {
      const cartEntry = cartItems[productId];
      
      if (cartEntry) {
        await apiClient.patch(`/carted_products/${cartEntry.id}.json`, {
          product_quantity: quantity
        });
      } else {
        await apiClient.post("/carted_products.json", {
          product_id: productId,
          product_quantity: quantity
        });
      }
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false);
    }
  }, [cartItems, fetchCartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems,
      loading,
      updateCartItems,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
}
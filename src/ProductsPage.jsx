import { useState, useEffect } from 'react';
import apiClient from "./config/axios";
import { ProductsIndex } from './ProductsIndex';
import { ProductShowModal } from './ProductShowModal';
import { ProductsShow } from './ProductsShow';
import { ProductUpdateModal } from './ProductUpdateModal';
import { ProductUpdate } from './ProductUpdate';
import { useLoaderData } from 'react-router-dom';
import { useAuth } from './context/useAuth';

export function ProductsPage() {
  const { suppliers, cartItems: initialCartItems } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState (initialCartItems || {});
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isProductsEditVisable, setIsProductsEditVisable] = useState(false);
  const {isAdmin, isShopper} = useAuth();

  console.log(cartItems);
  console.log(initialCartItems);
  console.log(suppliers);

  const userActions = {
    canEdit: isAdmin,
    canAddToCart: isShopper,
    canViewDetails: true
  };

  const handleAddToCart = (cartedProduct) => {
    setCartItems(prev => ({
      ...prev,
      ...(cartedProduct.product_quantity === 0 
        ? { [cartedProduct.product_id]: undefined } 
        : { [cartedProduct.product_id]: cartedProduct.product_quantity })
    }));
  };

  const handleIndex = () => {
    apiClient.get("/products.json").then((response) => {
      setProducts(response.data);
    });
  };

  const handleShow = ( product ) => {
    // console.log("handleShow", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleEdit = (product) => {
    setIsProductsEditVisable(true);
    setCurrentProduct(product);
  };
  

  const handleUpdate = ( id, params, successCallback ) =>{
    // console.log("handleUpdate", params);
    apiClient.patch(`/products/${id}.json`, params).then((response) => {
      setProducts(
        products.map((product) => {
          if (product.id === response.data.id) {
            return response.data;
          } else {
            return product;
          } 
        })
      );
      successCallback();
      handleCloseEdit();
    });
  };

  const handleDestroy = (id) => {
    // console.log("handleDestroy", id);
    apiClient.delete(`/products/${id}.json`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
      handleCloseEdit();
    });
  };
  
  const handleCloseShow = () => {
    // console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  const handleCloseEdit = () => {
    setIsProductsEditVisable(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsIndex 
        products={products}
        cartItems={cartItems}
        onShow={handleShow}
        onEdit={handleEdit} 
        onAddToCart={handleAddToCart}
        userActions={userActions}
      />
      <ProductShowModal show={isProductsShowVisible} onClose={handleCloseShow}>
        <ProductsShow 
        product={currentProduct}
        cartItems={cartItems} 
        onAddToCart={handleAddToCart}
        userActions={userActions} 
        />
      </ProductShowModal>
      <ProductUpdateModal edit={isProductsEditVisable} onClose={handleCloseEdit}>
        <ProductUpdate 
          product={currentProduct} 
          suppliers={suppliers} 
          onUpdate={handleUpdate} 
          onDestroy={handleDestroy} />
      </ProductUpdateModal>
    </main>
  );
}
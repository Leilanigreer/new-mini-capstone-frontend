import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import { ProductShowModal } from './ProductShowModal';
import { ProductsShow } from './ProductsShow';
import { ProductUpdateModal } from './ProductUpdateModal';
import { ProductUpdate } from './ProductUpdate';

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [cartedItems, setCartedItems] = useState ([])
  const [isProductsEditVisable, setIsProductsEditVisable] = useState(false)

  const handleIndex = () => {
    axios.get("http://localhost:3000/products.json").then((response) => {
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
    axios.patch(`http://localhost:3000/products/${id}.json`, params).then((response) => {
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
    axios.delete(`http://localhost:3000/products/${id}.json`).then(() => {
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

  const handleAddToCart = (cartedProduct) => {
    setCartedItems([...cartedItems, cartedProduct]);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsIndex 
        products={products} 
        onShow={handleShow}
        onEdit={handleEdit} 
        onAddToCart={handleAddToCart}
        />
      <ProductShowModal show={isProductsShowVisible} onClose={handleCloseShow}>
        <ProductsShow product={currentProduct} onUpdate={handleUpdate} onDestroy={handleDestroy} />
      </ProductShowModal>
      <ProductUpdateModal edit={isProductsEditVisable} onClose={handleCloseEdit}>
        <ProductUpdate product={currentProduct} onUpdate={handleUpdate} onDestroy={handleDestroy} />
      </ProductUpdateModal>
    </main>
  );
}
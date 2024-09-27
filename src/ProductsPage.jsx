import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import { ProductsNew } from './ProductsNew';
import { Modal } from './Model';
import { ProductsShow } from './ProductsShow';

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/products.json").then((response) => {
      setProducts(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    console.log("handleCreate");
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      setProducts([...products, response.data]);
      successCallback();
    });
  };

  const handleShow = ( product ) => {
    console.log("handleShow", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate} />
      <ProductsIndex products={products} onShow={handleShow} />
      <Modal show={isProductsShowVisible} onClose={handleClose}>
        <ProductsShow product={currentProduct}/>
      </Modal>
    </main>
  );
}
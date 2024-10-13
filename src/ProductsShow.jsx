import { CartedProductsNew } from "./CartedProductsNew";

export function ProductsShow({ product, onAddToCart }) {
  
  return (
    <div>
      <h1>Product information</h1>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Supplier: {product.supplier.name}</p>
      <br></br>
      <CartedProductsNew
          product={product}
          onAddToCart={onAddToCart}
          />
    </div>
  );
}
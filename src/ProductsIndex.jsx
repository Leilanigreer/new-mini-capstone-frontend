import { CartedProductsNew } from "./CartedProductsNew"
import { useState } from "react";

export function ProductsIndex({products, onShow, onAddToCart, onEdit}) {
  // console.log('hello')
  const [searchFilter, setSearchFilter] = useState("");

  return(
    <div>
      {/* <h1>Hello All</h1> */}
      Search filter: <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
      {products.filter((product) => product.name.toLowerCase().includes(searchFilter.toLocaleLowerCase())).map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <img src={product.images[0] && product.images[0].url} />
          <button onClick={() => onShow(product)}>More info</button>
          <button onClick={() => onEdit(product)}>Edit</button>
          <CartedProductsNew
          product={product}
          onAddToCart={onAddToCart}
          />
        <hr />
        </div>
      ))}
    </div>
  );
}
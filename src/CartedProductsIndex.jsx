import { useLoaderData } from "react-router-dom";
import axios from "axios";

export function CartedProductIndex () {
  const carted_products = useLoaderData();
  console.log(carted_products);

  const handleCheckout = (event) => {
    event.preventDefault();
    console.log("handle Checkout")
    axios.post("http://localhost:3000/orders.json")
  }

  return (
    <div>
      <h2>Today you are purchasing:</h2>
      <br></br>
      <div>
        {carted_products.map(cp => (
          <div key={cp.id}>
            <p>Product: {cp.product.name}</p>
            <p>Cost: ${cp.product.price}</p>
            <p>Quantity: ${cp.product_quantity}</p>
            <p>Sum for {cp.product.name}: ${cp.total_carted_price}</p>
            <br></br>
          </div>
        ))}
        </div>
        <button onClick={handleCheckout}> Checkout </button>
      </div>
  );
};
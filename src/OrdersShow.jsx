import { useLoaderData } from "react-router-dom";

export function OrdersShow () {
  const order = useLoaderData () ;
  console.log(order);

  return (
    <div>
      <h3>Hello, this is a single order</h3>
      <div>
        <p>order #: {order.id}</p>
        <p>Order Date: {order.ordered_date}</p>
        <p>Subtotal: {order.subtotal}</p>
        <p>Tax: {order.tax}</p>
        <p>Total: {order.total}</p>
        <hr />
        {order.carted_products.map(cp => (
          <div key={cp.id}>
            <p>Product: {cp.product.name}</p>
            <p>Quantity: {cp.product_quantity}</p>
            <p>Cost per item: ${cp.purchased_price}</p>
            <p>Item Total: ${cp.total_carted_price}</p>
            <hr />
          </div>
        ))}
        <hr />
      </div>
    </div>
  )
}
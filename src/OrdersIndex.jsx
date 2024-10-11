import { Link, useLoaderData } from "react-router-dom";

export function OrdersIndex () {
  const orders = useLoaderData ();
  console.log(orders)

  return (
    <div>
      <h2>Hello I am your orders page</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order Number: {order.id}</p>
          <p>Order Date: {order.ordered_date}</p>
          <p>Subtotal: {order.subtotal}</p>
          <p>Tax: {order.tax}</p>
          <p>Total: {order.total}</p>
          <Link to={`/orders/${order.id}`}>See details</Link>
          <br></br>
        </div>
      ))}
    </div>
  )
}
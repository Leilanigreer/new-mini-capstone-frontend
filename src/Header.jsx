import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <a href="/">Home</a> | <Link to="/products">Browse</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/carted_products">Shopping Cart</Link> | <Link to="/orders">My Orders</Link> | <Link to="/logout">Log Out</Link> | <Link to="/products/new">Create new product</Link>
      </nav>
    </header>
  )
}
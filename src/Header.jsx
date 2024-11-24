import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useEffect, useState } from "react";
import apiClient from "./config/axios";



export function Header() {
  const [currentUser, setCurrentUser] = useState ({})

  const getUserData = () => {
    // console.log("getting user data")
    apiClient.get("/current.json").then(response => {
      console.log(response.data)
      setCurrentUser(response.data)
    })
  }

  useEffect(getUserData, [])

  let authenticationLinks;
  // let user;
  
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <>
      <Link to="/signup">Signup</Link> | 
      <Link to="/login">Login</Link> 
      </>
    )
  } else {
    authenticationLinks = (
        <LogoutLink /> 
    )
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <a className="navbar-brand" href="#">Shopping 4 Us</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/products">Browse</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/carted_products">Shopping Cart</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/orders">My Orders</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/products/new">Create new product</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/products/new">Create new product</a>
      </li>

      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><hr className="dropdown-divider"></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </li> */}
      <li className="nav-item">
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    {/* <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form> */}
  </div>
</div>
{/* 
        <a href="/">Home</a> | <Link to="/products">Browse</Link> | <Link to="/carted_products">Shopping Cart</Link> | <Link to="/orders">My Orders</Link> | <Link to="/products/new">Create new product</Link> | {authenticationLinks} */}
      </nav>
      <h2>Hello, {currentUser.name} </h2>
    </header>
  )
}


{/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
</nav> */}
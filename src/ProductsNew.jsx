import { useState } from "react";
import axios from "axios";


export function ProductsNew(){
  const [notification, setNotification] = useState(null)
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const params = new FormData(event.target);

    axios.post("http://localhost:3000/products.json", params)
    .then(response => {
      const productName = params.get("name");
      setNotification({
        type: "success",
        message: `${productName} has been created successfully!`
      });
      event.target.reset();
      setTimeout(() => setNotification(null), 5000)
    })
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return(
    <div>
      <h1>Make a new product here:</h1>
      {notification && (
        <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
          {notification.message}
          <button type="button" className="btn-close" onClick={handleCloseNotification}  aria-label="Close"></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Price: <input name="price" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text"/>
        </div>
        <div>
          Supplier ID: <input name="supplier_id" type="text"/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Add product</button>
        </div>
      </form>
    </div>
  );
}
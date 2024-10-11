import axios from "axios";
export function ProductsNew(){
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const params = new FormData(event.target);
    axios.post("http://localhost:3000/products.json", params)
  };


  return(
    <div>
      <h1>Make a new product here:</h1>
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
          <button type="submit">Add product</button>
        </div>
      </form>
    </div>
  );
}
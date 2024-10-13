// import { useLoaderData } from "react-router-dom";

export function ProductUpdate ( {product, onUpdate, onDestroy} ) {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(product.id, params, () => event.target.reset());
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={product.name} name="name" type="text" />
        </div>
        <div>
          Price: <input defaultValue={product.price} name="price" type="text" />
        </div>
        <div>
          Description: <input defaultValue={product.description} name="description" type="text"/>
        </div>
        <div>
          ID: <input defaultValue={product.id} name="id" type="text"/>
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
      <br></br>
      <button onClick={() => onDestroy(product.id)}>Destroy</button>
    </div>
  );
}
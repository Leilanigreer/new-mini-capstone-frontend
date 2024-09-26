export function ProductsNew( { onCreate }){
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.resest())
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
          Main Image: <input name="url" type="text"/>
        </div>
        <div>
          <button type="submit">Add product</button>
        </div>
      </form>
    </div>
  );
}
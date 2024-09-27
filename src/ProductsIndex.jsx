export function ProductsIndex({products, onShow}) {
  // console.log('hello')
  return(
    <div>
      {/* <h1>Hello All</h1> */}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <img src={product.images[0] && product.images[0].url} />
          <button onClick={() => onShow(product)}>More info</button>
        </div>
      )
    )}
    </div>
  )
}
const getProducts = async () => {
  //Si es primera vez que se ejecuta la función, se almacena en el localStorage
  //Si no es la primera vez, se obtiene del localStorage

  const products = localStorage.getItem('products');
  if (products) {
    return JSON.parse(products);
  }
  const response = await fetch('https://ecommercebackend.fundamentos-29.repl.co/');
  const data = await response.json();
  localStorage.setItem('products', JSON.stringify(data));
  return data;
};

export default getProducts;
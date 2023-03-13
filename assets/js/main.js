import loader from "./components/loader.js";
import showMenu from "./components/showMenu.js";
import showCart from "./components/showCart.js";
import getProducts from "./helpers/getProducts.js";
import products from "./components/products.js";
import cart from "./components/cart.js";
import showLogin from "./components/showLogin.js";
import login from "./components/login.js";

//despues de 3 segundos ejecuatar loader
loader();
showMenu();
showCart();
showLogin();
//Productos

const {db, drawProducts} =products(await getProducts());

cart(db, drawProducts)
login();
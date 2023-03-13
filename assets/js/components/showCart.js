const showCart = () => {
  const btnCart = document.querySelector(".btn__cart");
  const cart = document.querySelector(".cart");

  cart.addEventListener("click", (e) => {
    if (e.target.closest(".btn__close")) {
      cart.classList.remove("show__cart");
    }
  });

  btnCart.addEventListener("click", () => {
    cart.classList.toggle("show__cart");
  });
};

export default showCart;

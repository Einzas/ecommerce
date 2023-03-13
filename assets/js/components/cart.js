const cart = (db, drawProducts) => {
  let cart = [];
  //Dom elements
  const productsDOM = document.querySelector(".products__container");
  const notifyDOM = document.querySelector(".notify");
  const cartDOM = document.querySelector(".cart__body");
  const countDOM = document.querySelector(".cart__count__item");
  const totalDOM = document.querySelector(".cart__total__item");
  const checkoutDOM = document.querySelector(".btn__buy");

  const printCart = () => {
    let htmlCart = "";
    if (cart.length === 0) {
      htmlCart = `<div class="cart__empty">
            <i class="bx bx-cart"></i>
            <p class="cart__empty__text">No hay productos en el carrito</p>
        </div>`;
      notifyDOM.classList.remove("show__notify");
    } else {
      cart.forEach((item) => {
        const product = db.find((product) => product.id === item.id);
        htmlCart += `
                <article class="article">
                    <div class="article__image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="article__content">
                        <h3 class="article__title">${product.name}</h3>
                        <span class="article__price">${product.price}</span>
                        <div class="article__quantity">
                            <button type="button" data-id="${item.id}" class="article__quiantity__btn article__minus">
                                <i class="bx bx-minus"></i>
                            </button>
                            <span class="article__quantity__text">${item.qty}</span>
                            <button type="button" data-id="${item.id}" class="article__quiantity__btn article__plus">
                                <i class="bx bx-plus"></i>
                            </button>
                        </div>
                        <button type="button" data-id="${item.id}" class="article__btn remove__from__cart">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                </article>    
                `;
      });
      notifyDOM.classList.add("show__notify");
    }
    cartDOM.innerHTML = htmlCart;
    notifyDOM.innerHTML = showItemsCount();
    countDOM.innerHTML = showItemsCount();
    totalDOM.innerHTML = showTotalPrice();
  };

  const addToCart = (id, qty = 1) => {
    const money = localStorage.getItem("money");
    const product = db.find((product) => product.id === id);
    if (money < product.price) {
      alert("No tienes suficiente dinero");
    } else {

      const item = cart.find((item) => item.id === id);
      if (!item) {
        cart.push({ id, qty });
      } else {
        item.qty += 1;
      }
      printCart();
    }
  };

  const removeOneFromCart = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item.qty > 1) {
      item.qty -= 1;
    } else {
      removeFromCart(id);
    }
    printCart();
  };

  const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    printCart();
  };

  const showItemsCount = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    return count;
  };

  const showTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      const product = db.find((product) => product.id === item.id);
      total += product.price * item.qty;
    });
    return total;
  };

  const checkout = () => {
    if(cart.length === 0){ 
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No hay productos en el carrito",
        timer: 1500,
        showConfirmButton: false,


      }).then(() => {
        return;
      });
      return;
     }
    if(pay(showTotalPrice())){
      
      cart.forEach((item) => {
        const product = db.find((product) => product.id === item.id);
        product.quantity -= item.qty;
      });
      localStorage.setItem("products", JSON.stringify(db));
      cart = [];
      printCart();
      drawProducts();
    }else{
      return;
    }
  };

  /* Events */
  productsDOM.addEventListener("click", (e) => {
    if (e.target.closest(".add__to__cart")) {
      const id = +e.target.closest(".add__to__cart").dataset.id;
      if (db.find((item) => item.id === id).quantity === 0) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No hay stock disponible",
            });
        return;
      }
      if (
        cart.find((item) => item.id === id) === undefined &&
        db.find((item) => item.id === id).quantity > 0
      ) {
        addToCart(id);
      } else {
        if (
          cart.find((item) => item.id === id).qty <
          db.find((item) => item.id === id).quantity
        ) {
          addToCart(id);
        }
      }
    }
  });

  cartDOM.addEventListener("click", (e) => {
    if (e.target.closest(".remove__from__cart")) {
      const id = +e.target.closest(".remove__from__cart").dataset.id;
      removeFromCart(id);
    }
    if (e.target.closest(".article__minus")) {
      const id = +e.target.closest(".article__minus").dataset.id;
      removeOneFromCart(id);
    }
    if (e.target.closest(".article__plus")) {
      const id = +e.target.closest(".article__plus").dataset.id;
      if (
        cart.find((item) => item.id === id).qty <
        db.find((item) => item.id === id).quantity
      ) {
        addToCart(id);
      }
    }
  });

  checkoutDOM.addEventListener("click", () => {
    checkout();
  });

  printCart();
};

const pay = (money) => {
  let actualMoney = localStorage.getItem("money");
  actualMoney = parseInt(actualMoney);
  money = parseInt(money);

  console.log(actualMoney);
  if(actualMoney < money){
    alert("No tienes suficiente dinero");
    return false;
  }else{
    
    discountMoney(money);
    return true;
  }

}

const discountMoney = async (money) => {
  let actualMoney = localStorage.getItem("money");
  console.log(money);
  actualMoney = parseInt(actualMoney);
  const id = decoderToken(localStorage.getItem("token")).id;
  const response = await fetch(`http://carrito.herokuapp.com/api/v1/auth/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token" : localStorage.getItem("token")
    },
    body: JSON.stringify({
      money: (actualMoney - money)
    }),
  }).then((response) => {
     localStorage.setItem("money", (actualMoney - money));
     window.location.reload();
  });

}

const decoderToken= (token) => {

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}



export default cart;

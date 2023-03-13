const products= (products) => { 
    const db = [...products];
    let session = localStorage.getItem("login");
    const drawProducts = () => {
        const productsDOM = document.querySelector(".products__container");
        let htmlProducto ='';
    
        db.forEach((producto) => {
            htmlProducto += `
            <article class="product">
                <div class="product__image">
                    <img src="${producto.image}" alt="${producto.name}">
                    
                </div>
                <div class="product__content">
                    ${ session == null ? "":`<button type="button" data-id="${producto.id}" class="product__btn add__to__cart">
                    <i class="bx bx-cart-add"></i>
                </button>` } 
                    <span class="product__price">$${producto.price}</span>
                    <span class="product__stock">Disponibles: ${producto.quantity}</span>
                    <h3 class="product__title">${producto.name}</h3>
                    
                </div>
                
                
            </article>
            `;
        });
        
        productsDOM.innerHTML = htmlProducto;
    }
    drawProducts();

    return {
        db,
        drawProducts
    }
    
}

export default products;    
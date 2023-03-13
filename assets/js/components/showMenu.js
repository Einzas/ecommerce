const showMenu = () => {
    const nav = document.querySelector('.nav');
    const menu = document.querySelector('.nav__menu');
    const login = document.querySelector('.login');
    const cart = document.querySelector('.cart');
    nav.addEventListener('click', (e) => {
        if(e.target.closest('.btn__menu')) {
            menu.classList.toggle('show__menu');
            login.classList.remove('show__login');
            cart.classList.remove('show__cart');
        }
        if(e.target.closest('.btn__close')) {
            menu.classList.remove('show__menu');
        }

        if(e.target.closest('.nav__link')) {
            menu.classList.remove('show__menu');
        }
        //Si el menu esta abierto y se hace click en el logo, se cierra el menu
        

        if(e.target.closest('.nav__logo')) {
            menu.classList.remove('show__menu');
        }
        if(e.target.closest('.btn__cart')) {
            menu.classList.remove('show__menu');
            login.classList.remove('show__login');

        }
        if(e.target.closest('.btn__login')) {
            menu.classList.remove('show__menu');
            cart.classList.remove('show__cart');
        }

    });
}

export default showMenu;
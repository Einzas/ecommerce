const showMenu = () => {
    const nav = document.querySelector('.nav');
    const menu = document.querySelector('.nav__menu');

    nav.addEventListener('click', (e) => {
        if(e.target.closest('.btn__menu')) {
            menu.classList.toggle('show__menu');
        }
        if(e.target.closest('.btn__close')) {
            menu.classList.remove('show__menu');
        }

        if(e.target.closest('.nav__link')) {
            menu.classList.remove('show__menu');
        }
    });
}

export default showMenu;
const showLogin = () => {
    const btnLogin = document.querySelector('.btn__login');
    const login = document.querySelector('.login');
    const menu = document.querySelector('.nav__menu');
    login.addEventListener('click', (e) => {
        if (e.target.closest('.btn__close')) {
            login.classList.remove('show__login');
        }
        if(e.target.closest('.btn__cart')) {
            login.classList.remove('show__login');
        }
        
    });

    btnLogin.addEventListener('click', () => {
        login.classList.toggle('show__login');
        
    });


}

export default showLogin;         
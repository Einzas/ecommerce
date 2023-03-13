const login = () => {
    const loginDOM = document.querySelector('.login__body');
    const loginTitleDOM = document.querySelector('.login__title');
    const user = localStorage.getItem('user');
    const money = localStorage.getItem('money');
    const printLogin =() => {
        let letHtml = '';
        
        if (localStorage.getItem('login') === null) {
            letHtml = `<form action="#"  class="form" method="get">
            <label for="email">Correo</label>
            <input class="form-control" type="email" name="email" id="email">
            <label for="password">Contraseña</label>
            <input class="form-control" type="password" name="password" id="password">
            <input class="btn btn-danger" type="submit" id="guardar" onclick="login()" value="Iniciar Sesión">
            </form>
            <input class="btn btn-success mt-5 btn__logout" type="submit" id="crear" onclick="crear()" value="Crear Cuenta">

        `;	
        } else {
            loginTitleDOM.innerHTML = `Bienvenido <b>${user} </b>`;
            letHtml = `     
            <h4 class="login__title mt-3">Saldo Actual: <b>${money} </b></h4>    
             
              
             <input class="btn btn-success mt-5 btn__logout" type="submit" id="dolar" onclick="anadir()" value="Añadir Fondos">
             <input class="btn btn-warning mt-2 btn__logout" type="submit" id="editar" onclick="editar()" value="Editar Datos">
             <input class="btn btn-danger mt-2 btn__logout" type="submit" id="salir" onclick="logOut()" value="Cerrar Sesión">
            `;	

        }
        loginDOM.innerHTML = letHtml;
        window.addEventListener('load', () => {
            const form = document.querySelector('.form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
            });
        });
    }
    printLogin();
    
}




export default login;
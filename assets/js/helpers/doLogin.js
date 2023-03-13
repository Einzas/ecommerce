const login = () => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const doLogin = async () => {
    const form = document.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const response = await fetch("https://carrito.herokuapp.com/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),

    });

    const data = await response.json();

    if (data.auth === true) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("login", true);
      localStorage.setItem("user", data.user);
      localStorage.setItem("money", data.money);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Iniciaste sesión correctamente",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      
      setInterval(() => {
        window.location.href = "./";
      }, 1600);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  doLogin();
};

const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  localStorage.removeItem("user");
  localStorage.removeItem("money");
  window.location.reload();
};

const editar =() => {
    const id = decoderToken().id; 
    location.href = `auth.html?id=${id}`;
}

const crear=() => {
    location.href = `auth.html`;
}
const anadir = () => {
    const money = localStorage.getItem('money');
    const {id} = decoderToken();
    const addMoney = async () => {
        const response = await fetch(`https://carrito.herokuapp.com/api/v1/auth/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                money: parseInt(money) + 50
            })
        }).then(res => {
            if(res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Felicidades',
                    text: 'Has recibido $50 en creditos',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                localStorage.setItem('money', parseInt(money) + 50);
                setInterval(() => {
                    window.location.reload();
                }, 1600);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        })
    }
    addMoney();
}

const decoderToken = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));

}

const encoder = (data) => {
    const base64 = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    return base64;
}
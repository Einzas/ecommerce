window.addEventListener("load", () => {
  const title = document.querySelector(".title");

  if (window.location.href.indexOf("?id") > -1) {
    if (localStorage.getItem("login") === null) {
      location.href = "index.html";
    }
    title.innerHTML = "Editar Usuario";

    buscarId();
  } else {
    title.innerHTML = "Crear Usuario";
  }
  const form = document
    .querySelector("#form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });
});

const sendForm = document
  .querySelector(".send")
  .addEventListener("click", () => {
    const name = document.querySelector("#user");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    if (
      name.value === "" ||
      email.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (password.value.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe tener al menos 6 caracteres",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (password.value !== confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
    }

    if (window.location.href.indexOf("?id") > -1) {
      editar();
    } else {
      crear();
    }
  });

const volver = () => {
  location.href = "../";
};

const editar = () => {
  const id = decoderToken().id;
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirmPassword");
  if (password.value === confirmPassword.value) {
    const response = fetch(
      `https://carrito.herokuapp.com/api/v1/users/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      }
    );
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: "Sus datos fueron cambiados correctamente",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    setInterval(() => {
      location.href = "../";
    }, 1600);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const buscarId = async () => {
  const id = decoderToken().id;
  const response = await fetch(
    `https://carrito.herokuapp.com/api/v1/auth/user/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }
  );
  const data = await response.json();
  const name = document.querySelector("#user");

  const email = document.querySelector("#email");

  name.value = data.name;
  email.value = data.email;
};

const crear = () => {
  const name = document.querySelector("#user");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirmPassword");
  if (
    password.value.length < 6 ||
    password.value === "" ||
    confirmPassword.value === "" ||
    name.value === "" ||
    email.value === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos son obligatorios",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    if (password.value === confirmPassword.value) {
      const response = fetch(
        `https://carrito.herokuapp.com/api/v1/auth/user/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        }
      ).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Usuario creado correctamente, por favor inicie sesion",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setInterval(() => {
          location.href = "../";
        }, 1600);
      });
    }
  }
};

const decoderToken = () => {
  const token = localStorage.getItem("token");
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

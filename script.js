const flipForm = document.querySelector(".flip-form");
const toLoginBtn = document.getElementById("toLoginBtn");
const toRegisterBtn = document.getElementById("toRegisterBtn");

toRegisterBtn.addEventListener("click", () => {
  flipForm.classList.add("flipped");
  setTimeout(() => {
    flipForm.style.pointerEvents = "none";
  }, 400);
});

toLoginBtn.addEventListener("click", () => {
  flipForm.classList.remove("flipped");
  setTimeout(() => {
    flipForm.style.pointerEvents = "auto";
  }, 400);
});

const registerForm = document.querySelector(".flip-form-register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const userData = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:9090/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 2000,
        backdrop: false,
        customClass: {
          container: "position-fixed",
        },
        allowOutsideClick: false,
      });
      console.log(data);
      registerForm.reset();
      // Cambiar a la vista de login automáticamente
      toLoginBtn.click();
    } else {
      const error = await response.json();
      alert("Error al registrar: " + error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al conectar con el servidor");
  }
});


const loginForm = document.querySelector(".flip-form-login");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:9090/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario logueado con éxito",
        showConfirmButton: false,
        timer: 2000,
        backdrop: false,
        customClass: {
          container: "position-fixed",
        },
        allowOutsideClick: false,
      });
      console.log(data);
      loginForm.reset();
    } else {
      const error = await response.json();
      alert("Error al iniciar sesión: " + error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al conectar con el servidor");
  }
});


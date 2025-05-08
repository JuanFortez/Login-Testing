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


const nameInput = document.getElementById("#name-input");
const lastnameInput = document.getElementById("#lastname-input");
const emailInput = document.getElementById("#email-input");
const passwordInput = document.getElementById("#password-input");

nameInput.addEventListener("invalid", (e) => {
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity("Este campo es obligatorio");
  } else if (nameInput.validity.tooShort) {
    nameInput.setCustomValidity(
      `Nombre demasiado corto. Mínimo ${nameInput.minLength} caracteres`
    );
  }
});

nameInput.addEventListener("input", () => {
  nameInput.setCustomValidity(""); // Limpia el mensaje de error
});

form.addEventListener("submit", (event) => {
  if (!nameInput.checkValidity()) {
    event.preventDefault();
  }
});















// const form = document.getElementById("form");
// const nameInput = document.getElementsByClassName("name-input");
// const lastNameInput = document.getElementsByClassName("lastn ame-input");
// const emailInput = document.getElementsByClassName("email-input");
// const passwordInput = document.getElementsByClassName("password-input");
// const repeatPasswordInput = document.getElementsByClassName(
//   "repeat-password-input"
// );

// form.addEventListener("submit", (e) => {
//   let errors = [];

//   if (nameInput) {
//     // If si estamos en el registro
//     errors = getSignupFormErrors(
//       nameInput.value,
//       lastNameInput.value,
//       emailInput.value,
//       passwordInput.value,
//       repeatPasswordInput.value
//     );
//   } else {
//     // Else si estamos en el login
//     errors = getLoginFormErrors(emailInput.value, passwordInput.value);
//   }

//   if (errors.length > 0) {
//     // Si hay errores
//     e.preventDefault();
//   }
// });

// function getSignupFormErrors(name, lastName, email, password, repeatPassword) {
//   let errors = [];

//   if (name === "" || name === null) {
//     errors.push("Name is required");
//     document.querySelector(".name-input").classList.add("incorrect");
//   }
//   if (lastName === "" || lastName === null) {
//     errors.push("Last name is required");
//     document.querySelector(".lastname-input").classList.add("incorrect");
//   }
//   if (email === "" || email === null) {
//     errors.push("Email is required");
//     document.querySelector(".email-input").classList.add("incorrect");
//   }
//   if (password === "" || password === null) {
//     errors.push("Password is required");
//     document.querySelector(".password-input").classList.add("incorrect");
//   }

//   return errors;
// }

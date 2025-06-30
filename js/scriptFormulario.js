// FORMULARIO EN VENTANA MODAL
const signUpModal = document.querySelector("#signUpModal");
const closeSignUpModalBtn = document.querySelector("#closeSignUpModal");
const submitSignUpBtn = document.querySelector("#submitSignUp");
const logIn = document.querySelector(".log-in");

function showSignUp() {
  signUpModal.style.display = "flex";
}

function closeSignUp() {
  signUpModal.style.display = "none"
}

logIn.addEventListener("click", showSignUp);
closeSignUpModalBtn.addEventListener("click", closeSignUp);
submitSignUpBtn.addEventListener("click", validateForm);

// VERIFICACIONES 
const inputName = document.querySelector("#name");
const msj1 = document.querySelector("#msj1")

const inputSurname = document.querySelector("#surname");
const msj2 = document.querySelector("#msj2");

const inputAge = document.querySelector("#age");
const msj3 = document.querySelector("#msj3");

const inputEmail = document.querySelector("#email");
const msj4 = document.querySelector("#msj4");

const inputNumber = document.querySelector("#number");
const msj5 = document.querySelector("#msj5");

const inputPassword = document.querySelector("#password");
const msj6 = document.querySelector("#msj6");

// FUNCIÓN VALIDAR TEXTO 
function validateText(input, p, type) {
  let value = input.value.trim();// Quitar espacios al inicio y al final

  if (type === "texto") {
     // Expresión regular para aceptar solo letras (incluyendo tildes y ñ) y espacios
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; //(!!! REVISAR)
    // (/^) Este símbolo indica el inicio de la cadena.
    //a-z → todas las letras minúsculas
    //A-Z → todas las letras mayúsculas
    //áéíóú → vocales con tilde en minúscula
    //ÁÉÍÓÚ → vocales con tilde en mayúscula
    //ñÑ → la eñe en minúscula y mayúscula
    // \s → espacio en blanco (también permite tabulaciones, pero lo común es el espacio)

    if (value === "") {
      p.innerHTML = "Por favor, complete el campo vacío."; // Mensaje si está vacío
      return false;

    } else if (!soloTexto.test(value)) {// Si contiene caracteres no permitidos (!!! REVISAR TEST VALUE)
      p.innerHTML = "Por favor, ingrese solo texto (sin números ni caracteres especiales)";
      input.value = "";// Limpia el input
      input.focus();// Vuelve a posicionar el cursor en el input
      return false;

    } else {
      p.innerHTML = "";// Borra mensaje de error si todo está bien
      return true;

    }
  }
}

// FUNCIÓN VALIDAR NÚMERO
function validateNumber(input, p, type) {
  let value = input.value.trim();

  if (type === "numero") {
    let portion = value.split(" ");// Separa por espacios (en caso que haya)

    for (let i = 0; i < portion.length; i++) {
      if (isNaN(portion[i])) {// isNaN devuelve true si NO es un número
        p.innerHTML = "Por favor, ingrese solo números";
        input.value = "";
        input.focus();
        return false;


      } if (portion[i] === "") {// Si hay algún espacio vacío (cadena vacía)
        p.innerHTML = "Por favor, complete el campo vacío."
        input.value = "";
        input.focus();
        return false;

      } else {
        p.innerHTML = "";
        return true;
      }
    }
  }
}

// Funciones que llaman a validateText o validateNumber para cada input específico
function input1Name() {
  if (validateText(inputName, msj1, "texto")) {
    return true;
  }
}

function input2Surname() {
  if (validateText(inputSurname, msj2, "texto")) {
    return true;
  }
}

function input3Age() {
  if (validateNumber(inputAge, msj3, "numero")) {
    return true;
  }
}

// INPUT 4
// VALIDAR EMAIL (de forma simple, solo revisa que tenga texto y un "@")
function validateEmail(input, p) {
  const value = input.value.trim();

  if (value === "") {
    p.innerHTML = "Por favor, complete el campo vacio";
    return false;

  } else if (!value.includes("@")) {// No contiene "@"
    p.innerHTML = "El correo electronico debe contener un arroba (@)";
    return false;

  } else {
    p.innerHTML = "";
    return true;
  }
}

function input5Number() {
  if (validateNumber(inputNumber, msj5, "numero")) {
    return true;
  }
}

// FUNCIÓN VALIDAR CONTRASEÑA
// VALIDAR CONTRASEÑA (mínimo 6 caracteres)
function validatePassword(input, p) {
  const value = input.value.trim();

  if (value === "") {
    p.innerHTML = "Por favor, complete el campo vacio";
    return false;

  } else if (value.length < 6) {
    p.innerHTML = "La contraseña debe tener por lo menos 8 caracteres";
    return false;
  } else {
    p.innerHTML = "";
    return true;
  }
}

// EVENTOS para validar mientras el usuario escribe (keyup)
inputName.addEventListener("keyup", input1Name);
inputSurname.addEventListener("keyup", input2Surname);
inputAge.addEventListener("keyup", input3Age);
inputNumber.addEventListener("keyup", input5Number);

// FUNCIÓN VALIDAR FORMULARIO ANTES DE PODER SUBMITITRLO
function validateForm(event) {
  event.preventDefault();// Evita que se envíe el formulario si hay errores

  let valido = true;// Bandera para controlar si todo está bien

// Llama a las funciones de validación para cada campo (!!! REVISAR)
  if (!validateText(inputName, msj1, "texto")) valido = false;
  if (!validateText(inputSurname, msj2, "texto")) valido = false;
  if (!validateNumber(inputAge, msj3, "numero")) valido = false;
  if (!validateNumber(inputNumber, msj5, "numero")) valido = false;
  if (!validateEmail(inputEmail, msj4)) valido = false;
  if (!validatePassword(inputPassword, msj6)) valido = false;

  // Si todos los campos están bien, se cierra el formulario y muestra mensaje éxito
  if (valido) {
    closeSignUp();
    alert("Formulario enviado con éxito");
  } else {
    alert("Por favor, corrija los errores antes de enviar.");
  }
}
// Mensaje en consola para verificar que el script cargó bien
console.log("Script de formulario cargado correctamente");
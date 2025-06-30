// NAVEGAR A TRAVES DEL HEADER / NAVBAR
const home = document.querySelector(".home"); 
const movies = document.querySelector(".movies");
const btnAltHome = document.querySelector(".activate-alt-home");

function goToHome() { // Redirige al usuario al archivo indexHome.html
  window.location.href = "./index.html"; 
} home.addEventListener("click", goToHome)

function goToMovies() {  // Redirige al usuario al archivo catalogoMovies.html
  window.location.href = "./catalogoMovies.html";
} movies.addEventListener("click", goToMovies)

function goToAltHome() {
  window.location.href = "./indexHomeAlt.html";  // Redirige al usuario al archivo indexHomeAlt.html
} btnAltHome.addEventListener("click", goToAltHome)

// LOGO DE LA NAVBAR
const logo = document.querySelector(".sofia-coppola-archives");
const newLogo = document.createElement("img");
newLogo.src = "./img/logo7.png";
newLogo.alt = "logo";
logo.appendChild(newLogo);

// INICIALIZACION DE LA VENTANA MODAL
function iniciatePage() { // Llama a la función showModal() cuando se inicia la página
  showModal();
}

// LOGO / TÍTULO VENTANA MODAL
const modalTitle = document.querySelector("#modalTitle");

// VENTANA MODAL INICIO
const modal = document.querySelector("#modalWindow");
const closeRecomModalBtn = document.querySelector("#closeRecomModal");
const modalContent = document.querySelector("#modalContent");

// Genera el contenido HTML con las películas recomendadas y lo inserta en el modal
function showMovieRecommendations(array) { // Esta función recibe un array de películas como parámetro
  let content = ""; // Variable para acomodar el HTML

  //Recorre cada pelicula y arma un bloque HTML con su imagen y nombre
  //Todo ese contenido se guarda en nuestra variable content

  //EXPLICACION DEL FOR:
  //Se crea una variable i que empieza en 0 (el primer indice del array)
  //El bucle se repite mientras i sea menor que la cantidad de elementos en el array
  //Despues de cada vuelta, i aumenta 1, osea, pasa al siguiente elemento del array

  for (let i = 0; i < array.length; i++) { //Recorremos el array de peliculas con un bucle for
    content += ` 
        <div class = "movie-card"> 
        <a href = "ampliacion.html?id=${array[i].id}">
        <img src = "${array[i].movieCover}">
        <h2 class = "movie-title">
        ${array[i].name}<br>
        </h2>
        </a>
        </div> 
        `;
  } modalContent.innerHTML = content; //Inserta todo el contenido en el contenedor del modal (modalContent)
} //Iguala modalContent (el contenedor del modal) a content (nuestra variable donde esta el bloque HTML con la informacion del array de peliculas)

let myDate = new Date(); //Crea un objeto con la fecha y hora del momento actual segun tu computadora
console.log(myDate.getHours()); //Devuelve SOLO la hora en mi consola

function showModal() {
  modal.style.display = "flex"; // Muestra la ventana modal en pantalla
  const hour = new Date().getHours(); //Obtiene la hora actual
  let selectedMovies = []; //Array donde se guardaran las peliculas recomendadas
  
  //MAÑANA (6 a 12hs)
  if (hour >= 6 && hour < 12) { //Si la hora (variable donde guardamos la hora actual) es de 6 a 12 pasa tal cosa ..
    selectedMovies = [moviesSC[5], moviesSC[1], moviesSC[9]]; //Las peliculas recomendadas para esas horas va a ser la pelicula con indice 5 de mi array de objetos moviesSC
    const newTitle1 = document.createElement("img"); 
    newTitle1.src = "./img/modalTitleA.png"; //Imagen de titulo para ese horario "MAÑANA"
    newTitle1.alt = "modalTitle1";
    modalTitle.appendChild(newTitle1);

    //TARDE (12 a 18hs)
  } else if (hour >= 12 && hour < 18) {
    const newTitle2 = document.createElement("img");
    newTitle2.src = "./img/modalTitleB.png";
    newTitle2.alt = "modalTitle2";
    modalTitle.appendChild(newTitle2);
    selectedMovies = [moviesSC[0], moviesSC[4], moviesSC[8]];

    //NOCHE (18 a 23hs)
  } else if (hour >= 18 && hour < 23) {
    selectedMovies = [moviesSC[2], moviesSC[7], moviesSC[6]];
    const newTitle3 = document.createElement("img");
    newTitle3.src = "./img/modalTitleC.png";
    newTitle3.alt = "modalTitle3";
    modalTitle.appendChild(newTitle3);

    //MADRUGADA (23 a 6hs)
  } else {
    selectedMovies = [moviesSC[10], moviesSC[20], moviesSC[22]];
    const newTitle4 = document.createElement("img");
    newTitle4.src = "./img/modalTitleD.png";
    newTitle4.alt = "modalTitle4";
    modalTitle.appendChild(newTitle4);

  }

  showMovieRecommendations(selectedMovies);//Muestra en pantalla las películas recomendadas según la hora actual
  //En vez de tomar las peliculas del array, toma las peliculas que yo le paso, con su indice correspondiente, mostrando solo aquellas que yo le indico
} 
function closeModal() {
  modal.style.display = "none"; // Oculta la ventana modal
}

closeRecomModalBtn.addEventListener("click", closeModal);// Al hacer clic en el botón de cerrar, se oculta la ventana modal de recomendaciones
window.addEventListener("load", iniciatePage);// Cuando se carga toda la página, se muestra la ventana modal con las recomendaciones


// SLIDER / CARRUSEL DE IMÁGENES
const imgsHome = [ // Lista de rutas a las imágenes que se mostrarán en el slider de la página de inicio
  "./img/slider1.png",
  "./img/slider2.jpg",
  "./img/slider3.jpg",
  "./img/slider4.jpg",
  "./img/slider5.jpg",
  "./img/slider6.jpg",
  "./img/slider7.jpg",
  "./img/slider8.jpg",
  "./img/slider9.jpg",
  "./img/slider10.jpg",
  "./img/slider11.jpg",
  "./img/slider12.jpg",
  "./img/slider13.jpg",
  "./img/slider14.jpg",
  "./img/slider15.jpg",
]

const imgSlider = document.querySelector("#img-slider");
const btnIzq = document.querySelector("#btnIzq");
const btnDer = document.querySelector("#btnDer");

let index = 0;//Declara una variable llamada index que representa la posición actual en el array imgsHome
//Comienza en 0, que sería la primera imagen del array
//A medida que el usuario hace clic o pasa el tiempo, este valor va aumentando o disminuyendo para mostrar la imagen correspondiente.

let interval = 0;//Declara una variable interval que se usará para guardar el ID del intervalo de tiempo automático (usado con setInterval).
//Esto permite iniciar y detener el cambio automático de imágenes cuando lo necesites.

function showSliderImg() {
  //imgSlider.src cambia la imagen que se muestra en el <img id="img-slider"> del HTML.
  //imgsHome[index] toma la URL de la imagen correspondiente al valor actual de index (que va de 0 a 14 en mi array imgsHome).
  imgSlider.src = imgsHome[index];// Muestra la imagen correspondiente al índice actual
}

function btnBack() {
  if (index === 0) { //Si estamos en la primera imagen del array (index es 0), al hacer clic en "atrás", queremos volver al final del carrusel
    index = imgsHome.length - 1;//Esto te lleva a la última imagen del array
  } else {
    index--;//Si no estamos en la primera imagen, simplemente restamos 1 para retroceder una posición
  } showSliderImg();//Finalmente, se actualiza la imagen mostrada en pantalla
} btnIzq.addEventListener("click", btnBack);//al hacer clic en el botón izquierdo (btnIzq), se ejecuta btnBack()

function btnForward() {
  if (index === imgsHome.length - 1) { //imgsHome.length - 1 es el índice de la última imagen del array. Pregunta: ¿estamos en la última imagen?
    index = 0; //Si estamos en la última, volvemos al principio (imagen 0).
  } else {
    index++; //Si no estamos en la última, pasamos a la siguiente imagen
  } showSliderImg();//Muestra la imagen correspondiente al nuevo index
} btnDer.addEventListener("click", btnForward);//Escucha el clic en el botón derecho (btnDer) y llama a la función cuando eso pasa.

function updateImg() {
  if (index < imgsHome.length - 1) {//¿El indice es menor al final del array?
    index++;//De ser asi, de no ser la ultima imagen, que avance a la siguiente
  } else {
    index = 0;//Si ya esta en la ultima imagen, que vuelva a la primera index = 0
  } showSliderImg(); //Muestra la imágen correspondiente
}

function startSlider() {
  interval = setInterval(updateImg, 2000);//Llama a la funcion updateImg cada 2 segundos, y guarda el identificador
  //del intervalo en la variable para poder detenerla en el caso que lo desee
} imgSlider.addEventListener("mouseleave", startSlider); //Cuando el mouse se encuentre fuera del slider, es cuando el intervalo
//inicia o se reanuda

function stopSlider() {
  clearInterval(interval);//Detiene el carrusel automatico utilizando la informacion guardada en mi variable interval
  //(setInterval)
} imgSlider.addEventListener("mouseenter", stopSlider);//Cuando el mouse entra en el slider, se detiene el cambio automatico
//de imagenes

showSliderImg();//Muestra la primera imagen del slider apenas se carga la página.
startSlider();//Inicia el carrusel automático, haciendo que las imágenes empiecen a cambiar cada 2 segundos

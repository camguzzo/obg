// NAVEGAR A TRAVES DEL HEADER / NAVBAR
const home = document.querySelector(".home");
const movies = document.querySelector(".movies");

function goToHome() {
    window.location.href = "./indexHome.html";
} home.addEventListener("click", goToHome)

function goToMovies() {
    window.location.href = "./catalogoMovies.html";
} movies.addEventListener("click", goToMovies)

// LOGO DE LA NAVBAR
const logo = document.querySelector(".sofia-coppola-archives");
const newLogo = document.createElement("img");
newLogo.src = "./img/logo7.png";
newLogo.alt = "logo";
logo.appendChild(newLogo);

// CONTENEDOR DE PELICULAS Y FILTROS DE BÚSQUEDA
const movieContainer = document.querySelector(".movie-container");
const filterGenres = document.querySelector("#genres");
const filterSearch = document.querySelector("#search");

generateGenres();//Llama a la función que genera el listado de géneros únicos en el <select> para filtrar

showMovies(moviesSC);//Llama a la función showMovies, pasando como argumento el array moviesSC, que contiene todas las películas.
//Esto hace que, cuando se carga la página, se muestren todas las películas del catálogo.


function showMovies(array) {
    let content = ""; // Inicializa una variable vacía que va a acumular el HTML de cada tarjeta de película

    for (let i = 0; i < array.length; i++) {// Bucle que recorre el array de películas recibido como parámetro
        content += ` 
        <div class = "movie-card"> 
        <a href = "ampliacion.html?id=${array[i].id}"> <!-- Enlace a la página de ampliación con el id de la película -->
        <img src = "${array[i].movieCover}"><!-- Imagen de portada de la película -->
        <h2 class = "movie-title">
        ${array[i].name}<br><!-- Nombre de la película -->
        (${array[i].year})</h2><!-- Año de estreno -->
        </a>
        </div>
        `;
    } movieContainer.innerHTML = content;// Inserta todo el contenido generado dentro del contenedor de películas en el HTML
}

function generateGenres() {
    let uniqueGenres = [];// Creamos un array vacío que va a guardar los géneros SIN repetir

    for (let i = 0; i < moviesSC.length; i++) {
        let actualGenre = moviesSC[i].genre;// Tomamos el género de cada película

        if (uniqueGenres.indexOf(actualGenre) === -1) {// Si ese género NO está ya en el array
            uniqueGenres.push(actualGenre);// Lo agregamos al array de géneros únicos
        }
    }

    uniqueGenres.sort();// Ordenamos alfabéticamente los géneros únicos

    filterGenres.innerHTML = `<option value="Todos">Todos</option>`; // Agregamos manualmente la opción "Todos" al <select>

    for (let i = 0; i < uniqueGenres.length; i++) {
        filterGenres.innerHTML += `<option value = "${uniqueGenres[i]}">${uniqueGenres[i]}</option>`;// Creamos una <option> por cada género único
    }

}

function quitarTildes(text) {
    return text//El return devuelve el texto modificado, es decir, el resultado final luego de todos los reemplazos.

        .replace(/á/g, "a")// Reemplaza todas las "á" por "a"
        .replace(/é/g, "e")// Reemplaza todas las "é" por "e"
        .replace(/í/g, "i")// Reemplaza todas las "í" por "i"
        .replace(/ó/g, "o")// Reemplaza todas las "ó" por "o"
        .replace(/ú/g, "u")// Reemplaza todas las "ú" por "u"
        .replace(/Á/g, "a")// Reemplaza todas las "Á" por "a" (versión mayúscula
        .replace(/É/g, "e")// Reemplaza todas las "É" por "e"
        .replace(/Í/g, "i")// Reemplaza todas las "Í" por "i"
        .replace(/Ó/g, "o")// Reemplaza todas las "Ó" por "o"
        .replace(/Ú/g, "u");// Reemplaza todas las "Ú" por "u" //La g en la expresión regular que aparece dentro de replace(/á/g, "a") significa "global",
    //y su función es indicar que queremos reemplazar todas las ocurrencias del carácter en el texto, no solo la primera.
}

function filters() {
    let searchByName = quitarTildes(filterSearch.value.toLowerCase().replaceAll(" ", ""));// Toma el valor del input de búsqueda, lo pasa a minúscula, le quita espacios y tildes
    let selectedGenre = filterGenres.value; // Toma el género seleccionado en el <select>

    let filteredMovies = [];  // Crea un array vacío donde se van a guardar las películas que cumplan los filtros

    for (i = 0; i < moviesSC.length; i++) { // Recorre todo el array de películas
        let movie = moviesSC[i];
        let movieName = quitarTildes(movie.name.toLowerCase().replaceAll(" ", ""));// Prepara el nombre de la película: minúsculas, sin espacios ni tildes

        // Si el género coincide o es "Todos", y el nombre incluye lo que escribió el usuario...
        if ((movie.genre === selectedGenre || selectedGenre === "Todos") && movieName.includes(searchByName)) {

            filteredMovies.push(movie);// ...la agrega al array de resultados
        }

        if (filteredMovies.length === 0) {// Si después de filtrar no encontramos ninguna película que cumpla con los criterios...
            // Mostrar un mensaje en el contenedor de películas diciendo que no hay resultados
            movieContainer.innerHTML = "No hay ninguna película que coincida con los filtros";
        } else {
            // Si sí hay películas que cumplen los filtros,
            // llamar a la función showMovies para mostrar esas películas en pantalla
            showMovies(filteredMovies);
        }
    }
}

filterGenres.addEventListener("change", filters);// Cuando el usuario cambia la opción del filtro de género, se ejecuta la función filters para actualizar la lista de películas mostradas
filterSearch.addEventListener("keyup", filters);// Cuando el usuario escribe o borra texto en el input de búsqueda, se ejecuta la función filters para actualizar la lista de películas mostradas en tiempo real





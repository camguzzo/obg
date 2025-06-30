// NAVEGAR A TRAVES DEL HEADER / NAVBAR
const home = document.querySelector(".home");
const movies = document.querySelector(".movies");

function goToHome() {
    window.location.href = "./indexHome.html";
} home.addEventListener("click", goToHome);

function goToMovies() {
    window.location.href = "./catalogoMovies.html";
} movies.addEventListener("click", goToMovies);

// LOGO DE LA NAVBAR
const logo = document.querySelector(".sofia-coppola-archives");
const newLogo = document.createElement("img");
newLogo.src = "./img/logo7.png";
newLogo.alt = "logo";
logo.appendChild(newLogo);

// ELEMENTOS DEL DOM
const movieName = document.querySelector("#name");
const year = document.querySelector("#year");
const duration = document.querySelector("#duration");
const country = document.querySelector("#country");
const director = document.querySelector("#director");
const screenwriter = document.querySelector("#screenwriter");
const producers = document.querySelector("#producers");
const genre = document.querySelector("#genre");
const actors = document.querySelector("#actors");
const synopsis = document.querySelector("#synopsis");

const rute = window.location.search;// Obtiene la parte de la URL que contiene los parámetros, por ejemplo "?id=3"

const parameters = new URLSearchParams(rute);// Crea un objeto para manejar fácilmente los parámetros de la URL

const idMovie = parameters.get("id");// Obtiene el valor del parámetro "id" que está en la URL (ejemplo: "3")

console.log(idMovie);// Muestra en consola el id obtenido (por ejemplo: "3")

const movie = moviesSC[idMovie];// Busca en el array moviesSC la película que tiene ese id
// Aquí asume que el id coincide con el índice del array (ojo con esto)


console.log(movie);
// Muestra en consola el objeto película completo

let castList = "";// Variable para guardar la lista del elenco en formato HTML

// Recorre el array cast (actores) de la película y agrega cada actor dentro de una etiqueta <li>
for (let i = 0; i < movie.cast.length; i++) {
    castList += `<li>${movie.cast[i]}</li>`;
}

movieName.textContent = movie.name;// Asigna el nombre de la película al elemento HTML que muestra el título
year.textContent = movie.year;
duration.textContent = movie.duration;
country.textContent = movie.country;
director.textContent = movie.director;
screenwriter.textContent = movie.screenwriter;
producers.textContent = movie.production;
genre.textContent = movie.genre;

// Asigna el elenco (cast). Aquí asigna directamente el array, 
// pero esto mostrará los nombres separados por comas automáticamente
actors.textContent = movie.cast;

synopsis.textContent = movie.synopsis;

actors.innerHTML = castList;// Finalmente, reemplaza el contenido del elemento actors con el HTML generado
// en castList, que es una lista <li> de actores para mejor formato visual

// GALERIA DE IMÁGENES
if (movie && movie.gallery && movie.gallery.length > 0) {// Verifica que exista la variable movie, que tenga una propiedad gallery y que esta tenga al menos una imagen

    const galleryContainer = document.querySelector('.gallery');// Busca en el HTML el contenedor donde van a estar las miniaturas de la galería
    const expandedImage = document.getElementById('expanded-image');// Busca en el HTML el elemento donde se mostrará la imagen principal ampliada

    const mainImg = document.createElement('img');// Crea un nuevo elemento <img> para la imagen principal

    mainImg.src = movie.gallery[0];// Le asigna como source la primera imagen del array gallery

    mainImg.classList.add('main-img');// Le añade la clase 'main-img' para que pueda tener estilos específicos (CSS)

    expandedImage.appendChild(mainImg); // Agrega la imagen principal al contenedor donde se debe mostrar la imagen ampliada

    for (let i = 0; i < movie.gallery.length; i++) {   // Ahora recorre todas las imágenes del array gallery para crear miniaturas
        const thumb = document.createElement('img');// Crea un nuevo <img> para cada miniatura
        thumb.src = movie.gallery[i];// Le asigna a la source de la imagen = la posición i del array
        thumb.classList.add('thumbnail'); // Le añade la clase 'thumbnail' para que tenga estilos de miniatura

        thumb.addEventListener('click', () => {// Le agrega un evento que cuando hagas click en la miniatura, 
            // la imagen principal cambie a la imagen de esa miniatura
            mainImg.src = movie.gallery[i];
        });

        galleryContainer.appendChild(thumb);// Finalmente, agrega esa miniatura al contenedor de la galería
    }
}

// SUGERENCIAS RELACIONADAS CON EL PRODUCTO AMPLIADO
const params = new URLSearchParams(window.location.search);// Obtiene los parámetros de la URL actual (por ejemplo: ?id=5)
const actualMovieId = params.get("id");// Extrae el valor del parámetro "id" y lo guarda en actualMovieId

// Función que se ejecuta cuando se hace click en una tarjeta relacionada

function relatedClick(e) { // (e) es el evento del click

    // Busca el elemento más cercano con la clase "related-card" partiendo del elemento clickeado
    const clickedCard = e.target.closest(".related-card"); //e.target es el momento exacto en el que hice click
    //.closest(".related-card") busca hacia arriba en el árbol HTML hasta encontrar el elemento con la clase related-card. 
    // Es para asegurarse que el click fue en una tarjeta de película relacionada (o en algún elemento dentro de esa tarjeta).

    if (clickedCard) { //Si encuentra esa tarjeta (clickedCard)
        const selectedId = clickedCard.getAttribute("data-id"); //toma el valor del atributo data-id (un atributo personalizado que se usa para guardar el id de esa película).
        window.location.href = `ampliacion.html?id=${selectedId}`;//te redirige a la página de ampliación para esa película con ese id.
    }
}

function showRelated(actualMovieId) {
    const coRelatedContainer = document.querySelector(".co-related");// Buscamos el contenedor donde vamos a poner las películas relacionadas
    coRelatedContainer.innerHTML = "<h2>Filmes Relacionados</h2>";// Empezamos poniendo un título en ese contenedor

    let actualMovie = null;

    for (let i = 0; i < moviesSC.length; i++) {// Buscamos en la lista completa de películas (moviesSC) la película que corresponde con el id actual
        if (moviesSC[i].id == actualMovieId) {//Comparar el id de la película en la posición i (moviesSC[i].id) con el actualMovieId.
            actualMovie = moviesSC[i];// Guardamos la película encontrada
            break;//Salimos del ciclo porque ya la encontramos
        }
    }

    if (!actualMovie) return;// Si no encontramos la película con ese id, terminamos la función

    const relatedMovies = [];// Creamos un array para guardar películas que sean del mismo género, pero no la película actual

    for (let i = 0; i < moviesSC.length; i++) {// Recorremos todas las películas en el array moviesSC, una por una

        if (moviesSC[i].id != actualMovieId && moviesSC[i].genre === actualMovie.genre) {
            // Para la película actual (moviesSC[i]):
            // 1) Verificamos que su id sea diferente al id de la película que estamos viendo (actualMovieId)
            //    Esto es para no incluir la misma película en la lista de relacionadas
            // 2) Verificamos que el género (genre) de la película actual sea igual al género de la película que estamos viendo (actualMovie.genre)
            //    Porque queremos películas que sean del mismo género

            relatedMovies.push(moviesSC[i]);// Si cumple ambas condiciones, agregamos esta película al arreglo relatedMovies
        }
    }

    const selected = [];// Creamos un array vacío que va a guardar las películas seleccionadas al azar para mostrar.
    while (selected.length < 3 && relatedMovies.length > 0) {// Mientras que no tengamos 3 películas seleccionadas 
    // Y que todavía haya películas en relatedMovies para elegir


        const randomCard = Math.floor(Math.random() * relatedMovies.length);// Generamos un índice aleatorio entre 0 y el último índice del arreglo relatedMovies.
    // Math.random() genera un número decimal entre 0 y 1 (sin incluir 1).
    // Lo multiplicamos por la longitud de relatedMovies para que sea un número entre 0 y relatedMovies.length - 1.
    // Math.floor() redondea hacia abajo para que sea un índice entero válido.



        selected.push(relatedMovies[randomCard]); // Agregamos la película en esa posición aleatoria al array selected.
        relatedMovies.splice(randomCard, 1); // Eliminamos la película seleccionada del array relatedMovies para no repetirla en la próxima iteración.
    // splice() elimina 1 elemento en la posición randomCard.
    }

    for (let i = 0; i < selected.length; i++) {
        const peli = selected[i]; //Guardamos la película seleccionada en la variable 'peli'

        const card = document.createElement("div");// Creamos un nuevo <div> que será la tarjeta (card) de la película
        card.classList.add("related-card");// Le agregamos la clase CSS "related-card" para darle estilo
        card.setAttribute("data-id", peli.id);// Añadimos un atributo "data-id" con el id de la película para identificarla


        const img = document.createElement("img");// Creamos un elemento <img> para mostrar la portada de la película
        img.src = peli.movieCover; // Le asignamos la URL de la imagen de la película
        img.alt = peli.name;// Texto alternativo para accesibilidad, que es el nombre de la película


        const title = document.createElement("h4");// Creamos un <h4> para el título de la película
        title.textContent = peli.name;// Ponemos el nombre de la película como texto del título

        card.appendChild(img);// Insertamos la imagen dentro de la tarjeta
        card.appendChild(title);// Insertamos el título dentro de la tarjeta

        coRelatedContainer.appendChild(card);// Finalmente, agregamos la tarjeta completa al contenedor en el HTML
    }
}

const coRelatedContainer = document.querySelector(".co-related");// Seleccionamos el contenedor donde se mostrarán las películas relacionadas
coRelatedContainer.addEventListener("click", relatedClick);// Agregamos un evento para detectar cuando el usuario hace click en alguna película relacionada

showRelated(actualMovieId);// Llamamos a la función que muestra las películas relacionadas, usando el id de la película actual


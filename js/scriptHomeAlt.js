// NAVEGAR A TRAVES DEL HEADER / NAVBAR
const home = document.querySelector(".home");
const movies = document.querySelector(".movies");
const btnReturnHome = document.querySelector(".return-home");

function goToHome() {
    window.location.href = "./index.html";
} home.addEventListener("click", goToHome)

function goToMovies() {
    window.location.href = "./catalogoMovies.html";
} movies.addEventListener("click", goToMovies)

function returnHome() {
    window.location.href = "./index.html";
} btnReturnHome.addEventListener("click", returnHome)

// LOGO DE LA NAVBAR
const logo = document.querySelector(".sofia-coppola-archives");
const newLogo = document.createElement("img");
newLogo.src = "./img/logo7.png";
newLogo.alt = "logo";
logo.appendChild(newLogo);


// IMÁGENES INTERACTIVAS / ARRASTRABLES
const imgContainer = document.querySelector(".interactive-img");//Tomamos del documento, nuestro div que va a contener las img

for (let i = 0; i < interactiveImgs.length; i++) {
    const img = document.createElement("img");//Declaramos una variable, y establecemos que dentro del documento, se cree un elemento de nombre "img"

    img.src = interactiveImgs[i];//Definimos la source de nuestra imagen. No hay que olvidar que estamos dentro de un bucle, que recorre nuestro array y con ello, las nueve imagenes que guarda, una por una. 
    //En la primera vuelta, i=0, entonces interactiveImgs[i] = './img/1.jpg', igual al objeto que se encuentra en la posicion 0 de nuestro array. En la segunda vuelta, i = 1, entonces interactiveImgs[i] es './img/2.jpg' y asi sucesivamente.
    //i es el indice que nos permite acceder a cada elemento del array dentro del bucle. 

    img.alt = `${i + 1}`;//El símbolo $ seguido de llaves ${...} permite insertar variables o expresiones dentro de un string. Signfica : "Toma el valor de i, súmale 1, y mételo dentro del string."
    //Por ejemplo: Si i = 0, entonces alt = "1". Si i = 1, entonces alt = "2", etc.
    //¿Por qué se usa i + 1?: Porque los índices de los arrays empiezan en 0, pero visualmente tiene más sentido que la primera imagen tenga un alt="1", no alt="0".

    //Generamos tres valores aleatorios para posicionar y rotar nuestras imagenes en pantalla de forma media caotica

    const top = Math.random() * 330;// Math.random genera un número decimal aleatorio entre 0 y 1, al multiplicarlo por 330, genera un número random entre 0 y 330.
    //Se usa para ubicar un elemento verticalmente, top va a ser un número random entre 0px y 330px

    const left = Math.random() * (imgContainer.clientWidth - 100); //container.clientWidth es el ancho visible del contenedor (nuestro div en este caso). Le restamos 100 para que el elemento no se pase del borde derecho (por si el elemento mide 100px de ancho).
    //Luego se multiplica por Math.random(), lo que da un número aleatorio entre 0 y el ancho del contenedor menos 100 píxeles.
    //left es un valor aleatorio horizontal para posicionar el elemento dentro del contenedor, evitando que se salga del borde.

    const rotation = (Math.random() * 30) - 15;// Math.random multiplicado por 30, nos da un valor aleatorio entre 0 y 30. Luego se le resta 15, lo cual cambia el rango final a entre -15 y +15
    //Restarle 15 nos desplaza todo el rango. Antes teniamos un número aleatorio de 0 a 30. Después de restar 15: → 0 - 15 = -15   → 30 - 15 = 15, entonces ahora el rango final es de -15 a 15.
    //Hacemos esto porque queremos que nuestro valor de rotacion pueda ser negativo o positivo. 
    //Imagen rotada un poco a la izquierda -> -15°
    //Imagen sin rotacion -> 0°
    //Imagen rotada un poco a la derecha -> +15°

    //Estas líneas definen el estilo de nuestra imagen, utilizando los valores top, left y rotation, que acabamos de crear
    img.style.top = `${top}px`; //Declaramos que el estilo de nuestra imagen va a ser el numero random que me dio el const top
    //Establece la posición vertical de la imagen en la pantalla
    //Usa el valor de la variable top, que vos ya sabés que es un número aleatorio entre 0 y 330
    //El ${top} inserta ese número dentro del string, y se le agrega "px" para que el navegador entienda que son píxeles.
    //Este estilo solo funciona si la imagen tiene una posición CSS como absolute o relative
    //Ejemplo: Si top = 120, se traduce a img.style.top = 120 px

    img.style.left = `${left}px`;//Define la posición horizontal (de izquierda a derecha) de la imagen.
    //Usa el valor aleatorio de left (ya vimos que está entre 0 y el ancho del contenedor menos 100).
    //También se le agrega "px" para que el navegador sepa que es una medida en píxeles.
    //Ejemplo: Si left = 250, se traduce a img.style.left = 250px

    img.style.transform = `rotate(${rotation}deg)`;//Aplica una rotación a la imagen usando CSS transform.
    //El valor rotation (aleatorio entre -15 y +15) se coloca en grados (deg).
    //Ejemplo: Si rotation = -10, se traduce a img.style.transform = "rotate(-10deg)"

    img.style.cursor = "grab";//Cambia el icono del cursor del mouse cuando pasa por encima de la imagen.
    //"grab" muestra una manito abierta, como si pudieras "agarrar" y mover la imagen.

    makeDraggable(img);//Llama a una función llamada makeDraggable y le pasa la imagen (img) como parametro.
    //está haciendo que la imagen sea arrastrable con el mouse
    //Esta línea no hace nada por sí sola si no existe una función definida antes

    imgContainer.appendChild(img);//Agrega la imagen (img) al contenedor (container) en el DOM (Modelo de Objetos de Documento (Document Object Model), una interfaz de programación que permite acceder y manipular el contenido de un documento HTML).
    //appendChild es un método que inserta un nodo (en este caso, una imagen) dentro de otro nodo (el contenedor).
    //Hasta ahora, la imagen existía solo en mi script datos, creada con document.createElement("img").
    //Esta línea la mete finalmente en el HTML visible de la página.
}

function makeDraggable(img) {

    let offsetX = 0;//Guarda la distancia horizontal (en píxeles) entre: el borde izquierdo de la imagen y el punto donde hiciste clic con el mouse.
    //se usa para que cuando empieces a arrastrar la imagen, no "salte" su posición, sino que siga al mouse desde el punto exacto donde hiciste clic.

    let offsetY = 0;//Exactamente lo mismo, pero para la posición vertical (de arriba hacia abajo).
    // evita que la imagen "salte" al arrastrarla, manteniendo el cursor en el punto correcto.

    let isDragging = false;//Esta variable controla si el usuario está arrastrando la imagen en ese momento o no.
    //Al principio está en false, porque todavía no se ha hecho clic ni empezado a arrastrar.

    //Se ejecuta al hacer click sobre la imagen
    function onMouseDown(e) {//Recibe parametro e, que es el objeto del evento del mouse. 

        isDragging = true;//El arrastre ha comenzado

        offsetX = e.clientX - img.offsetLeft;//Calcula la diferencia horizontal entre: la posicion del mouse (e.clientX) y el borde izquierdo de la imagen (img.offsetLeft)
        // Esto guarda cuanta distancia habia entre el punto donde hice click y el borde izq de la imagen
        //Clave para que al arrastrar, la imagen se mantenga debajo del mouse en el punto exacto del click, sin saltar

        offsetY = e.clientY - img.offsetTop;//Lo mismo que la linea anterior pero en posicion vertical
        //Guarda cuanta distancia hay entre el click del mouse y el borde superior de la imagen

        img.style.zIndex = 1000;//Cambia el z-index de la imagen para traerla al frente, por si se superpone con otras imagenes u objetos
        //El zIndex determina que elemento aparece encima del otro, los valores mas altos se apilan sobre los mas bajos.

        img.style.cursor = "grabbing";//Cambia el cursor a una mano que indica que estas arrastrando
    }

    //Se ejecuta al mover el mouse, solo va a hacer algo si estoy arrastrando
    function onMouseMove(e) {

        if (!isDragging) {//Verifica si isDragging es false, si no estamos arrastrando no hace nada (return), para evitar mover la imagen accidentalmente
            return;
        }

        //Calcula la nueva posicion de la imagen, restando los valores guardados en offsetX y offsetY
        //Mantiene la imagen siguiendo al mouse de forma suave, sin cambiar el punto de anclaje
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        //Mueve la imagen a su nueva posicion en la pantalla
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
    }

    //Se ejecuta al soltar el mouse
    function onMouseUp() {
        isDragging = false;//Indica que se termino el arrastre, para que onMouseMove deje de mover la imagen
        img.style.cursor = "grab";//Cambia el cursor de nuevo a una mano abierta (grab), que indica que la imagen es arrastrable, pero no se esta moviendo
    }

    img.addEventListener("mousedown", onMouseDown);//Se activa al hacer click en la imagen
    document.addEventListener("mousemove", onMouseMove);//Mueve la imagen mientras el mouse se mueve
    document.addEventListener("mouseup", onMouseUp);//Detiene el arrastre al soltar el boton 
    }
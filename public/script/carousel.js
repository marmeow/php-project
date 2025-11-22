//document.addEventListener("DOMContentLoaded", () => {}

window.onload = function () {
    // Variables
    const imagenes = [
        'resources/images/principal/cafeteBenvinguts.jpg',
        'resources/images/principal/coffee.jpg',
        'resources/images/principal/muffinOfertes.jpg',
        'resources/images/principal/entrepans.jpg',
        'resources/images/principal/coffeeU.jpg'
    ];

    const titulos = [
        'Benvinguts al Gato Rumano',
        '',
        'Gaudeix de les ofertes de la setmana',
        '',
        'La pausa perfecta amb un sabor autèntic',

    ];

    //const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('.retroceder');
    let $botonAvanzar = document.querySelector('.avanzar');
    let $imagen = document.querySelector('#imagen');
    let $titulo = document.querySelector('#titulos');
    /* let $botonPlay = document.querySelector('#play');
    let $botonStop = document.querySelector('#stop');*/
    let intervalo;

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        if (posicionActual >= imagenes.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
        renderizarTitulo();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        if (posicionActual <= 0) {
            posicionActual = imagenes.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
        renderizarTitulo();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
        $imagen.style.backgroundImage = `url(${imagenes[posicionActual]})`;
    }

    /**
     * Funcion que actualiza el titulo dependiendo de posicionActual
     */
    function renderizarTitulo() {
        $titulo.textContent = titulos[posicionActual];
    }

    /**
     * Funció que permet iniciar el carrousel de forma automàtica
     */
    function iniciarAutomatic() {
        intervalo = setInterval(pasarFoto, 3000); // 3000 minisegons = 3 segons
    }

    /**
     *  Funció que permet parar el carrousel quan faig click a les fletxes,
     *  per tant, aquesta funció s'haurà de cridar als eventListener dels botons.
     */
    function pararAutomatic() {
        clearInterval(intervalo);
    }

    /**
     * Activa el autoplay de la imagen
     */
    /* function playIntervalo() {
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
        // Desactivamos los botones de control
        $botonAvanzar.setAttribute('disabled', true);
        $botonRetroceder.setAttribute('disabled', true);
        $botonPlay.setAttribute('disabled', true);
        $botonStop.removeAttribute('disabled');
    } */

    /**
     * Para el autoplay de la imagen
     */
    /* function stopIntervalo() {
        clearInterval(intervalo);
        // Activamos los botones de control
        $botonAvanzar.removeAttribute('disabled');
        $botonRetroceder.removeAttribute('disabled');
        $botonPlay.removeAttribute('disabled');
        $botonStop.setAttribute('disabled', true);
    } */

    // Eventos
    $botonAvanzar.addEventListener('click', () => {
        pasarFoto();
        pararAutomatic();
    });

    $botonRetroceder.addEventListener('click', () => {
        retrocederFoto();
        pararAutomatic();
    });
    // $botonPlay.addEventListener('click', playIntervalo);
    // $botonStop.addEventListener('click', stopIntervalo);

    // Iniciar
    renderizarImagen();
    renderizarTitulo();
    iniciarAutomatic();
}
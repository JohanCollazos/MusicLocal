// Selección de elementos del DOM
const tituloCancion = document.querySelector('.Reproductor-musica h1');
const nombreArtista = document.querySelector('.Reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.siguiente');

document.getElementById('fondo-input').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
})

// Lista de canciones
const canciones = [
    {
        titulo: 'Faded',
        nombre: 'Alan Walker',
        fuente: 'music/«Faded - Alan Walker.mp3',
    },
    {
        titulo: '444',
        nombre: 'Yan Block -Panda Black',
        fuente: 'music/«444 - Yan Block - Panda Black.mp3',
    },
    {
        titulo: 'Fairytale',
        nombre: 'Alexander Rybak',
        fuente: 'music/«Fairytale - Alexander Rybak.mp3',
    },
    {
        titulo: 'Religión',
        nombre: 'Yan Block',
        fuente: 'music/«Religión - Yan Block.mp3',
    },
    {
        titulo: 'Sharks',
        nombre: 'imagine dragons',
        fuente: 'music/imagine dragons - Sharks.mp3',
    },
    {
        titulo: 'Nubes Negras',
        nombre: 'imagine dragons',
        fuente: 'music/Los de Adentro - Nubes Negras.mp3',
    },

];

// Función para actualizar la información de la canción actual
//encodeURL permite mantener el simbolo antes del nombre de la cancion
let indiceCancionActual = 0;

// Función para actualizar la información de la canción actual
//encodeURL permite mantener el simbolo antes del nombre de la cancion
function actualizarInfoCancion() {
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = encodeURI(canciones[indiceCancionActual].fuente);
    cancion.addEventListener('loadeddata', function () { });
};


cancion.addEventListener('loadedmetadata', function () {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

// Función para reproducir o pausar la canción
botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        pausarCancion();

    }
};

//funcion para cambiar el icono del boton de reproducir/pausar
function reproducirCancion() {
    cancion.play();
    iconoControl.classList.add('bi-pause-fill');
    iconoControl.classList.remove('bi-play-fill');
}
//funcion para cambiar el icono del boton de reproducir/pausar
function pausarCancion() {
    cancion.pause();
    iconoControl.classList.add('bi-play-fill');
    iconoControl.classList.remove('bi-pause-fill');
}

cancion.addEventListener('timeupdate', function () {
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function () {
    cancion.currentTime = progreso.value;
});
progreso.addEventListener('change', function () {
    reproducirCancion();
});

// Funciones para cambiar a la siguiente canción
botonAdelante.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});
// Funciones para cambiar a la canción anterior
botonAtras.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();                                                                                            

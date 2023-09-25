let seleccionoJugador = false; // Variable para rastrear si se hizo una selección
let jugador = ""; // Variable para rastrear el jugador actual
let tablero = ["", "", "", "", "", "", "", "", ""]; // Tablero del juego
let xPuntaje = 0;
let oPuntaje = 0;

const xSimbolo = document.querySelector(".X");
const oSimbolo = document.querySelector(".O");
const cajas = document.querySelectorAll(".caja");
const reiniciarBoton = document.querySelector("button");
const pantalla = document.querySelector(".pantalla");
const imagen = document.getElementById("imagen");
const xPuntajeP = document.querySelector(".xPuntaje");
const oPuntajeP = document.querySelector(".oPuntaje");

xSimbolo.addEventListener("click", function () {
    jugadorSeleccionado("X", xSimbolo);
    oSimbolo.style.pointerEvents = "none";
});

oSimbolo.addEventListener("click", function () {
    jugadorSeleccionado("O", oSimbolo);
    xSimbolo.style.pointerEvents = "none";
});

reiniciarBoton.addEventListener("click", function () {
    resetGame();
});

function jugadorSeleccionado(simbolo, elemento) {
    if (!seleccionoJugador) {
        console.log(`El símbolo "${simbolo}" fue seleccionado.`);
        pantalla.textContent = `El símbolo "${simbolo}" fue seleccionado.`;
        jugador = simbolo;
        seleccionoJugador = true; // Marcamos que se hizo una selección
        elemento.style.pointerEvents = "none";
        elemento.style.borderColor = "brown"; // Deshabilitamos futuros clics en este elemento
        initGame();
    }
}

function initGame() {
    cajas.forEach((caja, p) => {
        caja.addEventListener('click', function () {
            if (tablero[p] === "" && jugador !== "") {
                console.log(`Caja ${p + 1} fue clickeada.`);
                caja.textContent = jugador;
                tablero[p] = jugador;
                jugador = jugador === "X" ? "O" : "X"; // Cambiar el jugador
                if (jugador === "X") {
                    oSimbolo.style.borderColor = "black";
                    xSimbolo.style.borderColor = "brown";
                } else if (jugador === "O") {
                    xSimbolo.style.borderColor = "black";
                    oSimbolo.style.borderColor = "brown";
                }
                caja.style.pointerEvents = "none"; // Deshabilitar clics en esta caja

                console.log(tablero);
                if (ganador() === "X") {
                    pantalla.textContent = 'Ganador el jugador "X"';
                    xPuntaje += 1;
                    xPuntajeP.textContent = `${xPuntaje}`;
                    imagen.src = "./img/Xganador.png";
                } else if (ganador() === "O") {
                    pantalla.textContent = 'Ganador el jugador "O"';
                    oPuntaje += 1;
                    oPuntajeP.textContent = `${oPuntaje}`;
                    imagen.src = "./img/Oganador.png";
                } else if (empataron()) {
                    pantalla.textContent = 'Empate';
                    imagen.src = "./img/empate.png";
                }
            }
        });
    });
}

function ganador() {
    if ((tablero[0] === "X" && tablero[4] === "X" && tablero[8] === "X") || (tablero[2] === "X" && tablero[4] === "X" && tablero[6] === "X") || (tablero[0] === "X" && tablero[1] === "X" && tablero[2] === "X") || (tablero[3] === "X" && tablero[4] === "X" && tablero[5] === "X") || (tablero[6] === "X" && tablero[7] === "X" && tablero[8] === "X") || (tablero[1] === "X" &&tablero[4] === "X" &&tablero[7] === "X")  || (tablero[0] === "X" &&tablero[3] === "X" &&tablero[6] === "X") || (tablero[2] === "X" &&tablero[5] === "X" &&tablero[8] === "X")) {
        return "X";
    } else if ((tablero[0] === "O" && tablero[4] === "O" && tablero[8] === "O") || (tablero[2] === "O" && tablero[4] === "O" && tablero[6] === "O") || (tablero[0] === "O" && tablero[1] === "O" && tablero[2] === "O") || (tablero[3] === "O" && tablero[4] === "O" && tablero[5] === "O") || (tablero[6] === "O" && tablero[7] === "O" && tablero[8] === "O") || (tablero[1] === "O" &&tablero[4] === "O" &&tablero[7] === "O") || (tablero[0] === "O" &&tablero[3] === "O" &&tablero[6] === "O") || (tablero[2] === "O" &&tablero[5] === "O" &&tablero[8] === "O")) {
        return "O";
    }
}

function empataron() {
    if (tablero.includes("")) {
        return false;
    } else {
        return true;
    }
}

function resetGame() {
    seleccionoJugador = false;
    jugador = "";
    tablero = ["", "", "", "", "", "", "", "", ""];
    pantalla.textContent = 'Selecciona el Jugador';
    xSimbolo.style.pointerEvents = "auto";
    oSimbolo.style.pointerEvents = "auto";
    xSimbolo.style.borderColor = "initial";
    oSimbolo.style.borderColor = "initial";
    imagen.src = "";
    cajas.forEach(caja => {
        caja.textContent = "";
        caja.style.pointerEvents = "auto";
    });
}

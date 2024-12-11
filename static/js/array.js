// Crear un arreglo para almacenar las fichas
const fichasArray = [];
document.querySelectorAll(".ficha").forEach((ficha) => {
    fichasArray.push({
        id: ficha.id,
        posicion: ficha.dataset.posicion,
        numero: ficha.dataset.numero,
        jugador: ficha.dataset.jugador,
        casilla_id: ficha.dataset.casilla_id,
    });
});

console.log("Arreglo de Fichas:", fichasArray);

// Crear un arreglo para almacenar las casillas
const casillasArray = [];
document.querySelectorAll(".casilla").forEach((casilla) => {
    casillasArray.push({
        id: casilla.id,
        re1: casilla.dataset.re1,
        re2: casilla.dataset.re2,
        columna: casilla.dataset.columna,
        fila: casilla.dataset.fila,
        tipo: casilla.dataset.tipo,
        esp1: casilla.dataset.esp1,
        esp2: casilla.dataset.esp2,
        numero: casilla.dataset.numero,
    });
});

console.log("Arreglo de Casillas:", casillasArray);

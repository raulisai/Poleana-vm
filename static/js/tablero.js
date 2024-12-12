import { moverFichaAfuera } from "./fichas.js";
import { actualizarTablaDebug } from "./debug.js";
let keydownListener = null; // Referencia al evento actual 

// Agregar eventos a todas las fichas al cargarse la página
document.querySelectorAll(".ficha").forEach((ficha) => {
    const casillaId = ficha.dataset.casilla_id;
    const fichaId = ficha.id;
    let posicion = ficha.dataset.posicion;
    let nuevaPosicion;
    const inicioCasilla = document.querySelector(
        `[id="${casillaId}"]`
    );
    
    if (inicioCasilla) {
        inicioCasilla.appendChild(ficha); // Mover ficha al contenedor
        ficha.dataset.casilla_id = casillaId; // Actualizar posición
        nuevaPosicion = posicion;
    } else {
        console.log("no se encontro la casilla");
    }
    
    actualizarTablaDebug(fichaId, nuevaPosicion, casillaId);
    
    ficha.addEventListener("click", () => {
        // Remover el listener anterior si existe
        let [dado1, dado2] = window.dados;
        console.log(fichaId);
        if (keydownListener) {
            document.removeEventListener("keydown", keydownListener);
            console.log("quitado");
        }
        // Validar si la ficha tiene posición inicial
        if (
            ficha.dataset.posicion === "-1" 
        ) {// Lógica para determinar la nueva posición según los dados
            if (
                (dado1 === 5 && dado2 === 1) || (dado1 === 1 && dado2 === 5) ||
                (dado1 === 4 && dado2 === 2) || (dado1 === 2 && dado2 === 4) ||
                (dado1 === 3 && dado2 === 3) 
            ) {
                nuevaPosicion = 0; // Caso 5-1 o 1-5
            } else if (
                (dado1 === 6 && dado2 === 3) || (dado1 === 3 && dado2 === 6)
            ) {
                nuevaPosicion = 3; // Caso 6-3 o 3-6

            } else if (
                dado1 === 6 && dado2 === 6
            ) {
                nuevaPosicion = 6; // Caso 6-6 con características adicionales
            }
            moverFichaAfuera(fichaId, nuevaPosicion);
            [dado1, dado2] = [0,0];
            console.log(dado1, dado2)
            posicion = nuevaPosicion;
        } else if (
            ficha.dataset.posicion > "-1" || ficha.dataset.posicion < "62"
        ) {
            keydownListener = (event) => {
                if (!ficha) {
                    console.log('Primero selecciona una ficha.');
                    return;
                }
                switch (event.key.toLowerCase()) {
                    case 'a':

                        nuevaPosicion = posicion + dado1;
                        dado1 = 0;
                
                        break;
                    case 'b':

                        nuevaPosicion = posicion + dado2;
                        dado2 = 0;

                        break;
                    case 'c':

                        nuevaPosicion = posicion + dado1 + dado2;
                        [dado1, dado2] = [0,0]

                        break;
                    default:
                        console.log('Tecla no válida.');
                        return;
                }
                moverFichaAfuera(fichaId, nuevaPosicion);
                posicion = nuevaPosicion;
                console.log(dado1, dado2);
                
            };
            document.addEventListener("keydown", keydownListener);
                    
        } else {
            console.log("Ficha no esta en rango");
        }
    });
});

document.querySelectorAll(".casilla").forEach((casilla) => {
    casilla.addEventListener("click", () => {
        const id = casilla.id || "desconocido";
        const esp1 = casilla.dataset.esp1 || "Desconocido";
        const numero = casilla.dataset.numero || "Desconocido";
        const re1 = casilla.dataset.re1 || "Desconocido";
        const re2 = casilla.dataset.re2 || "Desconocido";
        const esp2 = casilla.dataset.esp2 || "Desconocido";
        const fila = casilla.dataset.fila || "Desconocido";
        const tipo = casilla.dataset.tipo || "Desconocido";
        const columna = casilla.dataset.columna || "Desconocido";
        console.log(`Casilla selccionada : ${id}
            \nesp1: ${esp1}, esp2: ${esp2}
            \nFila: ${fila}, Columna: ${columna}
            \nnumero: ${numero}, tipo: ${tipo}
            \nre1: ${re1}, re2: ${re2}`);
    });
});

import { actualizarTablaDebug } from "./debug.js"

function contarFichasEnPosicion(jugador, posicion) {
    // Seleccionar todas las fichas
    const fichas = document.querySelectorAll(".ficha");
    
    // Filtrar y contar las fichas que coinciden con el jugador y la posición
    const contador = Array.from(fichas).filter(
        ficha => ficha.dataset.jugador === jugador && ficha.dataset.posicion === String(posicion)
    ).length;

    console.log(contador);
    return contador;
}

export function actualizarContadores() {
    const fichasJugador1 = contarFichasEnPosicion("1", -1);
    const fichasJugador2 = contarFichasEnPosicion("2", -1);

    document.getElementById("contador-jugador-1").innerText = `Jugador 1: ${fichasJugador1} fichas en -1`;
    document.getElementById("contador-jugador-2").innerText = `Jugador 2: ${fichasJugador2} fichas en -1`;
}

export async function moverFichaAfuera(fichaId, nuevaPosicion) {
    const respuesta = await fetch('/mover_ficha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ficha_id: fichaId, nueva_posicion: nuevaPosicion })
    });

    const data = await respuesta.json();
    console.log(data);
    
    if (data.success) {

        // Actualizar visualmente
        const ficha = document.getElementById(fichaId);
        console.log(ficha.dataset.jugador, fichaId);

        // Actualizar la tabla de depuración
        const nuevaCasilla = document.querySelector(`[data-re${ficha.dataset.jugador}="${nuevaPosicion}"]`);
        console.log(nuevaCasilla);

        if (nuevaCasilla) {
            nuevaCasilla.appendChild(ficha); // Mover ficha al contenedor
            ficha.dataset.posicion=nuevaPosicion; // Actualizar posición
            actualizarContadores();
        } else {
        console.error(`No se encontró la casilla para jugador 1 en posición ${nuevaPosicion}`);
        }
    } else {
        console.error("Error al mover la ficha:", data.mensaje);
    }
}

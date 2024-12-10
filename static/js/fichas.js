import { actualizarTablaDebug } from "./debug.js"

export async function moverFicha(fichaId, nuevaPosicion) {
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
        console.log(ficha.dataset.jugador);

        // Actualizar la tabla de depuración
        const casillaDestino = document.querySelector(`[data-re${ficha.dataset.jugador}="${nuevaPosicion}"]`);
        const fila = casillaDestino.getAttribute("data-fila");
        const columna = casillaDestino.getAttribute("data-columna");
        actualizarTablaDebug(ficha.id, nuevaPosicion, fila, columna);
        console.log("se actualizo la tabla");
        
        // Verificar si es del jugador 1 o 2
        if (ficha.dataset.jugador === "1") {
            // Buscar casilla para jugador 1 (re1)
            const nuevaCasilla = document.querySelector(
                `[data-re1="${nuevaPosicion}"][data-numero="${ficha.dataset.numero}"]`
            );
            console.log(nuevaCasilla);

            if (nuevaCasilla) {
                nuevaCasilla.appendChild(ficha); // Mover ficha al contenedor
                ficha.dataset.posicion = nuevaPosicion; // Actualizar posición
            } else {
                console.error(`No se encontró la casilla para jugador 1 en posición ${nuevaPosicion}`);
            }
        } else if (ficha.dataset.jugador === "2") {
            // Buscar casilla para jugador 2 (re2)
            const nuevaCasilla = document.querySelector(
                `[data-re2="${nuevaPosicion}"][data-numero="${ficha.dataset.numero}"]`
            );
            console.log(nuevaCasilla);
            
            if (nuevaCasilla) {
                nuevaCasilla.appendChild(ficha); // Mover ficha al contenedor
                ficha.dataset.posicion = nuevaPosicion; // Actualizar posición
            } else {
                console.error(`No se encontró la casilla para jugador 2 en posición ${nuevaPosicion}`);
            }
        } else {
            console.error("Jugador no identificado en el dataset.");
        }
    } else {
        console.error("Error al mover la ficha:", data.mensaje);
    }
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
        console.log(ficha.dataset.jugador);

        // Actualizar la tabla de depuración
        const casillaDestino = document.querySelector(`[data-re${ficha.dataset.jugador}="${nuevaPosicion}"]`);
        const fila = casillaDestino.getAttribute("data-fila");
        const columna = casillaDestino.getAttribute("data-columna");
        actualizarTablaDebug(ficha.id, nuevaPosicion, fila, columna);
        console.log("se actualizo la tabla");
        
        // Verificar si es del jugador 1 o 2
        if (ficha.dataset.jugador === "1") {
            // Buscar casilla para jugador 1 (re1)
            const nuevaCasilla = document.querySelector(
                `[data-re1="${nuevaPosicion}"]`
            );
            console.log(nuevaCasilla);

            if (nuevaCasilla) {
                nuevaCasilla.appendChild(ficha); // Mover ficha al contenedor
                ficha.dataset.posicion = nuevaPosicion; // Actualizar posición
            } else {
                console.error(`No se encontró la casilla para jugador 1 en posición ${nuevaPosicion}`);
            }
        } else if (ficha.dataset.jugador === "2") {
            // Buscar casilla para jugador 2 (re2)
            const nuevaCasilla = document.querySelector(
                `[data-re2="${nuevaPosicion}"]`
            );
            console.log(nuevaCasilla);
            
            if (nuevaCasilla) {
                nuevaCasilla.appendChild(ficha); // Mover ficha al contenedor
                ficha.dataset.posicion = nuevaPosicion; // Actualizar posición
            } else {
                console.error(`No se encontró la casilla para jugador 2 en posición ${nuevaPosicion}`);
            }
        } else {
            console.error("Jugador no identificado en el dataset.");
        }
    } else {
        console.error("Error al mover la ficha:", data.mensaje);
    }
}

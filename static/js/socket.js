import { mostrarNotificacion, sincronizarEstadoInicial } from './utils.js';
import { mostrarUltimosTiros } from './dados.js';
import { moverFicha, moverFichaAfuera,  } from './fichas.js';
var socket = io();

socket.on("connect", () => console.log("Conectado al servidor Socket.IO"));

socket.on('disconnect', () => console.log('Desconectado del servidor.'));

socket.on("mensaje", (data) => {
    console.log(data.mensaje);
});

// Eventos relacionados con el tablero
socket.on('estado_tablero', (data) => {
    mostrarNotificacion("El tablero ha sido actualizado");
    sincronizarEstadoInicial();
    console.log(`Tablero actualizado ${data}`); 
    });
socket.on("mover_ficha", (data) => {
    fichaID=data.ficha_id;
    nuevaPosicion=data.posicion;
    moverFicha(fichaId, nuevaPosicion);
    moverFichaAfuera(fichaId, nuevaPosicion);
    });

socket.on("actualizar_ultimos_tiros", (data) => {
    mostrarUltimosTiros(data); // Llama a la función modularizada
    });
    
socket.on("cambiar_turno", (data) => {
    document.getElementById("turno-actual").innerText = `Turno actual: Jugador ${data.jugador_id}`;
    mostrarNotificacion(`Es el turno del Jugador ${data.jugador_id}`);
});


export default socket;
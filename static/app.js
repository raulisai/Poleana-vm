import {  mostrarNotificacion } from './js/utils.js';
import { inicializarDados } from './js/dados.js';

document.addEventListener("DOMContentLoaded", async () => {
    const socket = io();
    let turnoActual = 1;
    inicializarDados(socket, turnoActual);
    mostrarNotificacion();
});

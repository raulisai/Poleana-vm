export function inicializarDados(socket, turnoActual) {
    document.getElementById("boton-tirar-dados-jugador-1").addEventListener("click", () => {
        if (turnoActual === 1) {
            socket.emit("tirar_dados", { jugador_id: turnoActual });
        } else {
            console.log("No es el turno del Jugador 1.");
        }
    });

    document.getElementById("boton-tirar-dados-jugador-2").addEventListener("click", () => {
        if (turnoActual === 2) {
            socket.emit("tirar_dados", { jugador_id: turnoActual });
        } else {
            console.log("No es el turno del Jugador 2.");
        }
    });
    socket.on("dados_lanzados", (data) => {
        document.getElementById("dado-1").innerText = data.dado1;
        document.getElementById("dado-2").innerText = data.dado2;

        // Si necesitas almacenar los dados globalmente
        window.dados = [data.dado1, data.dado2];

    });

    socket.on("cambiar_turno", (data) => {
        turnoActual = data.jugador_id;
        console.log(`Es el turno del Jugador ${turnoActual}`);
    });
}
// Mostrar los últimos tiros en la tabla
export function mostrarUltimosTiros(data) {
    const tablaTiros = document.querySelector("#tabla_tiros tbody");
    tablaTiros.innerHTML = ""; // Limpiar la tabla

    // Llenar la tabla con los últimos tiros
    data.tiros.forEach((tiro) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${tiro.jugador}</td>
            <td>${tiro.dado1}</td>
            <td>${tiro.dado2}</td>
        `;
        tablaTiros.appendChild(fila);
    });
  
}

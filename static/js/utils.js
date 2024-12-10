export function sincronizarEstadoInicial() {
    fetch('/estado_tablero')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!data || !data.fichas) {
                console.error("Datos inválidos recibidos:", data);
                return; // Salir si los datos son inválidos
            }
        })
        .catch((error) => {
            console.error("Error al sincronizar estado inicial:", error);
        });
}


// Mostrar notificaciones al usuario
export function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.innerText = mensaje;
    document.body.appendChild(notificacion);
    setTimeout(() => notificacion.remove(), 3000);
}

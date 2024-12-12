export function actualizarTablaDebug(fichaId, posicion, casilla_id) {
    const tablaDebug = document.getElementById("tabla-debug").querySelector("tbody");
    const filaExistente = Array.from(tablaDebug.children).find(
        (fila) => fila.children[0].innerText === fichaId
    );

    if (filaExistente) {
        // Actualiza la fila existente
        filaExistente.innerHTML = `
            <td>${fichaId}</td>
            <td>${posicion}</td>
            <td>${casilla_id}</td>
        `;
    } else {
        // Crea una nueva fila
        const nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <td>${fichaId}</td>
            <td>${posicion}</td>
            <td>${casilla_id}</td>
        `;
        tablaDebug.appendChild(nuevaFila);
    }
}
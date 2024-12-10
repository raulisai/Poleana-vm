"""_summary_Returns:_type_: _description_"""

from flask_socketio import emit
from dados import tirar_dados, obtener_ultimos_tiros
from game_state import game_state


def register_dados_eventos(socketio):
    """_summary_Returns:_type_: _description_"""

    @socketio.on("tirar_dados")
    def manejar_tirar_dados(data):
        print("Evento 'tirar_dados' recibido:", data)
        jugador_id = data.get("jugador_id")
        if not jugador_id:
            emit('error', {'mensaje': 'Jugador ID no proporcionado.'})
            return

        # Simular el lanzamiento de dados
        _, dado1, dado2 = tirar_dados(jugador_id)
        emit("dados_lanzados", {"dado1": dado1, "dado2": dado2}, broadcast=True)

        # Actualizar últimos tiros
        ultimos_tiros = obtener_ultimos_tiros()
        emit("actualizar_ultimos_tiros", {"tiros": ultimos_tiros}, broadcast=True)

        # Si los dados son pares, mantener el turno
        if dado1 == dado2:
            emit(
                "turno_repetido",
                {"jugador_id": game_state.obtener_turno_actual()},
                broadcast=True
            )
            print("turno reepetido")
            return  # Salir para no cambiar el turno

        # Cambiar al siguiente turno
        game_state.cambiar_turno()
        emit(
            "cambiar_turno",
            {"jugador_id": game_state.obtener_turno_actual()},
            broadcast=True
        )

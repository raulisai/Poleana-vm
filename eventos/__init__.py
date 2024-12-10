"""_summary_Returns:_type_: _description_"""
from .dados import register_dados_eventos
from .turnos import register_turnos_eventos

def register_eventos(socketio):
    """Cambia el turno al siguiente jugador."""
    register_dados_eventos(socketio)
    register_turnos_eventos(socketio)

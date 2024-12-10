"""_summary_Returns:_type_: _description_"""
from collections import deque
from random import randint

# Cola para almacenar los últimos tres lanzamientos
ultimos_tiros = deque(maxlen=3)

# Función para tirar los dados
def tirar_dados(jugador_id):
    """Función para tirar los dados y almacenar el resultado."""
    dado1 = randint(1, 6)
    dado2 = randint(1, 6)
    print(f"Jugador{jugador_id}: Dado1 = {dado1}, Dado2 = {dado2}")
    # Almacenar el resultado en la cola
    ultimos_tiros.append({"jugador": jugador_id, "dado1": dado1, "dado2": dado2})
    return jugador_id, dado1, dado2

def obtener_ultimos_tiros():
    """Devuelve los últimos tres lanzamientos de dados."""
    return list(ultimos_tiros)

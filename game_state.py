"""_summary_Returns:_type_: _description_"""
class GameState:
    """_summary_Returns:_type_: _description_"""
    def __init__(self):
        """_summary_Returns:_type_: _description_"""
        self.turno_actual = 1
        self.dados = {"dado1": 0, "dado2": 0}

    def cambiar_turno(self):
        """_summary_Returns:_type_: _description_"""
        self.turno_actual = 2 if self.turno_actual == 1 else 1
        return self.turno_actual

    def obtener_turno_actual(self):
        """_summary_Returns:_type_: _description_"""
        return self.turno_actual

    def actualizar_dados(self, dado1, dado2):
        """_summary_Returns:_type_: _description_"""
        self.dados["dado1"] = dado1
        self.dados["dado2"] = dado2

    def obtener_dados(self):
        """_summary_Returns:_type_: _description_"""
        return self.dados
# Crear una instancia global de GameState
game_state = GameState()

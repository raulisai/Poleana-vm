"""_summary_  Raises: ValueError: _description_  Returns: _type_: _description_"""

from flask import request, jsonify
from modelos import Ficha, db


def mover_fichas(ficha_id, nueva_posicion):
    """Actualizar la posición de una ficha en la base de datos."""
    data = request.json
    ficha_id = data.get("ficha_id")
    nueva_posicion = data.get("nueva_posicion")

    ficha = Ficha.query.filter_by(ficha_id=ficha_id).first()
    if not ficha:
        return jsonify({"success": False, "mensaje": "Ficha no encontrada."}), 404

    # Validación de movimiento desde posición inicial
    if ficha.posicion == -3 and nueva_posicion != -1:
        return (
            jsonify(
                {
                    "success": False,
                    "mensaje": "Movimiento inválido desde la posición -3.",
                }
            ),
            400,
        )

    # Validación de posiciones normales
    if ficha.posicion != -3 and (nueva_posicion < 0 or nueva_posicion > 61):
        return jsonify({"success": False, "mensaje": "Movimiento fuera de rango."}), 400

    # Actualizar la posición
    ficha.posicion = nueva_posicion
    db.session.commit()
    return jsonify({"success": True, "nueva_posicion": ficha.posicion})

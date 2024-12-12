"""_summary_Returns:_type_: _description_"""

from flask import render_template, jsonify, send_from_directory, request
from app_config import app, socketio, db
from eventos import register_eventos
from database_reset import reset_database
from modelos import Ficha, Jugador, Casilla
from tablero.casillas import tablero_configurado
from dados import obtener_ultimos_tiros
from game_state import game_state


reset_database()
# Reinicia la base de datos al iniciar la aplicación

# Registrar los eventos de Socket.IO
register_eventos(socketio)


@app.route("/")
def index():
    """_summary_Returns:_type_: _description_"""
    jugadores = Jugador.query.all()  # Obtenemos todos los jugadores
    fichas = Ficha.query.all()  # Obtenemos todas las fichas
    tiros = obtener_ultimos_tiros()
    return render_template(
        "index.html",
        jugadores=jugadores,
        fichas=fichas,
        casillas=game_state.obtener_casillas_tablero(),
        tiros=tiros,
    )


@app.route("/test")
def test():
    """_summary_Returns:_type_: _description_"""
    jugadores = Jugador.query.all()  # Obtenemos todos los jugadores
    fichas = Ficha.query.all()  # Obtenemos todas las fichas
    casillas = Casilla.query.all()
    print("Casillas:", casillas)
    return jsonify({"success": True, "mensaje": "Test exitoso."}), 200

@app.route("/mover_ficha", methods=["POST"])
def mover_ficha():
    """Mover fichas"""
    data = request.json

    if data is None:
        return jsonify({"success": False, "mensaje": "No se enviaron datos JSON."}), 400

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
    if ficha.posicion != -3 and nueva_posicion not in range(0, 62):
        return jsonify({"success": False, "mensaje": "Movimiento fuera de rango."}), 400

    # Actualizar la posición
    ficha.posicion = nueva_posicion
    db.session.commit()

    return jsonify({"success": True, "nueva_posicion": ficha.posicion})


@app.errorhandler(404)
def page_not_found(_):
    """_summary_Returns:_type_: _description_"""
    return "Ruta no encontrada. Revisa tus rutas o tu archivo index.html.", 404


@app.route("/static/<path:filename>")
def serve_static(filename):
    """_summary_Returns:_type_: _description_"""
    response = send_from_directory("static/data", filename)
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response


@app.after_request
def remove_csp_header(response):
    """_summary_Returns:_type_: _description_"""
    # Elimina el encabezado Content-Security-Policy si no es necesario
    if "Content-Security-Policy" in response.headers:
        del response.headers["Content-Security-Policy"]
    return response


if __name__ == "__main__":
    print("Iniciando servidor...")
    socketio.run(app, debug=True)

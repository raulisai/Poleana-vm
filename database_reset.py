"""AI is creating summary for Returns:[type]: [description]"""

from app_config import db, app
from modelos import Jugador, Ficha, Casilla
from tablero.casillas import tablero_configurado


def reset_database():
    "Base de datos reiniciada y datos iniciales agregados."
    with app.app_context():  # Asegura que Flask esté en un contexto de aplicación
        db.drop_all()  # Elimina todas las tablas
        db.create_all()  # Crea todas las tablas de nuevo
        print("Base de datos reiniciada y datos iniciales agregados.")

        # Agregar datos iniciales para verificar
        jugador1 = Jugador(nombre="1")
        jugador2 = Jugador(nombre="2")
        db.session.add(jugador1)
        db.session.add(jugador2)
        db.session.commit()

        # Crear fichas asociadas a los jugadores
        fichas = [
            Ficha(posicion=-3, jugador_id=i, numero=j)
            for i in range(1, 3)
            for j in range(1, 5)
        ]
        db.session.add_all(fichas)
        db.session.commit()

        # Agregar datos iniciales para verificar
        casillas = []
        for fila_index, fila in enumerate(tablero_configurado):
            for columna_index, celda in enumerate(fila):
                # Crear una instancia de Casilla
                casilla = Casilla(
                    fila=fila_index,
                    columna=columna_index,
                    re1=celda["re1"],
                    re2=celda["re2"],
                    numero=celda["numero"],
                    tipo= celda["tipo"],
                    esp1=celda["esp1"],
                    esp2=celda["esp2"],
                    rowspan=celda["rowspan"],
                    colspan=celda["colspan"],
                )
                casillas.append(casilla)

        # Insertar todas las casillas en la base de datos
        db.session.add_all(casillas)
        db.session.commit()

        print("Base de datos reiniciada con jugadores y fichas.")

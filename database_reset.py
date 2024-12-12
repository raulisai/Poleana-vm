"""AI is creating summary for Returns:[type]: [description]"""

from app_config import db, app
from modelos import Jugador, Ficha, Casilla


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


        print("Base de datos reiniciada con jugadores y fichas.")

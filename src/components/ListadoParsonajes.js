import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const ListadoPersonajes = ({ arrayPersonajes, correoUsuario, setArrayPersonajes }) => {
  async function eliminarPersonaje(idPersonajeAEliminar) {
    // crear nuevo array de tareas
    const nvoArrayPersonajes = arrayPersonajes.filter(
      (objetoPersonaje) => objetoPersonaje.id !== idPersonajeAEliminar
    );
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { Personajes: [...nvoArrayPersonajes] });
    //actualizar state
    setArrayPersonajes(nvoArrayPersonajes);
  }
  return (
    <Container>
      <Stack>
        {arrayPersonajes.map((objetoPersonaje) => {
          return (
            <>
              <Row>
                <Col>{objetoPersonaje.descripcion}</Col>
                <Col>
                  <a href={objetoPersonaje.url}>
                    <Button variant="secondary">Ver Personaje</Button>
                  </a>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => eliminarPersonaje(objetoPersonaje.id)}
                  >
                    Eliminar Personaje
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListadoPersonajes;
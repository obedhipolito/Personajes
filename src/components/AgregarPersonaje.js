import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarPersonaje = ({ correoUsuario, setArrayPersonajes, arrayPersonajes }) => {
  let urlDescarga;

  async function añadirPersonaje(e) {
    e.preventDefault();
    const descripcion = e.target.formDescripcion.value;
    // crear nuevo array de tareas
    const nvoArrayPersonajes = [
      ...arrayPersonajes,
      {
        id: +new Date(),
        descripcion: descripcion,
        url: urlDescarga,
      },
    ];
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { personajes: [...nvoArrayPersonajes] });
    //actualizar estado
    setArrayPersonajes(nvoArrayPersonajes);
    // limpiar form
    e.target.formDescripcion.value = "";
  }

  async function fileHandler(e) {
    // detectar archivo
    const archivoLocal = e.target.files[0];
    // cargarlo a firebase storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    // obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef);
  }
  return (
    <Container>
      <Form onSubmit={añadirPersonaje}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="file"
              placeholder="Añade archivo"
              onChange={fileHandler}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="descripcion del personaje"
              id="formDescripcion"
            />
          </Col>
          <Col>
            <Button type="submit"> Agregar Personaje</Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default AgregarPersonaje;
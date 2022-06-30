import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Container, Button } from "react-bootstrap";

import AgregarPersonaje from "./AgregarPersonaje";
import ListadoPersonajes from "./ListadoParsonajes";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayPersonajes, setArrayPersonajes] = useState(null);
  const fakeData = [
    { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
    { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/420" },
    { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/420" },
  ];

  async function buscarDocumentOrCrearDocumento(idDocumento) {
    //crear referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocumento}`);
    // buscar documento
    const consulta = await getDoc(docuRef);
    // revisar si existe
    if (consulta.exists()) {
      // si sí existe
      const infoDocu = consulta.data();
      return infoDocu.personajes;
    } else {
      // si no existe
      await setDoc(docuRef, { personajes: [...fakeData] });
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.personajes;
    }
  }

  useEffect(() => {
    async function fetchPersonajes() {
      const personajesFetchadas = await buscarDocumentOrCrearDocumento(
        correoUsuario
      );
      setArrayPersonajes(personajesFetchadas);
    }

    fetchPersonajes();
  }, []);

  return (
    <Container>
      <AgregarPersonaje
        arrayPersonajes={arrayPersonajes}
        setArrayPersonajes={setArrayPersonajes}
        correoUsuario={correoUsuario}
      />
      {arrayPersonajes ? (
        <ListadoPersonajes
          arrayPersonajes={arrayPersonajes}
          setArrayPersonajes={setArrayPersonajes}
          correoUsuario={correoUsuario}
        />
      ) : null}
      <h4>sesión iniciada</h4>
      <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
      <hr />
    </Container>
  );
};

export default Home;
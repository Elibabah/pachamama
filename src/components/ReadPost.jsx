import React from "react";
import { updateDoc, doc, getDoc, setDoc} from "firebase/firestore"
import { db } from "../firebase"
// READ
export const ReadPost = ( {arrayPublicaciones, correoUsuario, setArrayPublicaciones, publicaciones, title, story} ) => {

      async function eliminarPublicacion(idPublicacionAEliminar){
            //crear nuevo Array de tareas
            const newArrayPublicaciones = arrayPublicaciones.filter(
                  (objetoPublicacion)=> objetoPublicacion.id !== idPublicacionAEliminar
            );
            //actualizar base de datos
            const docuRef = doc(db, `social/${correoUsuario}`);
            updateDoc(docuRef, { publicaciones: [...newArrayPublicaciones]});
            //actualizar state
            setArrayPublicaciones(newArrayPublicaciones);
      }

      async function editarPublicacion(idPublicacionAEditar, title, story){
            // obtener valores
            console.log(idPublicacionAEditar, title, story)
            //const docuRef = doc(db, `social/${idPublicacionAEditar}`)

            //////////////////////////////////////
            //buscar documento
            //const consulta = await getDoc(docuRef);
            //revisar si existe 
            //if (consulta.exists()) {
            //Si existe:
            ////const infoDocu = consulta.data()
            ///console.log(infoDocu.publicaciones)}
            //console.log(consulta.data())
      }

      return(
            <div>
                  <h1>Hola, estás leyendo el feed</h1>
                  <div>
                        {arrayPublicaciones.map((objetoPublicacion) => {
                              return (
                                    <div key={objetoPublicacion.id}> 
                                          <div key={objetoPublicacion.id}>{objetoPublicacion.title}</div>
                                          <div>{objetoPublicacion.story}</div>
                                          <button onClick={()=> eliminarPublicacion(objetoPublicacion.id)}>Delete</button>
                                          <button onClick={()=> editarPublicacion(objetoPublicacion.id, objetoPublicacion.title, objetoPublicacion.story)}>Edit</button>
                                                <div>
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </div>
      )
}
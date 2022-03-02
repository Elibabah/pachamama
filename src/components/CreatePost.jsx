import React from "react";
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
//import { Container, Form, Col, Row } from "react-bootstrap"

export const CreatePost = ({correoUsuario, arrayPublicaciones, setArrayPublicaciones}) => {

      async function añadirPublicacion(e){
            e.preventDefault();
            const title = e.target.title.value
            const story = e.target.story.value
            console.log(title);
            console.log(story)
            // crear nuevo array de publicaciones
            const newArrayPublicaciones = [...arrayPublicaciones, {id: +new Date(), title: title, story: story}]
            //actualizar base de datosh
            const docuRef = doc(db, 'social');
            updateDoc(docuRef, { publicaciones: [...newArrayPublicaciones]});
            //actualizar el estado
            setArrayPublicaciones(newArrayPublicaciones);
            //limpiar form
            e.target.title.value = "";
            e.target.story.value = "";
      }


      return (
      <div>      
            <form onSubmit={añadirPublicacion} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                  <label htmlFor="title" className='block text-gray-700 text-sm font-fold mb-2'>Cuéntanos tu historia</label>

                  <input type="text" id="title" placeholder="título" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>


                  <input type="text" id="story" placeholder="Escribe tu historia" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                  <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create Post</button>

            </form> 
      </div>
      )}
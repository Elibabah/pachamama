import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, getDocs, doc, onSnapshot, querySnapshot, deleteDoc} from "firebase/firestore";
import { db } from "../firebase"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export const CrudRead = (correoUsuario) => {
      const [posts, setPosts] = useState([])
      const postsCollectionRef = collection(db, "posts");

      useEffect(() =>{
            const getPosts = async () => {
                  const data = await getDocs(postsCollectionRef);
                  setPosts(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
            };
            console.log(setPosts)
            getPosts();
      }, []);


      async function eliminarPublicacion(id){
            console.log(id)
            await deleteDoc(doc(db, "posts", id));
            //actualizar state
      }

      const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
      };

      const [open, setOpen] = React.useState(false);

      const valoresInputs = {title: "", story: ""}

      const [values, setValues] = useState(valoresInputs);

      const handleInputChange = e => {
            const {id, value} = e.target
            setValues({...values, [id]: value})
      }
      
      const enviarEdit = (e) =>{
            e.preventDefault()
            console.log(values)
      }

      const handleEditar = async (id) => {
            setOpen(true)
            console.log(id)

            //Obtener documento de firestore usando su ID
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            //Encontramos valores
            console.log(docSnap.data().title)
            console.log(docSnap.data().story)

            //Actualizamos inputs con valores de firestore
            const title = docSnap.data().title
            const story = docSnap.data().story

            const newValues = {
                  title: title,
                  story: story
            }

            console.log(newValues)
            setValues({...newValues})

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
      };

      const handleClose = () => setOpen(false);

      return(
            <div>
                  <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edita tu historia
                  </Typography>
                        <form onSubmit={enviarEdit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                              <input onChange={handleInputChange} type="text" id="title" placeholder="t??tulo" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                              <input onChange={handleInputChange} type="text" id="story" placeholder="Escribe tu historia" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                              <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Guardar editado</button>
                        </form>
                  </Box>
                  </Modal>

                  {posts.map(post => {
                        console.log(correoUsuario.correoUsuario, post.author.correoUsuario)
                              return(
                              <div key={post.id}>
                                    <h1>T??tulo: {post.title}</h1>
                                    <p>Historia: {post.story}</p>
                                    {correoUsuario.correoUsuario === post.author.correoUsuario ? (
                                          <div>
                                                <Button onClick={()=>handleEditar (post.id, post.title, post.story)}>Editar</Button>
                                                <button onClick={()=> eliminarPublicacion(post.id)}>Eliminar</button>
                                          </div>
                                    ): (null)}
                              </div>
                              )
                  })}
            </div>)
      }


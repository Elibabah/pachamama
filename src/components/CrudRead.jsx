import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot, querySnapshot, deleteDoc} from "firebase/firestore";
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

      /*const getData = () => {
            postsCollectionRef.onSnapshot((resultados) => {
            const datos = resultados.docs.map((doc) => ({
                  id: doc.id, 
                  ...doc.data(), 
            }));
            console.log("Todos los datos de la colección 'posts'", datos);
            });
      }
      useEffect(() => {
            getData();
      }, []);*/

      async function eliminarPublicacion(id){
            console.log(id)
            await deleteDoc(doc(db, "posts", id));
            //actualizar state
      }

      async function editarPublicacion(id, title, story){
            console.log(id, title, story)
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
      const handleOpen = (id, title, story) => {
            setOpen(true)
            console.log(id, title, story)
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
                        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                              <input type="text" id="title" placeholder="título" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                              <input type="text" id="story" placeholder="Escribe tu historia" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                              <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Guardar editado</button>
                        </form>
                  </Box>
                  </Modal>

                  {posts.map(post => {
                        console.log(correoUsuario.correoUsuario, post.author.correoUsuario)
                              return(
                              <div key={post.id}>
                                    <h1>Título: {post.title}</h1>
                                    <p>Historia: {post.story}</p>
                                    {correoUsuario.correoUsuario === post.author.correoUsuario ? (
                                          <div>
                                                <Button onClick={()=>handleOpen (post.id, post.title, post.story)}>Editar</Button>
                                                <button onClick={()=> eliminarPublicacion(post.id)}>Eliminar</button>
                                          </div>
                                    ): (null)}
                              </div>
                              )
                  })}
            </div>)
      }

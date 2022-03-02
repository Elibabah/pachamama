import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot, querySnapshot } from "firebase/firestore";
import { db } from "../firebase"


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
            /*db.collection("posts").doc(id).delete().then(function(){
                  console.log("Document successfully deleted!");
            }).catch(function(error){
                  console.log("Error removing document: ", error);
            })*/
            //actualizar state
            //setArrayPublicaciones(newArrayPublicaciones);
      }

      return(
            <div>
                  {posts.map(post => {
                        console.log(correoUsuario.correoUsuario, post.author.correoUsuario)
                              return(
                              <div key={post.id}>
                                    <h1>Título: {post.title}</h1>
                                    <p>Historia: {post.story}</p>
                                    {correoUsuario.correoUsuario === post.author.correoUsuario ? (
                                          <div>
                                                <button onClick={()=> eliminarPublicacion(post.id)}>Eliminar</button>
                                                <button>Editar</button>
                                          </div>
                                    ): (null)}
                              </div>
                              )      
                  })}
            </div>)
      }


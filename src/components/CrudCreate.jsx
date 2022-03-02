import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const CrudCreate = (correoUsuario) => {

      async function añadirPublicacion(e) {
            e.preventDefault();
            const title = e.target.title.value
            const story = e.target.story.value
            const date = new Date()
            console.log(title, story);
            console.log(correoUsuario)
            try {
                  const docRef = await addDoc(collection(db, "posts"), {
                  title: title,
                  story: story,
                  author: correoUsuario,
                  date: date
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }
            e.target.title.value = ""
            e.target.story.value = ""
      }

      return(
            <div>
                  <form onSubmit={añadirPublicacion} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                  <label htmlFor="title" className='block text-gray-700 text-sm font-fold mb-2'>Cuéntanos tu historia</label>

                  <input type="text" id="title" placeholder="título" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                  <input type="text" id="story" placeholder="Escribe tu historia" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                  <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create Post</button>
                  </form> 
            </div>


      )
}
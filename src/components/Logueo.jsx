import React, {useState} from "react";
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
const googleProvider = new GoogleAuthProvider()

export const Logueo = () => {
      const [estaRegistrandose, setEstaRegistrandose] = useState(false)
      // Login con registro de correo y contraseña 
      async function submitHandler(e){
            e.preventDefault();

            const email = e.target.email.value;
            const password = e.target.password.value
            const date = new Date()

            if(estaRegistrandose){
                  const user = await createUserWithEmailAndPassword(auth, email, password)
                  console.log(user)
                  try {
                  const docRef = await addDoc(collection(db, "users"), {
                  email: email,
                  password: password, 
                  date: date
                  }); 
                  console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                  console.error("Error adding document: ", e);
                  }
            }else{
                  signInWithEmailAndPassword(auth, email, password)
            }
      }

      return (
      <div className='w-full max-w-xs m-auto'>
            <h2 className="text-center">{estaRegistrandose ? "Register" : "Login"}</h2>
            <form onSubmit={submitHandler} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

            <div className='mb-4'>
                  <label htmlFor="email" className='block text-gray-700 text-sm font-fold mb-2'>Email</label>
                  <input type="email" name="email" id="email" placeholder="email@server.com" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>

            <div className='mb-4'>
                  <label htmlFor="password" className='block text-gray-700 text-sm font-fold mb-2'>Ingresa tu contraseña</label>
                  <input type="password" name="password" id="password" placeholder="******"  className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='flex items-center justify-between'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>{estaRegistrandose ? "Register" : "Login"}</button>
            </div>
            </form> 

            <button className='bg-red-600 hover:bg-red-500 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full' onClick={()=> signInWithPopup(auth, googleProvider)} >Login with Google</button>

            <button className='bg-red-600 hover:bg-red-500 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full' onClick={()=> setEstaRegistrandose(!estaRegistrandose)} >{estaRegistrandose ? "Already have an account? Login" : "Doesn't have an account? Register"}</button>
      </div>
      )}

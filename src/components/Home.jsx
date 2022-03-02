import React, { useState, useEffect } from "react";
import { app, auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { CrudCreate } from "./CrudCreate"
import { CrudRead } from "./CrudRead"

export const Home = ({correoUsuario}) => {
      console.log(correoUsuario)
//AQUí USERS
      return (
      <div>
            <h1>Welcome, {correoUsuario}</h1>
            <button onClick={()=> signOut(auth)} >LogOut</button>
            <CrudCreate correoUsuario={correoUsuario}/>
            <CrudRead correoUsuario={correoUsuario}/>
      </div>
      )}

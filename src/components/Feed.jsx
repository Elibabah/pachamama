import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"

export const Feed = (postsArray) => {
      console.log("Feed")
      console.log(postsArray)

      return(
            <div>
                  <h1>News Feed Here!</h1>
                  {console.log(postsArray)}
                  {postsArray.map((post) => {
                        return(
                        <div key={post.id}>      
                              <h3>{post.title}</h3>
                              <p>{post.story}</p>
                              <button>Eliminar</button>
                              <button>Edit</button>
                        </div>
                  )})}
            </div>
      )
}
import React, {useState, useEffect} from "react";
import {Home} from "./components/Home";
import {Logueo} from "./components/Logueo";
import {app} from "./firebase";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (userActivo) => {
    if(userActivo){
      setUsuarioGlobal(userActivo)
      //console.log(userActivo)
    }else{
      setUsuarioGlobal(null);
    }
  })


  return (usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email}/> : <Logueo/>)

;
}

export default App;

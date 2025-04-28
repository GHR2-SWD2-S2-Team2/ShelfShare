import { createContext, useState } from "react";

export let userContext= createContext()

export default function UserContextProvider(props){
    const[isLogin, setLogin]= useState(null)

    return <userContext.Provider value={{isLogin,setLogin}}>
        {props.children}
    </userContext.Provider>
}
import { useEffect, useState } from "react"
import { UsuarioContext } from "../context/UsuarioContext"


const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const usuarioStorage = JSON.parse(localStorage.getItem("Usuario")) || null
        setUsuario(usuarioStorage)
    }, [])

    return (
        <UsuarioContext.Provider
            value={{
                usuario,    
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider
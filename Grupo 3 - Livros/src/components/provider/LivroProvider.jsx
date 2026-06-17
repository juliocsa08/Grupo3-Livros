import { useEffect, useState } from "react"
import { LivroContext } from "../context/LivroContext"


const LivroProvider = ({ children }) => {
    const [livro, setLivro] = useState(null)

    useEffect(() => {
        const livroStorage = JSON.parse(localStorage.getItem("Livro")) || null
        setLivro(livroStorage)
    }, [])

    return (
        <LivroContext.Provider value={{
            livro,
            setLivro
        }}>
            {children}
        </LivroContext.Provider>
    )
}

export default LivroProvider
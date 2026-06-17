import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import CadastroGenero from "../pages/CadastroGenero/cadastroGenero"
import CadastroLivro from "../pages/CadastroLivro/cadastroLivro"


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/genero" element={<CadastroGenero />} />
                <Route path="/livro" element={<CadastroLivro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas
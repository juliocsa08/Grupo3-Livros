import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import CadastroGenero from "../pages/CadastroGenero/cadastroGenero"
import CadastroLivro from "../pages/CadastroLivro/cadastroLivro"
import Cadastro from "../pages/cadastro/Cadastro"
import PrivateRoute from "./PrivateRoute"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <CadastroGenero />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/genero" 
                    element={
                        <PrivateRoute>
                            <CadastroGenero />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/livro" 
                    element={
                        <PrivateRoute>
                            <CadastroLivro />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas
import { useContext } from "react"
import "./Header.css"
import Logo from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_31_49.png"
import { LivroContext } from "../context/LivroContext"
import { UsuarioContext } from "../context/UsuarioContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const Header = () => {
    const { livro, setLivro } = useContext(LivroContext)
    const { setUsuario } = useContext(UsuarioContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("Usuario")
        localStorage.removeItem("usuario")
        setUsuario(null)
        navigate("/")
    }

    return (
        // <PrivateRoute>
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, redireciona para a tela login */}
                <Link to="/">
                    <img src={Logo} alt="Logo da Biblioteca" />
                </Link>

                <nav className="nav_header">
                    <Link className="link_header" to="/Livro">Livro</Link>
                    <Link className="link_header" to="/Genero">Gênero</Link>
                    
                    <button className="link_header logout_btn" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        Sair
                    </button>
                </nav>
            </div>
        </header>
        /* </PrivateRoute>*/
    )
}

export default Header
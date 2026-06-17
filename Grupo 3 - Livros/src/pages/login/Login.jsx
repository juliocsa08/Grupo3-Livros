import "./Login.css";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_31_49.png";
import BannerBiblioteca from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_36_43.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()

        navigate("/genero")
    }

    return (
        <main className="main_login">
            <div
                className="banner"
                style={{
                    backgroundImage: `url(${BannerBiblioteca})`
                }}
            ></div>

            <section className="section_login">
                <img src={Logo} alt="Biblioteca Digital" className="logo" />

                <form className="form_login">
                    <h1>Login</h1>

                    <div className="campos_login">
                        <div className="campo_input">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                            />
                        </div>

                        <div className="campo_input">
                            <label>Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                            />
                        </div>
                    </div>

                    <Botao onClick={login} nomeDoBotao="Entrar" btnEditar={true} />
                </form>
            </section>
        </main>
    );
};

export default Login;
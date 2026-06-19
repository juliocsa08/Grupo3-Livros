import "./Login.css";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_31_49.png";
import BannerBiblioteca from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_36_43.png";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Alerta } from "../../components/alerta/Alerta";
import api from "../../services/Services";
import { UsuarioContext } from "../../components/context/UsuarioContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUsuario } = useContext(UsuarioContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = async (e) => {
        e.preventDefault();

        if (email.trim().length === 0 || senha.trim().length === 0) {
            Alerta({
                title: "Atenção",
                text: "Por favor, preencha todos os campos.",
                icon: "warning",
                confirmButtonText: "Fechar"
            });
            return;
        }

        try {
            const response = await api.post("/Login", {
                email: email.trim(),
                senha: senha.trim()
            });

            const userSession = {
                email: email.trim(),
                token: response.data.token
            };

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("Usuario", JSON.stringify(userSession));
            localStorage.setItem("user", JSON.stringify(userSession));
            setUsuario(userSession);

            Alerta({
                title: "Login realizado!",
                text: "Bem-vindo de volta.",
                icon: "success",
                confirmButtonText: "Fechar"
            });

            navigate("/home");
        } catch (error) {
            console.error("Erro no login", error);
            Alerta({
                title: "Acesso negado",
                text: "E-mail ou senha incorretos.",
                icon: "error",
                confirmButtonText: "Fechar"
            });
        }
    };

    const obterSaudacao = () => {
        const hora = new Date().getHours()
        if (hora >= 6 && hora < 12) {
            return "Bom dia, leitor."
        } else if (hora >= 12 && hora < 18) {
            return "Boa tarde, leitor."
        } else {
            return "Boa noite, leitor."
        }
    }

    return (
        <main className="main_login">
            {/* Banner superior 100% largura */}
            <div
                className="banner"
                style={{ backgroundImage: `url(${BannerBiblioteca})` }}
            >
                <div className="banner_overlay"></div>
                <div className="banner_texto">
                    <h2>Acervo Literário<br />Digital</h2>
                    <p>Gerencie livros e gêneros com elegância</p>
                </div>
            </div>

            {/* Painel de login centralizado abaixo do banner */}
            <section className="section_login">
                {/* Seção de Boas-Vindas */}
                <div className="login_welcome_container">
                    <span className="login_saudacao">{obterSaudacao()}</span>
                    <h1 className="login_boas_vindas_titulo">Bem-vindo ao Acervo Literário Digital</h1>
                    <div className="login_welcome_divider"></div>
                    <p className="login_boas_vindas_subtitulo">Explore, gerencie e organize sua coleção com elegância.</p>
                </div>

                <div className="login_card">
                    <img src={Logo} alt="Biblioteca Digital" className="logo" />

                    <form className="form_login" onSubmit={login}>
                        <h1>Entrar</h1>
                        <p className="login_subtitulo">Acesse o painel editorial</p>

                        <div className="campos_login">
                            <div className="campo_input">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="campo_input">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>

                        <Botao onClick={login} nomeDoBotao="Acessar" btnEditar={true} />

                        <div className="login_link_cadastro" style={{ textAlign: "center", marginTop: "16px" }}>
                            <span 
                                onClick={() => navigate("/cadastro")} 
                                style={{ 
                                    fontSize: "14px", 
                                    color: "var(--cor-secundaria)", 
                                    cursor: "pointer", 
                                    fontWeight: "500" 
                                }}
                                onMouseEnter={(e) => { e.target.style.color = "var(--cor-primaria-hover)"; e.target.style.textDecoration = "underline"; }}
                                onMouseLeave={(e) => { e.target.style.color = "var(--cor-secundaria)"; e.target.style.textDecoration = "none"; }}
                            >
                                Não possui conta? Cadastre-se
                            </span>
                        </div>
                    </form>
                </div>
                <span className="login_rodape">Biblioteca Digital © {new Date().getFullYear()}</span>
            </section>
        </main>
    );
};

export default Login;
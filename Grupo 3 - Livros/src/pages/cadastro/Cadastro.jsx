import "./Cadastro.css";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_31_49.png";
import BannerBiblioteca from "../../assets/ChatGPT Image 12 de jun. de 2026, 13_36_43.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alerta } from "../../components/alerta/Alerta";
import API_URL from "../../services/api";

const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const cadastrar = async (e) => {
        e.preventDefault();

        // Validations
        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            Alerta({
                title: "Atenção",
                text: "Por favor, preencha todos os campos.",
                icon: "warning",
                confirmButtonText: "Fechar"
            });
            return;
        }

        if (!validarEmail(email.trim())) {
            Alerta({
                title: "Atenção",
                text: "Por favor, insira um e-mail válido.",
                icon: "warning",
                confirmButtonText: "Fechar"
            });
            return;
        }

        if (senha.length < 6) {
            Alerta({
                title: "Atenção",
                text: "A senha deve ter no mínimo 6 caracteres.",
                icon: "warning",
                confirmButtonText: "Fechar"
            });
            return;
        }

        if (senha !== confirmarSenha) {
            Alerta({
                title: "Atenção",
                text: "A senha e a confirmação de senha não coincidem.",
                icon: "warning",
                confirmButtonText: "Fechar"
            });
            return;
        }

        setLoading(true);

        const dados = {
            nome: nome.trim(),
            email: email.trim(),
            senha: senha.trim()
        };

        try {
            const response = await fetch(`${API_URL}/Usuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Erro ao realizar o cadastro.");
            }

            Alerta({
                title: "Conta criada!",
                text: "Cadastro realizado com sucesso.",
                icon: "success",
                confirmButtonText: "Fechar"
            });

            // Limpar formulário
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar", error);
            const errorMsg = error.message || "";
            if (
                errorMsg.toUpperCase().includes("UNIQUE KEY") || 
                errorMsg.toUpperCase().includes("UQ_") || 
                errorMsg.toUpperCase().includes("DUPLICATE") || 
                errorMsg.toUpperCase().includes("VIOLATION") ||
                errorMsg.toUpperCase().includes("JÁ CADASTRADO")
            ) {
                Alerta({
                    title: "E-mail já cadastrado",
                    text: "Utilize outro e-mail ou faça login.",
                    icon: "warning",
                    confirmButtonText: "Fechar"
                });
            } else {
                Alerta({
                    title: "Erro ao cadastrar",
                    text: errorMsg || "Não foi possível realizar o cadastro no momento.",
                    icon: "error",
                    confirmButtonText: "Fechar"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="main_cadastro">
            {/* Banner superior 100% largura */}
            <div
                className="banner"
                style={{ backgroundImage: `url(${BannerBiblioteca})` }}
            >
                <div className="banner_overlay"></div>
                <div className="banner_texto">
                    <h2>Crie sua conta</h2>
                    <p>Cadastre-se para acessar e explorar o acervo.</p>
                </div>
            </div>

            {/* Painel de cadastro centralizado abaixo do banner */}
            <section className="section_cadastro">
                <div className="cadastro_card">
                    <img src={Logo} alt="Biblioteca Digital" className="logo" />

                    <form className="form_cadastro" onSubmit={cadastrar}>
                        <h1>Cadastrar-se</h1>
                        <p className="cadastro_subtitulo">Crie sua credencial de acesso</p>

                        <div className="campos_cadastro">
                            <div className="campo_input">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="campo_input">
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="campo_input">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="campo_input">
                                <label>Confirmar Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <Botao
                            onClick={cadastrar}
                            nomeDoBotao={loading ? "Cadastrando..." : "Cadastrar"}
                            disabled={loading}
                        />

                        <div className="cadastro_link_login">
                            <span onClick={() => navigate("/")}>Já possui conta? Entrar</span>
                        </div>
                    </form>
                </div>
                <span className="cadastro_rodape">Biblioteca Digital © {new Date().getFullYear()}</span>
            </section>
        </main>
    );
};

export default Cadastro;

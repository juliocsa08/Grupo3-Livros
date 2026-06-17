import "./cadastroLivro.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import { useEffect, useState } from "react"
import { Alerta } from "../../components/alerta/Alerta"
import api from "../../services/Services"
import { LoadingIcon } from "../../components/loading/LoadingIcon"
import { gerarResumo } from "../../services/IAServices"

const CadastroLivro = () => {
    const [valor, setValor] = useState("")
    const [autor, setAutor] = useState("")
    const [ano, setAno] = useState("")
    const [imagem, setImagem] = useState("")
    const [editar, setEditar] = useState(false)
    const [listaLivros, setListaLivros] = useState([])
    const [id, setId] = useState(0)
    const [idGenero, setIdGenero] = useState("")
    const [showLoading, setShowLoading] = useState(false)
    const [listaGeneros, setListaGeneros] = useState([])

    const getGeneros = async () => {
        try {
            const response = await api.get("/Genero")
            setListaGeneros(response.data)
            if (response.data.length > 0 && !idGenero) {
                setIdGenero(response.data[0].idGenero)
            }
        } catch (error) {
            console.error("Erro ao buscar gêneros", error)
        }
    }

    const getLivros = async () => {
        setShowLoading(true)
        try {
            const response = await api.get("/Livros")
            setListaLivros(response.data)
        } catch (error) {
            console.error("Erro ao buscar livros", error)
            Alerta({
                title: "Erro ao buscar livros",
                text: "Não foi possível carregar a lista de livros.",
                icon: "error",
                confirmButtonText: "Fechar"
            })
        } finally {
            setShowLoading(false)
        }
    }

    const cadastrarLivro = async (e) => {
        e.preventDefault()

        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o nome do livro",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        if (autor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o nome do autor",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        if (!ano) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o ano de lançamento",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        setShowLoading(true)
        try {
            const formData = new FormData()
            formData.append("titulo", valor.trim())
            formData.append("autor", autor.trim())
            formData.append("ano", Number(ano))
            formData.append("idGenero", Number(idGenero))
            if (imagem) {
                formData.append("imagem", imagem)
            }

            await api.post("/Livros", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            Alerta({
                title: "Cadastro de Livro",
                text: "Livro cadastrado com sucesso",
                icon: "success",
                confirmButtonText: "Fechar"
            })

            limparDados()
            getLivros()
        } catch (error) {
            console.error("Erro ao cadastrar livro", error)
            Alerta({
                title: "Erro ao cadastrar",
                text: "Não foi possível cadastrar o livro. Verifique os dados.",
                icon: "error",
                confirmButtonText: "Fechar"
            })
        } finally {
            setShowLoading(false)
        }
    }

    const preEditar = (item) => {
        setValor(item.titulo)
        setAutor(item.autor || "")
        setAno(item.ano || "")
        setId(item.idLivro)
        setIdGenero(item.idGenero)
        setEditar(true)
    }

    const editarLivro = async (e) => {
        e.preventDefault()

        if (valor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o nome do livro",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        if (autor.trim().length === 0) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o nome do autor",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        if (!ano) {
            Alerta({
                title: "Cadastro de Livro",
                text: "Preencher o ano de lançamento",
                icon: "warning",
                confirmButtonText: "Fechar"
            })
            return
        }

        setShowLoading(true)
        try {
            const formData = new FormData()
            formData.append("titulo", valor.trim())
            formData.append("autor", autor.trim())
            formData.append("ano", Number(ano))
            formData.append("idGenero", Number(idGenero))
            if (imagem) {
                formData.append("imagem", imagem)
            }

            await api.put(`/Livros/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            Alerta({
                title: "Cadastro de Livro",
                text: "Livro editado com sucesso",
                icon: "success",
                confirmButtonText: "Fechar"
            })

            limparDados()
            getLivros()
        } catch (error) {
            console.error("Erro ao editar livro", error)
            Alerta({
                title: "Erro ao editar",
                text: "Não foi possível editar o livro.",
                icon: "error",
                confirmButtonText: "Fechar"
            })
        } finally {
            setShowLoading(false)
        }
    }

    const excluirLivro = async (item) => {
        setShowLoading(true)
        try {
            await api.delete(`/Livros/${item.idLivro}`)

            Alerta({
                title: "Cadastro de Livro",
                text: "Livro removido",
                icon: "success",
                confirmButtonText: "Fechar"
            })

            getLivros()
        } catch (error) {
            console.error("Erro ao excluir livro", error)
            Alerta({
                title: "Erro ao excluir",
                text: "Não foi possível excluir o livro.",
                icon: "error",
                confirmButtonText: "Fechar"
            })
        } finally {
            setShowLoading(false)
        }
    }

    const limparDados = () => {
        setValor("")
        setAutor("")
        setAno("")
        setEditar(false)
        setId(0)
        setImagem("")
        if (listaGeneros.length > 0) {
            setIdGenero(listaGeneros[0].idGenero)
        } else {
            setIdGenero("")
        }
    }

    const resumoDoLivro = async (livro) => {
        setShowLoading(true)

        try {
            const resumoIA = await gerarResumo(livro.titulo)
            setShowLoading(false)
            Alerta({
                title: `${livro.titulo}`,
                text: resumoIA,
                icon: "success",
                confirmButtonText: "Fechar"
            })
        } catch (error) {
            console.log("Deu ruim");
            console.log(error);

            setShowLoading(false)
        }
    }

    useEffect(() => {
        const loadInitialData = async () => {
            await getGeneros()
            await getLivros()
        }
        loadInitialData()
    }, [])

    return (
        <>
            <LoadingIcon showHide={showLoading} />
            <Header />

            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Livros"
                    placeholder="livro"
                    visibilidade="block"
                    mostrarImagem={true}

                    funcCadastro={editar ? editarLivro : cadastrarLivro}

                    valor={valor}
                    setValor={setValor}

                    autor={autor}
                    setAutor={setAutor}
                    ano={ano}
                    setAno={setAno}

                    listaGeneros={listaGeneros}
                    idGenero={idGenero}
                    setIdGenero={setIdGenero}

                    btnEditar={editar}
                    cancelarEdicao={limparDados}

                    setImagem={setImagem}
                />

                <Lista
                    tituloLista="Lista de Livros"
                    lista={listaLivros}
                    tipoLista="livro"
                    funcExcluir={excluirLivro}
                    funcEditar={preEditar}
                    listaGeneros={listaGeneros}
                    fnResumo={resumoDoLivro}
                />
            </main>

            <Footer />
        </>
    )
}

export default CadastroLivro
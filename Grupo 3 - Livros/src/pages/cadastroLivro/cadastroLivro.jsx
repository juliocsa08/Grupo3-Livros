import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import { useEffect, useState } from "react"
import { Alerta } from "../../components/alerta/Alerta"

const CadastroLivro = () => {

    const [valor, setValor] = useState("")
    const [imagem, setImagem] = useState("")
    const [editar, setEditar] = useState(false)
    const [listaLivros, setListaLivros] = useState([])
    const [id, setId] = useState(0)
    const [idGenero, setIdGenero] = useState(1)
    const [showLoading, setShowLoading] = useState(false)

    const [listaGeneros, setListaGeneros] = useState([
        { idGenero: 1, nome: "Romance" },
        { idGenero: 2, nome: "Fantasia" },
        { idGenero: 3, nome: "Terror" },
        { idGenero: 4, nome: "Ficção" },
        { idGenero: 5, nome: "Biografia" }
    ])

    const getLivros = () => {
        const dadosFake = [
            {
                idLivro: 1,
                titulo: "Livro Exemplo 1",
                idGenero: 1
            },
            {
                idLivro: 2,
                titulo: "Livro Exemplo 2",
                idGenero: 2
            }
        ]

        setListaLivros(dadosFake)
    }

    const cadastrarLivro = (e) => {
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

        const novoLivro = {
            idLivro: Date.now(),
            titulo: valor,
            idGenero: idGenero,
            imagem: imagem
        }

        setListaLivros([...listaLivros, novoLivro])

        Alerta({
            title: "Cadastro de Livro",
            text: "Livro cadastrado com sucesso",
            icon: "success",
            confirmButtonText: "Fechar"
        })

        limparDados()
    }

    const preEditar = (item) => {
        setValor(item.titulo)
        setId(item.idLivro)
        setIdGenero(item.idGenero)
        setEditar(true)
    }

    const editarLivro = (e) => {
        e.preventDefault()

        const listaAtualizada = listaLivros.map((livro) =>
            livro.idLivro === id
                ? { ...livro, titulo: valor, idGenero: idGenero }
                : livro
        )

        setListaLivros(listaAtualizada)

        Alerta({
            title: "Cadastro de Livro",
            text: "Livro editado com sucesso",
            icon: "success",
            confirmButtonText: "Fechar"
        })

        limparDados()
    }

    const excluirLivro = (item) => {
        const novaLista = listaLivros.filter(
            (livro) => livro.idLivro !== item.idLivro
        )

        setListaLivros(novaLista)

        Alerta({
            title: "Cadastro de Livro",
            text: "Livro removido",
            icon: "success",
            confirmButtonText: "Fechar"
        })
    }

    const limparDados = () => {
        setValor("")
        setEditar(false)
        setId(0)
        setIdGenero(1)
        setImagem("")
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
        getLivros()
    }, [])

    return (
        <>
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
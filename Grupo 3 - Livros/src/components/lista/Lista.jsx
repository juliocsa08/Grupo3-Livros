import "./Lista.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Visualizar from "../../assets/img/eye.svg";
import api from "../../services/Services";

const Lista = (props) => {
    const getImagemUrl = (imagemName) => {
        const baseUrl = api.defaults.baseURL.replace("/api", "");
        return `${baseUrl}/imagens/${imagemName}`;
    };

    return (
        <section className="layout_grid">
            <div className="listagem">

                <div className="listagem_cabecalho">
                    <h1>{props.tituloLista}</h1>
                    <p className="listagem_subtitulo">Gerencie os registros abaixo</p>
                    <hr />
                </div>

                <div className="tabela">
                    <table>
                        {/* cabeçalho da tabela: */}
                        <thead>
                            <tr className="table_cabecalho">
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Gênero</th>
                                <th>Editar</th>
                                {props.fnResumo && <th>Resumo</th>}
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        {/* tbody => corpo da tabela */}
                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (
                                    <tr className="item_lista" key={item.idFilme ?? item.idGenero ?? item.idLivro}>
                                        <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                            {item.imagem && (
                                                <img
                                                    className="img_filme"
                                                    src={getImagemUrl(item.imagem)}
                                                    alt={item.titulo}
                                                />
                                            )}
                                        </td>
                                        <td data-cell="Nome">
                                            {props.tipoLista === "genero" ? item.nome : item.titulo}
                                        </td>
                                        <td data-cell="Gênero" style={{ display: props.visibilidade }}>
                                            {props.listaGeneros?.find(g => g.idGenero === item.idGenero)?.nome || '-'}
                                        </td>
                                        <td data-cell="Editar">
                                            <button className="icon icon--editar" onClick={() => props.funcEditar && props.funcEditar(item)}>
                                                <FaEdit />
                                            </button>
                                        </td>

                                        {
                                            props.fnResumo && (
                                                <td data-cell="Resumo">
                                                    <button
                                                        className="icon icon--resumo"
                                                        onClick={() => props.fnResumo(item)}
                                                    >
                                                        <img src={Visualizar} alt="Visualizar resumo" />
                                                    </button>
                                                </td>
                                            )
                                        }

                                        <td data-cell="Excluir">
                                            <button className="icon icon--excluir" onClick={() => props.funcExcluir && props.funcExcluir(item)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>Nenhum registro encontrado.</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Lista;
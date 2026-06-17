import "./Cadastro.css"
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={(e) => props.funcCadastro(e)} className="layout_grid form_cadastro">

                <div className="cadastro_cabecalho">
                    <h1>{props.tituloCadastro}</h1>
                    <p className="cadastro_subtitulo">Preencha os dados abaixo</p>
                    <hr />
                </div>

                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <label htmlFor="nome">Título</label>
                        <input type="text" name="nome" placeholder={`Digite o nome do ${props.placeholder}`}
                            value={props.valor}
                            onChange={(e) => props.setValor(e.target.value)}
                        />
                    </div>
                    {
                        props.mostrarImagem && (
                            <>
                                <div className="campo_cad_nome">
                                    <label htmlFor="autor">Autor</label>
                                    <input type="text" name="autor" placeholder="Digite o nome do autor"
                                        value={props.autor}
                                        onChange={(e) => props.setAutor(e.target.value)}
                                    />
                                </div>
                                <div className="campo_cad_nome">
                                    <label htmlFor="ano">Ano</label>
                                    <input type="number" name="ano" placeholder="Digite o ano de lançamento"
                                        value={props.ano}
                                        onChange={(e) => props.setAno(e.target.value)}
                                    />
                                </div>
                            </>
                        )
                    }
                    <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                        <label htmlFor="genero">Gênero</label>
                        <select name="genero" id="" value={props.idGenero} onChange={(e) => props.setIdGenero && props.setIdGenero(Number(e.target.value))}>
                            <option value="" disabled>Selecione</option>
                            {
                                props.listaGeneros?.map((item) => {
                                    return (
                                        <option key={item.idGenero} value={item.idGenero}>{item.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {
                        props.mostrarImagem && (
                            <div className="campo_cad_imagem">
                                <label className="botao-upload">
                                    Imagem
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => props.setImagem(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        )
                    }
                    {
                        props.btnEditar && <Botao nomeDoBotao="Cancelar"
                            btnEditar={props.btnEditar} cancelarEdicao={props.cancelarEdicao} />
                    }

                    <Botao nomeDoBotao={props.btnEditar ? "Salvar" : "Cadastrar"} />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;
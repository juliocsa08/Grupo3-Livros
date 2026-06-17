import "./Cadastro.css"
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={(e) => props.funcCadastro(e)} className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <label htmlFor="nome">Titulo</label>
                        <input type="text" name="nome" placeholder={`Digite o nome do ${props.placeholder}`}
                            //O valor do input vem de props (estado do componente pai)
                            value={props.valor}
                            // Atualiza o estado do pai ao digitar
                            onChange={(e) => props.setValor(e.target.value)}
                        />
                    </div>
                    <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                        <label htmlFor="genero">Gênero</label>
                        <select name="genero" id="" value={props.idGenero} onChange={(e) => props.idGenero(e.target.value)}>
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
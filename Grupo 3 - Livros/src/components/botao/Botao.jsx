import "./Botao.css"

const Botao = (props) => {
    const isCancelar = props.nomeDoBotao === "Cancelar"

    return (
        <button
            className={`botao${isCancelar ? " botao--cancelar" : ""}`}
            type={props.type || "submit"}
            onClick={props.onClick}
        >
            {props.nomeDoBotao}
        </button>
    )
}

export default Botao
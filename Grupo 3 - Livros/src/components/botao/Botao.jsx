import "./Botao.css"

const Botao = (props) => {
    return (
        <button
            className="botao"
            type={props.type || "submit"}
            onClick={props.onClick}
        >
            {props.nomeDoBotao}
        </button>
    )
}

export default Botao
import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="footer_inner">
                <div className="footer_ornamento">
                    <span></span>
                    <em>📚</em>
                    <span></span>
                </div>
                <p className="footer_marca">Biblioteca Digital</p>
                <p>© {new Date().getFullYear()} — Projeto Livros SENAI · Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
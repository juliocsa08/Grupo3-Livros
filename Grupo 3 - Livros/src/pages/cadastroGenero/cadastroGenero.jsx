import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useState } from "react";

const CadastroGenero = () => {
  const [valor, setValor] = useState("");

  const [listaGeneros, setListaGeneros] = useState([
    {
      idGenero: 1,
      nome: "Romance"
    },
    {
      idGenero: 2,
      nome: "Fantasia"
    },
    {
      idGenero: 3,
      nome: "Suspense"
    },
    {
      idGenero: 4,
      nome: "Biografia"
    }
  ]);

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(0);

  const limparFormulario = () => {
    setValor("");
    setEditar(false);
    setId(0);
  };

  const cadastrarGenero = (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      alert("Digite um gênero!");
      return;
    }

    const novoGenero = {
      idGenero: Date.now(),
      nome: valor
    };

    setListaGeneros([...listaGeneros, novoGenero]);

    limparFormulario();
  };

  const excluirGenero = (item) => {
    const novaLista = listaGeneros.filter(
      genero => genero.idGenero !== item.idGenero
    );

    setListaGeneros(novaLista);
  };

  const preEditar = (item) => {
    setValor(item.nome);
    setEditar(true);
    setId(item.idGenero);
  };

  const editarGenero = (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      alert("Digite um gênero!");
      return;
    }

    const novaLista = listaGeneros.map(genero => {
      if (genero.idGenero === id) {
        return {
          ...genero,
          nome: valor
        };
      }

      return genero;
    });

    setListaGeneros(novaLista);

    limparFormulario();
  };

  return (
    <>
      <Header />

      <main>
        <Cadastro
          tituloCadastro="Cadastro de Gêneros Literários"
          placeholder="gênero"
          visibilidade="none"
          valor={valor}
          setValor={setValor}
          funcCadastro={
            editar
              ? editarGenero
              : cadastrarGenero
          }
          btnEditar={editar}
          cancelarEdicao={limparFormulario}
        />

        <Lista
          tituloLista="Gêneros Cadastrados"
          lista={listaGeneros}
          visibilidade="none"
          tipoLista="genero"
          funcExcluir={excluirGenero}
          funcEditar={preEditar}
        />
      </main>

      <Footer />
    </>
  );
};

export default CadastroGenero;
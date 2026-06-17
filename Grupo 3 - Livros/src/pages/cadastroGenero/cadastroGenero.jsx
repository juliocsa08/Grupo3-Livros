import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useState, useEffect } from "react";
import { Alerta } from "../../components/alerta/Alerta";
import api from "../../services/Services";
import { LoadingIcon } from "../../components/loading/LoadingIcon";

const CadastroGenero = () => {
  const [valor, setValor] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const limparFormulario = () => {
    setValor("");
    setEditar(false);
    setId(0);
  };

  const getGeneros = async () => {
    setShowLoading(true);
    try {
      const response = await api.get("/Genero");
      setListaGeneros(response.data);
    } catch (error) {
      console.error(error);
      Alerta({
        title: "Erro ao buscar",
        text: "Não foi possível carregar a lista de gêneros.",
        icon: "error",
        confirmButtonText: "Fechar"
      });
    } finally {
      setShowLoading(false);
    }
  };

  const cadastrarGenero = async (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      Alerta({
        title: "Atenção",
        text: "Digite um gênero antes de cadastrar.",
        icon: "warning",
        confirmButtonText: "Fechar"
      });
      return;
    }

    setShowLoading(true);
    try {
      await api.post("/Genero", { nome: valor.trim() });

      Alerta({
        title: "Gênero cadastrado!",
        text: "O gênero foi cadastrado com sucesso.",
        icon: "success",
        confirmButtonText: "Fechar"
      });

      limparFormulario();
      getGeneros();
    } catch (error) {
      console.error(error);
      Alerta({
        title: "Erro ao cadastrar",
        text: "Verifique os dados e tente novamente.",
        icon: "error",
        confirmButtonText: "Fechar"
      });
    } finally {
      setShowLoading(false);
    }
  };

  const excluirGenero = async (item) => {
    setShowLoading(true);
    try {
      await api.delete(`/Genero/${item.idGenero}`);

      Alerta({
        title: "Cadastro de Gênero",
        text: "Gênero removido",
        icon: "success",
        confirmButtonText: "Fechar"
      });

      getGeneros();
    } catch (error) {
      console.error(error);
      Alerta({
        title: "Erro ao excluir",
        text: "Não foi possível excluir o gênero.",
        icon: "error",
        confirmButtonText: "Fechar"
      });
    } finally {
      setShowLoading(false);
    }
  };

  const preEditar = (item) => {
    setValor(item.nome);
    setEditar(true);
    setId(item.idGenero);
  };

  const editarGenero = async (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      Alerta({
        title: "Atenção",
        text: "Digite um gênero antes de cadastrar.",
        icon: "warning",
        confirmButtonText: "Fechar"
      });
      return;
    }

    setShowLoading(true);
    try {
      await api.put(`/Genero/${id}`, { nome: valor.trim() });

      Alerta({
        title: "Cadastro de Gênero",
        text: "Gênero editado com sucesso",
        icon: "success",
        confirmButtonText: "Fechar"
      });

      limparFormulario();
      getGeneros();
    } catch (error) {
      console.error(error);
      Alerta({
        title: "Erro ao editar",
        text: "Não foi possível editar o gênero.",
        icon: "error",
        confirmButtonText: "Fechar"
      });
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    getGeneros();
  }, []);

  return (
    <>
      <LoadingIcon showHide={showLoading} />
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
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Mapa from "../Mapa";
import EditarModal from "../components/EditarModal";
import CadastroModal from "../components/CadastroModal";
import TabelaPontosBootstrap from "../components/TabelaPontosBootstrap";

type NodoEstrutura = {
  nome: string;
  filhos?: NodoEstrutura[];
};

type Ponto = {
  id: number;
  etiqueta: string;
  tipo_poste: string;
  logradouro: string;
  latitude: number;
  longitude: number;
  estrutura: NodoEstrutura;
};

export default function Home() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [pontosFiltrados, setPontosFiltrados] = useState<Ponto[]>([]);
  const [pontoSelecionado, setPontoSelecionado] = useState<Ponto | null>(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const fetchPontos = () => {
    fetch("http://localhost:5000/pontos")
      .then((res) => res.json())
      .then((data) => {
        setPontos(data);
        setPontosFiltrados([]);
      })
      .catch((err) => console.error("Erro ao buscar pontos:", err));
  };

  useEffect(() => {
    fetchPontos();
  }, []);

  return (
    <>
      <Navbar onCadastroClick={() => setMostrarCadastro(true)} />

      <div className="container my-4">
        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">📍 Mapa de Iluminação Pública</h5>
          </div>
          <div
            className="card-body"
            style={{ height: "70vh", overflow: "hidden" }}
          >
            <Mapa
              pontos={pontos}
              onEditar={setPontoSelecionado}
              onAtualizar={fetchPontos}
              onFiltrar={setPontosFiltrados}
            />
          </div>
        </div>

        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">📋 Pontos Cadastrados</h5>
          </div>
          <div className="card-body">
            <TabelaPontosBootstrap
              dados={pontosFiltrados.length > 0 ? pontosFiltrados : pontos}
            />
          </div>
        </div>
      </div>

      {mostrarCadastro && (
        <CadastroModal
          show={mostrarCadastro}
          onClose={() => setMostrarCadastro(false)}
          onAtualizar={fetchPontos}
        />
      )}

      {pontoSelecionado && (
        <EditarModal
          ponto={pontoSelecionado}
          onClose={() => setPontoSelecionado(null)}
          onAtualizar={fetchPontos}
        />
      )}
    </>
  );
}

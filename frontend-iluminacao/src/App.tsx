import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Mapa from "./Mapa";
import EditarModal from "./components/EditarModal";
import CadastroModal from "./components/CadastroModal";
import TabelaPontosBootstrap from "./components/TabelaPontosBootstrap";
import Login from "./pages/Login";

type Ponto = {
  id: number;
  etiqueta: string;
  tipo_poste: string;
  logradouro: string;
  latitude: number;
  longitude: number;
  estrutura: string;
};

function Home() {
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
            <h5 className="mb-0">Mapa de iluminação pública</h5>
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
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Tabela de pontos</h5>
          </div>
          <div className="card-body">
            <TabelaPontosBootstrap
              dados={pontosFiltrados.length > 0 ? pontosFiltrados : pontos}
            />
          </div>
        </div>
      </div>

      {pontoSelecionado && (
        <EditarModal
          ponto={pontoSelecionado}
          onClose={() => setPontoSelecionado(null)}
          onAtualizar={fetchPontos}
        />
      )}

      {mostrarCadastro && (
        <CadastroModal
          show={mostrarCadastro}
          onClose={() => setMostrarCadastro(false)}
          onAtualizar={fetchPontos}
        />
      )}
    </>
  );
}

function App() {
  const [logado, setLogado] = useState<boolean>(() => {
    return localStorage.getItem("logado") === "true";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setLogado(localStorage.getItem("logado") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={logado ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

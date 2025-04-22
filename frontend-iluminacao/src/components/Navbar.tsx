import { useNavigate } from "react-router-dom";

export default function Navbar({
  onCadastroClick,
}: {
  onCadastroClick: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logado");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand">🗺️ Iluminação Pública</span>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-success btn-sm"
            onClick={onCadastroClick}
          >
            Cadastrar Ponto
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

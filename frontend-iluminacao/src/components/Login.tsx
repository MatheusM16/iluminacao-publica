import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const usuarioFixo = "admin";
  const senhaFixa = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (usuario === usuarioFixo && senha === senhaFixa) {
      console.log("Login bem-sucedido!");
      localStorage.setItem("logado", "true");
      window.location.href = "/";
    } else {
      setErro("Usuário ou senha incorretos");
      console.log("❌ Login falhou!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>
    </div>
  );
}

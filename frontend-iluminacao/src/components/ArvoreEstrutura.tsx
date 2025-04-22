import { useState } from "react";

type NodoEstrutura = {
  nome: string;
  filhos?: NodoEstrutura[];
};

export default function ArvoreEstrutura({ nodo }: { nodo: NodoEstrutura }) {
  const [aberto, setAberto] = useState(false);
  const temFilhos = nodo.filhos && nodo.filhos.length > 0;

  const alternar = () => {
    if (temFilhos) setAberto(!aberto);
  };

  return (
    <div className="ms-1">
      <div
        style={{ cursor: temFilhos ? "pointer" : "default", fontWeight: "500" }}
        onClick={alternar}
      >
        {temFilhos ? (aberto ? "📂" : "📁") : "📄"} {nodo.nome}
      </div>

      {aberto && temFilhos && (
        <div className="ms-3">
          {nodo.filhos!.map((filho, index) => (
            <ArvoreEstrutura key={index} nodo={filho} />
          ))}
        </div>
      )}
    </div>
  );
}

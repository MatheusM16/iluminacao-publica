import { useState } from "react";

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

export default function TabelaPontosBootstrap({ dados }: { dados: Ponto[] }) {
  const [filtros, setFiltros] = useState({
    id: "",
    etiqueta: "",
    tipo_poste: "",
    logradouro: "",
    latitude: "",
    longitude: "",
    estrutura: "",
    luminaria: "",
  });

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const dadosFiltrados = dados.filter((ponto) => {
    const estruturaNome = ponto.estrutura?.nome || "";
    const luminariaNome = ponto.estrutura?.filhos?.[0]?.nome || "";

    return Object.entries(filtros).every(([campo, valor]) => {
      let dado = "";

      if (campo === "estrutura") dado = estruturaNome;
      else if (campo === "luminaria") dado = luminariaNome;
      else dado = String((ponto as any)[campo]);

      return valor === "" || dado.toLowerCase().includes(valor.toLowerCase());
    });
  });

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped table-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Etiqueta</th>
            <th>Tipo Poste</th>
            <th>Logradouro</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Estrutura</th>
            <th>Luminária</th>
          </tr>
          <tr>
            {Object.keys(filtros).map((campo) => (
              <th key={campo}>
                <input
                  className="form-control form-control-sm"
                  placeholder="Filtrar"
                  value={(filtros as any)[campo]}
                  onChange={(e) => handleFiltroChange(campo, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((ponto) => (
            <tr key={ponto.id}>
              <td>{ponto.id}</td>
              <td>{ponto.etiqueta}</td>
              <td>{ponto.tipo_poste}</td>
              <td>{ponto.logradouro}</td>
              <td>{ponto.latitude}</td>
              <td>{ponto.longitude}</td>
              <td>{ponto.estrutura?.nome}</td>
              <td>{ponto.estrutura?.filhos?.[0]?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from "react";

type Ponto = {
  id: number;
  etiqueta: string;
  tipo_poste: string;
  logradouro: string;
  latitude: number;
  longitude: number;
  estrutura: string;
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
  });

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const dadosFiltrados = dados.filter((ponto) => {
    return Object.entries(filtros).every(([campo, valor]) => {
      return (
        valor === "" ||
        String((ponto as any)[campo])
          .toLowerCase()
          .includes(valor.toLowerCase())
      );
    });
  });

  return (
    <div className="container mt-3">
      <h4 className="mb-3">Pontos Cadastrados</h4>
      <table className="table table-bordered table-hover table-striped table-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Etiqueta</th>
            <th>Tipo Poste</th>
            <th>Logradouro</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Estrutura</th>
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
              <td>{ponto.estrutura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

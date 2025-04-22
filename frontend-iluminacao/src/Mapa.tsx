import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { LatLngExpression, Icon, latLng } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { useEffect, useRef, useState } from "react";
import { Ponto, NodoEstrutura } from "./types";

const centroMapa: LatLngExpression = [-23.5505, -46.6333];

const iconePadrao = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Mapa({
  pontos,
  onEditar,
  onAtualizar,
  onFiltrar,
}: {
  pontos: Ponto[];
  onEditar: (ponto: Ponto) => void;
  onAtualizar: () => void;
  onFiltrar: (visiveis: Ponto[]) => void;
}) {
  const [pontosVisiveis, setPontosVisiveis] = useState<Ponto[]>(pontos);
  const [estruturaAberta, setEstruturaAberta] = useState<number | null>(null);
  const drawnItems = useRef(null);

  useEffect(() => {
    setPontosVisiveis(pontos);
  }, [pontos]);

  function handleDelete(id: number) {
    if (!window.confirm("Tem certeza que deseja excluir este ponto?")) return;

    fetch(`http://localhost:5000/pontos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Ponto excluído com sucesso!");
          onAtualizar();
        } else {
          alert("Erro ao excluir ponto.");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro de conexão ao excluir.");
      });
  }

  function handleDrawCreated(e: any) {
    const layer = e.layer;
    const dentro = pontos.filter((ponto) => {
      const pontoLatLng = latLng(ponto.latitude, ponto.longitude);
      return layer.getBounds().contains(pontoLatLng);
    });

    setPontosVisiveis(dentro);
    onFiltrar(dentro);
  }

  function handleDrawDeleted() {
    setPontosVisiveis(pontos);
    onFiltrar(pontos);
  }

  function renderArvore(nodo: NodoEstrutura, nivel = 0){
    const hasFilhos = nodo.filhos && nodo.filhos.length > 0;

    return (
      <div style={{ marginLeft: nivel * 16, marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 6 }}>{hasFilhos ? "📂" : "📄"}</span>
          {nodo.nome}
        </div>
        {hasFilhos &&
          nodo.filhos!.map((filho, idx) => (
            <div key={idx}>{renderArvore(filho, nivel + 1)}</div>
          ))}
      </div>
    );
  }

  return (
    <MapContainer
      center={centroMapa}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <FeatureGroup ref={drawnItems}>
        <EditControl
          position="topright"
          onCreated={handleDrawCreated}
          onDeleted={handleDrawDeleted}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>

      {pontosVisiveis.map((ponto) => (
        <Marker
          key={ponto.id}
          position={[ponto.latitude, ponto.longitude]}
          icon={iconePadrao}
        >
          <Popup>
            <strong>{ponto.etiqueta}</strong>
            <br />
            {ponto.logradouro}
            <br />
            Poste: {ponto.tipo_poste}
            <br />
            Latitude: {ponto.latitude}
            <br />
            Longitude: {ponto.longitude}
            <br />
            <div
              onClick={() =>
                setEstruturaAberta((prev) =>
                  prev === ponto.id ? null : ponto.id
                )
              }
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
                marginTop: "8px",
              }}
            >
              <span style={{ marginRight: "6px" }}>
                {estruturaAberta === ponto.id ? "📂" : "📁"}
              </span>
              Estrutura: {ponto.estrutura.nome}
            </div>
            {estruturaAberta === ponto.id && (
              <div style={{ marginTop: 6, marginLeft: 28 }}>
                {ponto.estrutura.filhos &&
                  ponto.estrutura.filhos.map((filho, index) => (
                    <div key={index}>{renderArvore(filho, 1)}</div>
                  ))}
              </div>
            )}
            <div className="mt-2 d-flex gap-2">
              <button
                className="btn btn-sm btn-warning"
                onClick={() => onEditar(ponto)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(ponto.id)}
              >
                Excluir
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

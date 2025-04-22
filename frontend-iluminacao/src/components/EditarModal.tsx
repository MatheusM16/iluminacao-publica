import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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

export default function EditarModal({
  ponto,
  onClose,
  onAtualizar,
}: {
  ponto: Ponto;
  onClose: () => void;
  onAtualizar: () => void;
}) {
  const [formData, setFormData] = useState({
    etiqueta: "",
    tipo_poste: "",
    logradouro: "",
    latitude: "",
    longitude: "",
    estruturaNome: "",
    luminaria: "",
  });

  useEffect(() => {
    const luminariaFilho = ponto.estrutura.filhos?.[0]?.nome || "";

    setFormData({
      etiqueta: ponto.etiqueta,
      tipo_poste: ponto.tipo_poste,
      logradouro: ponto.logradouro,
      latitude: ponto.latitude.toString(),
      longitude: ponto.longitude.toString(),
      estruturaNome: ponto.estrutura.nome,
      luminaria: luminariaFilho,
    });
  }, [ponto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const estrutura: NodoEstrutura = {
      nome: formData.estruturaNome,
      filhos: formData.luminaria ? [{ nome: formData.luminaria }] : [],
    };

    try {
      const res = await fetch(`http://localhost:5000/pontos/${ponto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etiqueta: formData.etiqueta,
          tipo_poste: formData.tipo_poste,
          logradouro: formData.logradouro,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          estrutura,
        }),
      });

      if (res.ok) {
        alert("Ponto atualizado com sucesso!");
        onAtualizar();
        onClose();
      } else {
        alert("Erro ao atualizar ponto.");
      }
    } catch (error) {
      console.error("Erro ao editar ponto:", error);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Ponto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {[
            "etiqueta",
            "tipo_poste",
            "logradouro",
            "estruturaNome",
            "luminaria",
          ].map((field) => (
            <Form.Group key={field} className="mb-3">
              <Form.Label>
                {field === "estruturaNome"
                  ? "Estrutura"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}

          {["latitude", "longitude"].map((field) => (
            <Form.Group key={field} className="mb-3">
              <Form.Label>{field.toUpperCase()}</Form.Label>
              <Form.Control
                type="number"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

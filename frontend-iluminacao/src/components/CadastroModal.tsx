import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CadastroModal({
  show,
  onClose,
  onAtualizar,
}: {
  show: boolean;
  onClose: () => void;
  onAtualizar: () => void;
}) {
  const [formData, setFormData] = useState({
    etiqueta: "",
    tipo_poste: "",
    logradouro: "",
    latitude: "",
    longitude: "",
    estrutura: "",
    luminaria: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const estruturaJson = {
      nome: formData.estrutura,
      filhos: formData.luminaria ? [{ nome: formData.luminaria }] : [],
    };

    try {
      const res = await fetch("http://localhost:5000/pontos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etiqueta: formData.etiqueta,
          tipo_poste: formData.tipo_poste,
          logradouro: formData.logradouro,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          estrutura: estruturaJson,
        }),
      });

      if (res.ok) {
        alert("Ponto cadastrado com sucesso!");
        onAtualizar();
        onClose();
      } else {
        alert("Erro ao cadastrar ponto.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar ponto:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar novo ponto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Etiqueta</Form.Label>
            <Form.Control
              type="text"
              name="etiqueta"
              value={formData.etiqueta}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo do Poste</Form.Label>
            <Form.Control
              type="text"
              name="tipo_poste"
              value={formData.tipo_poste}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control
              type="text"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estrutura</Form.Label>
            <Form.Control
              type="text"
              name="estrutura"
              value={formData.estrutura}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Luminária</Form.Label>
            <Form.Control
              type="text"
              name="luminaria"
              value={formData.luminaria}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

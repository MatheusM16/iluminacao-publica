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
    estrutura: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/pontos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
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
          {["etiqueta", "tipo_poste", "logradouro", "estrutura"].map(
            (field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                />
              </Form.Group>
            )
          )}
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
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditarModal({ ponto, onClose, onAtualizar }: any) {
  const [formData, setFormData] = useState({ ...ponto });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/pontos/${ponto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Ponto</Modal.Title>
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
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

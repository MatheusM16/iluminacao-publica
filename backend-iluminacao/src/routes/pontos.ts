import { Router, Request, Response } from "express";
import Ponto from "../models/Ponto";

const router = Router();

router.get("/pontos", async (req, res) => {
  try {
    const pontos = await Ponto.findAll();
    res.json(pontos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pontos" });
  }
});

router.post("/pontos", async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { etiqueta, tipo_poste, logradouro, latitude, longitude, estrutura, luminaria } =
      req.body;

    if (!etiqueta || !tipo_poste || !logradouro || !latitude || !longitude) {
      res.status(400).json({ error: "Campos obrigatórios ausentes" });
      return;
    }

    const novoPonto = await Ponto.create({
      etiqueta,
      tipo_poste,
      logradouro,
      latitude,
      longitude,
      estrutura,
      luminaria,
    });

    res.status(201).json(novoPonto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar ponto" });
  }
} as any);

router.put("/pontos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      etiqueta,
      tipo_poste,
      logradouro,
      latitude,
      longitude,
      estrutura,
      luminaria
    } = req.body;

    const ponto = await Ponto.findByPk(id);

    if (!ponto) {
      res.status(404).json({ error: "Ponto não encontrado" });
      return;
    }

    ponto.etiqueta = etiqueta;
    ponto.tipo_poste = tipo_poste;
    ponto.logradouro = logradouro;
    ponto.latitude = latitude;
    ponto.longitude = longitude;
    ponto.estrutura = estrutura;
    ponto.luminaria = luminaria;

    await ponto.save();

    res.json(ponto);
  } catch (error) {
    console.error("Erro ao atualizar ponto:", error);
    res.status(500).json({ error: "Erro ao atualizar ponto" });
  }
});

router.delete("/pontos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const ponto = await Ponto.findByPk(id);

    if (!ponto) {
      res.status(404).json({ error: "Ponto não encontrado" });
      return;
    }

    await ponto.destroy();

    res.json({ message: "Ponto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar ponto:", error);
    res.status(500).json({ error: "Erro ao deletar ponto" });
  }
});

export default router;

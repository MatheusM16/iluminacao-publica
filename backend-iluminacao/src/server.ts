import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import Ponto from "./models/Ponto"; 
import pontosRoutes from "./routes/pontos";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(pontosRoutes);  

app.get("/", (req, res) => {
  res.send("API Rodando!");
});

sequelize.authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    sequelize
      .sync({ alter: true }) 
      .then(() => console.log("Tabela de Pontos sincronizada!"))
      .catch((err) => console.error("Erro ao sincronizar a tabela:", err));
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco:", err);
  });

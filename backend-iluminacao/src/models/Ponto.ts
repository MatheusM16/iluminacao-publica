import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Ponto extends Model {
  public id!: number;
  public etiqueta!: string;
  public tipo_poste!: string;
  public logradouro!: string;
  public latitude!: number;
  public longitude!: number;
  public estrutura!: string;
  public luminaria!: string;
}

Ponto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    etiqueta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_poste: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estrutura: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Ponto",
    tableName: "pontos",
    timestamps: false,
  }
);

export default Ponto;

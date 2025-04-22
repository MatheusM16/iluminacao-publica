export type NodoEstrutura = {
  nome: string;
  filhos?: NodoEstrutura[];
};

export type Ponto = {
  id: number;
  etiqueta: string;
  tipo_poste: string;
  logradouro: string;
  latitude: number;
  longitude: number;
  estrutura: NodoEstrutura;
};

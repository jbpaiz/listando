export class Produto {
  id: number;
  descricao: string;
  quantidadePadrao: number;
  unidadeMedida: string;

  constructor(id:number, descricao: string){
    this.id = id;
    this.descricao = descricao;
    this.quantidadePadrao = 0.000;
    this.unidadeMedida = "";
  }
}

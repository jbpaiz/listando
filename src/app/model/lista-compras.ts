import { Produto } from "./produto";

export class ListaCompras {
  listaCompras: number;
  listaComprasDescricao: string;
  produtos: Produto[];

  constructor(listaCompras: number, listaComprasDescricao: string) {
    this.listaCompras = listaCompras;
    this.listaComprasDescricao = listaComprasDescricao;
    this.produtos = [];
  }

}

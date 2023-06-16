import { Produto } from "./produto";

export class ListaComprasProduto {
  listaCompras: number;
  produto: Produto;
  concluido: boolean;
  quantidade: number;

  constructor(listaCompras: number, produto: Produto, concluido: boolean, quantidade: number) {
    this.listaCompras = listaCompras;
    this.produto = produto;
    this.concluido = concluido;
    this.quantidade = quantidade;
  }

}

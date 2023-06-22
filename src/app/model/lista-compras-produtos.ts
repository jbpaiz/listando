import { Produto } from "./produto";

export class ListaComprasProduto {
  listaComprasId: number;
  id: number;
  produto: Produto;
  concluido: boolean;
  quantidade: number;

  constructor(listaComprasId: number, listaCompras: number, produto: Produto, concluido: boolean, quantidade: number) {
    this.listaComprasId = listaComprasId;
    this.id = listaCompras;
    this.produto = produto;
    this.concluido = concluido;
    this.quantidade = quantidade;
  }

}

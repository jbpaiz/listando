import { ListaComprasProduto } from './lista-compras-produtos';
import { Produto } from './produto';

export class ListaCompras {
  id: number;
  listaComprasDescricao: string;
  listaComprasProdutos: ListaComprasProduto[];

  constructor(listaCompras: number, listaComprasDescricao: string) {
    this.id = listaCompras;
    this.listaComprasDescricao = listaComprasDescricao;
    this.listaComprasProdutos = [];
  }

}

import { ListaComprasProduto } from './lista-compras-produtos';
import { Produto } from './produto';

export class ListaCompras {
  listaCompras: number;
  listaComprasDescricao: string;
  listaComprasProdutos: ListaComprasProduto[];

  constructor(listaCompras: number, listaComprasDescricao: string) {
    this.listaCompras = listaCompras;
    this.listaComprasDescricao = listaComprasDescricao;
    this.listaComprasProdutos = [new ListaComprasProduto(listaCompras, new Produto(1, "Mangueira"), true, 42.233),
                                 new ListaComprasProduto(listaCompras, new Produto(1, "Torneira da pia"), false, 1),
                                 new ListaComprasProduto(listaCompras, new Produto(1, "Espetos"), true, 4.1)];

  }

}

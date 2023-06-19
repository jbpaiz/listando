import { Constantes } from 'src/app/utils/constantes';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/utils/web-storage-util';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})

export class ProdutosCadastradosService {

  produtosCadastrados!: Produto[];

  constructor() {
    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);
  }

  salvar(produto: Produto) {
    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);
    this.produtosCadastrados.push(produto);
    WebStorageUtil.set(Constantes.PRODUTOS_CADASTRADOS_KEY, this.produtosCadastrados);
  }

  atualizar(produto: Produto) {
    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);
    this.deletar(produto.id);
    this.salvar(produto);
  }

  deletar(id: number): boolean {
    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);
    this.produtosCadastrados = this.produtosCadastrados.filter((p) => {
      return p.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(Constantes.PRODUTOS_CADASTRADOS_KEY, this.produtosCadastrados);
    return true;
  }

  produtoExiste(id: number): boolean {

    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);

    for (let p of this.produtosCadastrados) {
      if (p.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getProdutos(): Produto[] {
    this.produtosCadastrados = WebStorageUtil.get(Constantes.PRODUTOS_CADASTRADOS_KEY);
    this.produtosCadastrados.sort((a,b) => a.id-b.id);
    return this.produtosCadastrados;
  }

  idNovoCarregar(){
    let produtos: Produto[] = this.getProdutos();
    let proximoId: number = 0;

    produtos.forEach(prod => {
       if (prod.id > proximoId) {
        proximoId = prod.id;
       }
    });

    proximoId += 1;

    return proximoId;
  }

}

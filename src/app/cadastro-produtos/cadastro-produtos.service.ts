import { Constantes } from 'src/app/utils/constantes';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/utils/web-storage-util';
import { Produto } from '../model/produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutosCadastradosService {
  produtosCadastrados!: Produto[];
  url = 'http://localhost:3000/produtos'; // URL do JSON Server na porta 3000

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );
  }

  salvarWS(produto: Produto) {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );
    this.produtosCadastrados.push(produto);
    WebStorageUtil.set(
      Constantes.PRODUTOS_CADASTRADOS_KEY,
      this.produtosCadastrados
    );
  }

  salvar(produto: any): Promise<any> {
    return this.http.post(this.url, produto).toPromise();
  }

  alterarWS(produto: Produto) {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );
    this.deletar(produto.id);
    this.salvar(produto);
  }

  alterar(produto: any): Promise<any> {
    return this.http.put(this.url+'/'+produto.id, produto).toPromise();
  }

  deletarWS(id: number): boolean {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );
    this.produtosCadastrados = this.produtosCadastrados.filter((p) => {
      return p.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(
      Constantes.PRODUTOS_CADASTRADOS_KEY,
      this.produtosCadastrados
    );
    return true;
  }

  deletar(id: number): Promise<any> {
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  produtoExiste(id: number): boolean {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );

    for (let p of this.produtosCadastrados) {
      if (p.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getProdutosWS(): Produto[] {
    this.produtosCadastrados = WebStorageUtil.get(
      Constantes.PRODUTOS_CADASTRADOS_KEY
    );
    this.produtosCadastrados.sort((a, b) => a.id - b.id);
    return this.produtosCadastrados;
  }

  getProdutos(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }

}

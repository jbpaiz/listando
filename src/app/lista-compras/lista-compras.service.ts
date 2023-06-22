import { Constantes } from 'src/app/utils/constantes';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/utils/web-storage-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaCompras } from '../model/lista-compras';

@Injectable({
  providedIn: 'root',
})
export class ListaComprasService {

  listasCompras!: ListaCompras[];
  url = 'http://localhost:3000/listascompras'; // URL do JSON Server na porta 3000

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
  }

  salvarWS(listaCompras: ListaCompras) {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
    this.listasCompras.push(listaCompras);
    WebStorageUtil.set(
      Constantes.LISTA_COMPRAS,
      this.listasCompras
    );
  }

  salvar(listaCompras: any): Promise<any> {
    return this.http.post(this.url, listaCompras).toPromise();
  }

  alterarWS(listaCompras: ListaCompras) {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
    this.deletar(listaCompras.id);
    this.salvar(listaCompras);
  }

  alterar(listaCompras: any): Promise<any> {
    return this.http.put(this.url+'/'+listaCompras.id, listaCompras).toPromise();
  }

  deletarWS(id: number): boolean {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
    this.listasCompras = this.listasCompras.filter((p) => {
      return p.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(
      Constantes.LISTA_COMPRAS,
      this.listasCompras
    );
    return true;
  }

  deletar(id: number): Promise<any> {
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  listaExiste(id: number): boolean {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );

    for (let p of this.listasCompras) {
      if (p.id?.valueOf() == id?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getListaComprasWS(): ListaCompras[] {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
    this.listasCompras.sort((a, b) => a.id - b.id);
    return this.listasCompras;
  }

  getListasCompras(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }

  getListaCompra(id: number): Promise<any> {
    return this.http.get(this.url + '/' + id).toPromise();
  }

  carregarListaCompleta() {
    /*
    fetch('http://localhost:3000/listascompras')
      .then((response) => response.json())
      .then((listas) => {
        const listaPromises = listas.map((lista: { id: any; descricao: any; }) => {
          return fetch(
            `http://localhost:3000/listascomprasprodutos?listacomprasId=${lista.id}`
          )
            .then((response) => response.json())
            .then((listasProdutos) => {
              const produtoPromises = listasProdutos.map((listasProduto: { produtoId: any; }) => {
                return fetch(
                  `http://localhost:3000/produtos/${listasProduto.produtoId}`
                )
                  .then((response) => response.json())
                  .then((produto) => produto.descricao);
              });
              return Promise.all(produtoPromises).then((produtos) => {
                return {
                  id: lista.id,
                  descricao: lista.descricao,
                  produtos: produtos,
                };
              });
            });
        });
        return Promise.all(listaPromises);
      })
      .then((listaProdutos) => {
        console.log(listaProdutos);
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
      */
  }

}

import { Constantes } from 'src/app/utils/constantes';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/utils/web-storage-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaCompras } from '../model/lista-compras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaComprasService {

  listasCompras!: ListaCompras[];
  //url = 'http://localhost:3000/listascompras'; // URL do JSON Server na porta 3000
  url = 'https://listando-dados.up.railway.app/listascompras'; // URL do JSON Server na porta 3000

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
  }

  /* Salvar a lista no Web Storage */
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

  /* Salvar a lista no Json Server usando Promisse */
  salvar(listaCompras: any): Promise<any> {
    return this.http.post(this.url, listaCompras).toPromise();
  }

  /* Salvar a lista no Json Server usando Promisse */
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

  /* Deleter lista no Web Storage */
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

  /* Deleter do Json Server usando Promise */
  deletar(id: number): Promise<any> {
    return this.http.delete(this.url+'/'+id).toPromise();
  }

  /* Deleter do Json Server usando Observable */
  deletarObserver(id: number): Observable<any> {
    return this.http.delete(this.url+'/'+id);
  }

  /* Carregar Listas de Compras no Web Storage */
  getListaComprasWS(): ListaCompras[] {
    this.listasCompras = WebStorageUtil.get(
      Constantes.LISTA_COMPRAS
    );
    this.listasCompras.sort((a, b) => a.id - b.id);
    return this.listasCompras;
  }

  /* Carregar Listas de Compras no Json Server usando Promises */
  getListasCompras(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }

  /* Carregar Listas de Compras no Json Server usando Observer */
  getListasComprasObserver(): Observable<ListaCompras[]> {
    return this.http.get<ListaCompras[]>(`${this.url}`);
  }

  /* Carregar UMA LISTA no Json Server usando Promises */
  getListaCompra(id: number): Promise<any> {
    return this.http.get(this.url + '/' + id).toPromise();
  }

}

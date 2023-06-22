/*import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Produto } from 'src/app/model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoPromiseService {
  URL = 'http://localhost:3000/produtos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByProdutoDescricao(descricao: string): Promise<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.URL}/${descricao}`).toPromise();
  }

  getById(id: number): Promise<Produto> {
    return this.httpClient.get<Produto>(`${this.URL}/${id}`).toPromise();
  }

  save(produto: Produto): Promise<Produto> {
    return this.httpClient
      .post<Produto>(this.URL, JSON.stringify(produto), this.httpOptions)
      .toPromise();
  }

  update(produto: Produto): Promise<Produto> {
    return this.httpClient
      .put<Produto>(
        `${this.URL}/${produto.id}`,
        JSON.stringify(produto),
        this.httpOptions
      )
      .toPromise();
  }
}
*/

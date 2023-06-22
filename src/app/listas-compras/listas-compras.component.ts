import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCompras } from '../model/lista-compras';
import { ListaComprasProduto } from '../model/lista-compras-produtos';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Shared } from '../utils/inicializacao';
import { ListaComprasService } from '../lista-compras/lista-compras.service';

@Component({
  selector: 'app-listas-compras',
  templateUrl: './listas-compras.component.html',
  styleUrls: ['./listas-compras.component.css'],
})
export class ListasComprasComponent implements OnInit {
  listasCompras: ListaCompras[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private listaComprasService: ListaComprasService
  ) {}

  ngOnInit(): void {
    let novaLista = new ListaCompras(1, 'Testando a Lista');
    novaLista.listaComprasProdutos = [
      new ListaComprasProduto(
        novaLista.id,
        1,
        new Produto(1, 'Mangueira'),
        true,
        42.233
      ),
      new ListaComprasProduto(
        novaLista.id,
        2,
        new Produto(1, 'Torneira da pia'),
        false,
        1
      ),
      new ListaComprasProduto(
        novaLista.id,
        3,
        new Produto(1, 'Espetos'),
        true,
        4.1
      ),
    ];
    this.listasCompras.push(novaLista);

    let novaLista2 = new ListaCompras(2, 'Segunda Lista');
    novaLista2.listaComprasProdutos = [
      new ListaComprasProduto(
        novaLista2.id,
        1,
        new Produto(1, 'Mangueira'),
        true,
        42.233
      ),
      new ListaComprasProduto(
        novaLista2.id,
        2,
        new Produto(1, 'Torneira da pia'),
        false,
        1
      ),
      new ListaComprasProduto(
        novaLista2.id,
        3,
        new Produto(1, 'Espetos'),
        true,
        4.1
      ),
    ];
    this.listasCompras.push(novaLista2);

    Shared.initializeWebStorage();
    this.getListasCompras();
  }

  onClickItem(t: number) {
    this.router.navigate(['lista-compras/', t]);
  }

  // Atualiza a lisa de produtos cadastrados
  getListasCompras() {
    this.listasCompras = [];

    this.listaComprasService
      .getListasCompras()
      .then((response) => {
        console.log('Consulta ao cadastro com sucesso');
        this.listasCompras = response;
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos cadastrados:', error);

        if (error.name == 'HttpErrorResponse' && error.status == 0) {
          M.toast({
            html: `Erro ao conectar no JSON Server verifique se está ativo no endereço http://localhost:3000.`, displayLength:10000
          });
        }

        if (error.name == 'HttpErrorResponse' && error.status == 404) {
          M.toast({
            html: `Erro de comunicação. Endereço não encontrado.`, displayLength:10000
          });
        }
      });
  }
}

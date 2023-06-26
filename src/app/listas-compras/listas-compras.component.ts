import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCompras } from '../model/lista-compras';
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
    Shared.initializeWebStorage();
    this.getListasCompras();
  }

  onClickItem(t: number) {
    this.router.navigate(['lista-compras/', t]);
  }

  // Atualiza a lisa de produtos cadastrados - usando promisses
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
            html: `Erro ao conectar no JSON Server verifique se está ativo no endereço http://localhost:3000.`,
            displayLength: 10000,
          });
        }

        if (error.name == 'HttpErrorResponse' && error.status == 404) {
          M.toast({
            html: `Erro de comunicação. Endereço não encontrado.`,
            displayLength: 10000,
          });
        }
      });
  }

}

import { ListaComprasProduto } from './../model/lista-compras-produtos';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listas-compras-det-prod',
  templateUrl: './listas-compras-det-prod.component.html',
  styleUrls: ['./listas-compras-det-prod.component.css']
})

export class ListasComprasDetProdComponent {
  @Input() listaComprasProdutos!: ListaComprasProduto[]; 
}

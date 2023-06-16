import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCompras } from '../model/lista-compras';

@Component({
  selector: 'app-listas-compras',
  templateUrl: './listas-compras.component.html',
  styleUrls: ['./listas-compras.component.css']
})
export class ListasComprasComponent implements OnInit {
  
  listasCompras: ListaCompras[] = [];

  ngOnInit(): void {
     let novaLista = new ListaCompras(1, "Testando a Lista");
     this.listasCompras.push(novaLista);

     let novaLista2 = new ListaCompras(2, "Segunda Lista");
     this.listasCompras.push(novaLista2);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  onClickItem(t: number) {
    this.router.navigate(['lista-compras/', t]);
  }
}

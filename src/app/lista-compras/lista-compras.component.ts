import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ListaCompras } from '../model/lista-compras';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
})
export class ListaComprasComponent implements OnInit, AfterViewInit {
  listaCompras!: ListaCompras;

  ngOnInit(): void {
    this.listaCompras = new ListaCompras(1, 'Compras para Mercado');
  }
  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  onButtonClick() {
    alert(`A descrição da lista foi alterada para ${this.listaCompras.listaComprasDescricao}`);
  }

  onEnterKey() {
    this.onButtonClick();
  }
}

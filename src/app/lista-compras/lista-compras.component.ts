import { Produto } from './../model/produto';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ListaCompras } from '../model/lista-compras';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
})
export class ListaComprasComponent implements OnInit, AfterViewInit {
  listaCompras!: ListaCompras;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    if (idParam > 0) {
      this.listaCompras = new ListaCompras(idParam, 'Lista do Código: ' + idParam);
    } else {
      this.listaCompras = new ListaCompras(idParam, 'Nova Lista de Compras');
    }
    
  }
  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  onButtonClick() {
    alert(`A descrição da lista foi alterada para ${this.listaCompras.listaComprasDescricao}`);
    this.router.navigate(['/']);

  }

  onCkeckBoxClick(produto: Produto) {

  }

  onEnterKey() {
    this.onButtonClick();
  }
}

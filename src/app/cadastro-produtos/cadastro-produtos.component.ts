import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent {

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

}

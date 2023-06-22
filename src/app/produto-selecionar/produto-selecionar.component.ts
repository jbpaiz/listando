import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutosCadastradosService } from '../cadastro-produtos/cadastro-produtos.service';

@Component({
  selector: 'app-produto-selecionar',
  templateUrl: './produto-selecionar.component.html',
  styleUrls: ['./produto-selecionar.component.css']
})
export class ProdutoSelecionarComponent implements OnInit {

  @Output() produtoSelecionado = new EventEmitter();

  produtos?: Produto[];

  constructor(
    private produtosService: ProdutosCadastradosService
  ) {}

  ngOnInit(): void {

    this.produtosService
      .getProdutos()
      .then((response) => {
        console.log('Consulta ao cadastro com sucesso');
        this.produtos = response;
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos cadastrados:', error);
      });
  }

  adicionar(produto: Produto) {
    this.produtoSelecionado.emit(produto);
  }
}

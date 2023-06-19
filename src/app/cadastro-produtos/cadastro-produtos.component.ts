import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProdutosCadastradosService } from './cadastro-produtos.service';
import { Shared } from '../utils/inicializacao';
import { Produto } from '../model/produto';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
})
export class CadastroProdutosComponent implements OnInit {

  @ViewChild('form') form!: NgForm;
  @ViewChild('unidadeMedidas') unidadeMedidasSelect!: ElementRef;

  produto!: Produto;
  produtos?: Produto[];
  alterando: boolean = false;
  unidadeMedidas = ['UN', 'CX', 'KG', 'GR'];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosCadastradosService
  ) {
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.produto = new Produto(0, '');
    this.produtos = this.produtosService.getProdutos();
  }

  onSubmit() {

    if (this.produto.id <= 0) {
      this.produto.id = this.produtosService.idNovoCarregar();
    }

    if (!this.produtosService.produtoExiste(this.produto.id)) {
      this.produtosService.salvar(this.produto);
    } else {
      this.produtosService.atualizar(this.produto);
    }

    if (this.alterando) {
      alert('Cadastro alterado com sucesso!')
    } else {
      alert('Cadastro realizado com sucesso!')
    }

    this.limpar()

  }

  onEdit(produto: Produto) {

    this.alterando = true;

    let produtoClone: Produto = new Produto(produto.id, produto.descricao);
    produtoClone.quantidadePadrao = produto.quantidadePadrao;
    produtoClone.unidadeMedida = produto.unidadeMedida;

    this.produto = produtoClone;

    setTimeout(() => {
      //M.FormSelect.init(this.unidadeMedidasSelect.nativeElement)
      this.ngAfterViewInit()
    }, 100);

  }

  onDelete(produto: Produto) {

    if (!window.confirm('Você tem certeza que deseja remover ' + produto.descricao)) {
      return;
    }

    this.produtosService.deletar(produto.id);
    this.produtos = this.produtosService.getProdutos();
  }

  novoIdCarregar() {
    return;
  }

  limpar(){
    this.form.reset();
    this.produto = new Produto(0, '');
    this.produtos = this.produtosService.getProdutos();
    this.alterando = false;
  }

}

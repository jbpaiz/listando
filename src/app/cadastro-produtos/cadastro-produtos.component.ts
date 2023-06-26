import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProdutosCadastradosService } from './cadastro-produtos.service';
import { Shared } from '../utils/inicializacao';
import { Produto } from '../model/produto';
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private produtosService: ProdutosCadastradosService,
    private http: HttpClient
  ) {}

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.produto = new Produto(0, '');
    this.getProdutos();
  }

  // Evento submit do formulário
  onSubmit() {
    if (this.alterando) {
      this.produtosService
        .alterar(this.produto)
        .then((response) => {
          console.log('Produto atualizado:', response);
          M.toast({
            html: `Produto atualizado: ${response.id} ${response.descricao}`,
          });
        })
        .catch((error) => {
          console.error('Erro ao alterar o produto:', error);
        });
    } else {
      this.produtosService
        .salvar(this.produto)
        .then((response) => {
          console.log('Produto criado:', response);
          M.toast({
            html: `Produto criado: ${response.id} ${response.descricao}`,
          });
        })
        .catch((error) => {
          console.error('Erro ao criar o produto:', error);
        });
    }

    this.limpar();

    // Tempo para atualizar a tela
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  // Carrega os campos para editar
  onEdit(produto: Produto) {
    this.alterando = true;

    let produtoClone: Produto = new Produto(produto.id, produto.descricao);
    produtoClone.quantidadePadrao = produto.quantidadePadrao;
    produtoClone.unidadeMedida = produto.unidadeMedida;

    this.produto = produtoClone;

    setTimeout(() => {
      this.ngAfterViewInit();
    }, 100);
  }

  // Delete
  onDelete(produto: Produto) {
    if (
      !window.confirm(
        'Você tem certeza que deseja remover ' + produto.descricao
      )
    ) {
      return;
    }

    // Usa o método deletar
    this.produtosService
      .deletar(produto.id)
      .then((response) => {
        console.log('Consulta ao cadastro com sucesso');
        M.toast({
          html: `Produto removido com sucesso!`,
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos cadastrados:', error);
      });

    // Tempo para atualizar o JSON
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  // Atualiza a lisa de produtos cadastrados
  getProdutos() {
    this.produtos = [];

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

  //limpa os campos do formulário
  limpar() {
    this.form.reset();
    this.produto = new Produto(0, '');
    this.getProdutos();
    this.alterando = false;
  }
}

import { ListaComprasProduto } from './../model/lista-compras-produtos';
import { Produto } from './../model/produto';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ListaCompras } from '../model/lista-compras';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaComprasService } from './lista-compras.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
})
export class ListaComprasComponent implements OnInit {
  listaCompras!: ListaCompras;
  alterandoLista!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listaComprasService: ListaComprasService
  ) {}

  ngOnInit(): void {
    /* Lê o parâmetro id recebido */
    let idParam: number = +this.route.snapshot.paramMap.get('id')!;

    if (idParam > 0) {
      this.alterandoLista = true;

      /* Carrega a lista de compras */
      this.listaCompras = new ListaCompras(idParam, '');

      this.listaComprasService
        .getListaCompra(idParam)
        .then((response) => {
          console.log(`Carregou a Lista`);

          console.log(response);
          this.listaCompras = <ListaCompras>response;
        })
        .catch((error) => {
          console.error('Erro ao carregar a Lista:', error);
        });
    } else {
      this.alterandoLista = false;
      this.listaCompras = new ListaCompras(idParam, 'Nova Lista de Compras');
    }
  }

  onDelete(listaCompras: ListaCompras) {
    let listaComprasDescricao = listaCompras.listaComprasDescricao;

    this.listaComprasService
      .deletar(listaCompras.id)
      .then((response) => {
        console.log(`Lista Removida: ${listaComprasDescricao}`);
        M.toast({
          html: `Lista Removida: ${listaComprasDescricao}`,
        });
      })
      .catch((error) => {
        console.error(
          `Erro ao REMOVER lista de compras: ${listaComprasDescricao}`,
          error
        );
      });

    this.router.navigate(['/']);
  }

  onButtonClick() {
    if (this.alterandoLista) {
      this.listaComprasService
        .alterar(this.listaCompras)
        .then((response) => {
          console.log('Produto criado:', response);
          M.toast({
            html: `Lista atualizada: ${response.listaComprasDescricao}`,
          });

          this.alterandoLista = false;
        })
        .catch((error) => {
          console.error('Erro ao ATUALIZAR lista de compras:', error);
        });
    } else {
      this.listaComprasService
        .salvar(this.listaCompras)
        .then((response) => {
          console.log('Produto criado:', response);
          M.toast({
            html: `Lista gravada: ${response.listaComprasDescricao}`,
          });
        })
        .catch((error) => {
          console.error('Erro ao GRAVAR lista de compras:', error);
        });
    }

    // Tempo para atualizar a tela
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);

  }

  onCkeckBoxClick(produto: ListaComprasProduto) {}

  removerProduto(p: ListaComprasProduto) {
    this.listaCompras.listaComprasProdutos =
      this.listaCompras.listaComprasProdutos.filter(
        (x) => x.produto.id != p.produto.id
      );
  }

  onEnterKey() {
    this.onButtonClick();
  }

  adicionarProdutoSelecionado(produto: Produto) {
    console.log(this.listaCompras);
    if (
      this.listaCompras.listaComprasProdutos.find(
        (element) => element.produto.id == produto.id
      )
    ) {
      M.toast({
        html: `Item já informado!`,
      });
      return;
    }

    let p = new ListaComprasProduto(
      this.listaCompras.id,
      1,
      produto,
      false,
      produto.quantidadePadrao
    );
    this.listaCompras.listaComprasProdutos.push(p);
  }
}

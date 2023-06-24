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

  /* Apagar a lista de compras */
  onDelete(listaCompras: ListaCompras) {
    let listaComprasDescricao = listaCompras.listaComprasDescricao;

    this.listaComprasService.deletarObserver(listaCompras.id).subscribe(
      () => {
        console.log(`Lista Removida: ${listaComprasDescricao}`);

        M.toast({
          html: `Lista Removida: ${listaComprasDescricao}`,
        });

        this.router.navigate(['/']);
      },
      (error) => {
        console.error(
          `Erro ao REMOVER lista de compras: ${listaComprasDescricao}`,
          error
        );
      }
    );
  }

  /* Adicionar produtos na lista de compras */
  onButtonClick() {
    if (this.alterandoLista) {
      this.listaComprasService
        .alterar(this.listaCompras)
        .then((response) => {
          M.toast({
            html: `Lista atualizada: ${response.listaComprasDescricao}`,
          });

          this.alterandoLista = false;
        })
        .catch((error) => {
          console.error('Erro ao ATUALIZAR lista de compras:', error);
        })
        .finally(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.listaComprasService
        .salvar(this.listaCompras)
        .then((response) => {
          M.toast({
            html: `Lista gravada: ${response.listaComprasDescricao}`,
          });

          this.router.navigate(['/']);
        })
        .finally(() => {
          this.router.navigate(['/']);
        });
    }
  }

  /* Event Binding */
  onEnterKey() {
    this.onButtonClick();
  }

  /* Adicionar produtos na lista de compras */
  adicionarProdutoSelecionado(produto: Produto) {
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
      produto.id,
      produto,
      false,
      produto.quantidadePadrao
    );

    this.listaCompras.listaComprasProdutos.push(p);
  }

  /* Remove o produto da lista */
  removerProduto(p: ListaComprasProduto) {
    this.listaCompras.listaComprasProdutos =
      this.listaCompras.listaComprasProdutos.filter(
        (x) => x.produto.id != p.produto.id
      );
  }
}

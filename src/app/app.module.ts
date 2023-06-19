import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RodapeComponent } from './rodape/rodape.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { ListasComprasComponent } from './listas-compras/listas-compras.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ListasComprasDetProdComponent } from './listas-compras-det-prod/listas-compras-det-prod.component';
import { ProdutoSelecionarComponent } from './produto-selecionar/produto-selecionar.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    ListaComprasComponent,
    ListasComprasComponent,
    CadastroProdutosComponent,
    ListasComprasDetProdComponent,
    ProdutoSelecionarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

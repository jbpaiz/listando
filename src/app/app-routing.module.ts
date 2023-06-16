import { ListasComprasComponent } from './listas-compras/listas-compras.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';

const routes: Routes = [
  { path: '', component: ListasComprasComponent },
  { path: 'lista-compras', component: ListaComprasComponent },
  { path: 'lista-compras/:id', component: ListaComprasComponent },
  { path: 'cadastro-produtos', component: CadastroProdutosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

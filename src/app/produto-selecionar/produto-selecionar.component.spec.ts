import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSelecionarComponent } from './produto-selecionar.component';

describe('ProdutoSelecionarComponent', () => {
  let component: ProdutoSelecionarComponent;
  let fixture: ComponentFixture<ProdutoSelecionarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoSelecionarComponent]
    });
    fixture = TestBed.createComponent(ProdutoSelecionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

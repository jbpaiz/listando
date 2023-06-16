import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasComprasDetProdComponent } from './listas-compras-det-prod.component';

describe('ListasComprasDetProdComponent', () => {
  let component: ListasComprasDetProdComponent;
  let fixture: ComponentFixture<ListasComprasDetProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListasComprasDetProdComponent]
    });
    fixture = TestBed.createComponent(ListasComprasDetProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

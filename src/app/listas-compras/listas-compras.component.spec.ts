import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasComprasComponent } from './listas-compras.component';

describe('ListasComprasComponent', () => {
  let component: ListasComprasComponent;
  let fixture: ComponentFixture<ListasComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListasComprasComponent]
    });
    fixture = TestBed.createComponent(ListasComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

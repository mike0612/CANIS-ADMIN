import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdidosEntregadosComponent } from './perdidos-entregados.component';

describe('PerdidosEntregadosComponent', () => {
  let component: PerdidosEntregadosComponent;
  let fixture: ComponentFixture<PerdidosEntregadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdidosEntregadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdidosEntregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

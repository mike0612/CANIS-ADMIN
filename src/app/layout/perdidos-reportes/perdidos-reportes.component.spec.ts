import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdidosReportesComponent } from './perdidos-reportes.component';

describe('PerdidosReportesComponent', () => {
  let component: PerdidosReportesComponent;
  let fixture: ComponentFixture<PerdidosReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdidosReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdidosReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

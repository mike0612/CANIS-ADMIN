import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaSolicitudesComponent } from './mascota-solicitudes.component';

describe('MascotaSolicitudesComponent', () => {
  let component: MascotaSolicitudesComponent;
  let fixture: ComponentFixture<MascotaSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotaSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

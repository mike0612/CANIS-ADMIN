import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotaSolicitudesRoutingModule } from './mascota-solicitudes-routing.module';
import { MascotaSolicitudesComponent } from './mascota-solicitudes.component';
import { PageHeaderModule, PageLoadingModule } from './../../shared';

@NgModule({
  declarations: [MascotaSolicitudesComponent],
  imports: [
    CommonModule,
    MascotaSolicitudesRoutingModule,
    PageHeaderModule,
    PageLoadingModule
  ]
})
export class MascotaSolicitudesModule { }

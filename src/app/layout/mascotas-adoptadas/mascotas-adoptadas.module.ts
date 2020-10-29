import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasAdoptadasRoutingModule } from './mascotas-adoptadas-routing.module';
import { MascotasAdoptadasComponent } from './mascotas-adoptadas.component';
import { PageHeaderModule, PageLoadingModule } from './../../shared';

@NgModule({
  declarations: [MascotasAdoptadasComponent],
  imports: [
    CommonModule,
    MascotasAdoptadasRoutingModule,
    PageHeaderModule,
    PageLoadingModule
  ]
})
export class MascotasAdoptadasModule { }

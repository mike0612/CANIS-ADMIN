import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MascotasComponent } from './mascotas.component';
import { PageLoadingModule, PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [MascotasComponent],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class MascotasModule { }

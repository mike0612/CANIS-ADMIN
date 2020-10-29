import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidosEntregadosRoutingModule } from './perdidos-entregados-routing.module';
import { PerdidosEntregadosComponent } from './perdidos-entregados.component';
import { PageLoadingModule } from './../../shared';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [PerdidosEntregadosComponent],
  imports: [
    CommonModule,
    PerdidosEntregadosRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class PerdidosEntregadosModule { }

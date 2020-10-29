import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidosRoutingModule } from './perdidos-routing.module';
import { PerdidosComponent } from './perdidos.component';
import { PageLoadingModule } from './../../shared';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [PerdidosComponent],
  imports: [
    CommonModule,
    PerdidosRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class PerdidosModule { }

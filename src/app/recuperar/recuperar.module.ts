import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarRoutingModule } from './recuperar-routing.module';
import { RecuperarComponent } from './recuperar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PageLoadingModule, PageHeaderModule } from './../shared';

@NgModule({
  declarations: [RecuperarComponent],
  imports: [
    CommonModule,
    RecuperarRoutingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module,
    PageLoadingModule,
    PageHeaderModule
  ]
})
export class RecuperarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciasRoutingModule } from './denuncias-routing.module';
import { DenunciasComponent } from './denuncias.component';
import { PageHeaderModule, PageLoadingModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [DenunciasComponent],
  imports: [
    CommonModule,
    DenunciasRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class DenunciasModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovilRoutingModule } from './movil-routing.module';
import { MovilComponent } from './movil.component';
import { PageLoadingModule, PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [MovilComponent],
  imports: [
    CommonModule,
    MovilRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module,
    ColorPickerModule
  ]
})
export class MovilModule { }

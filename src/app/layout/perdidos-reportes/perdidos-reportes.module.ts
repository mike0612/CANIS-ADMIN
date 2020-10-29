import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidosReportesRoutingModule } from './perdidos-reportes-routing.module';
import { PerdidosReportesComponent } from './perdidos-reportes.component';
import { PageLoadingModule } from './../../shared';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [PerdidosReportesComponent],
  imports: [
    CommonModule,
    PerdidosReportesRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class PerdidosReportesModule { }

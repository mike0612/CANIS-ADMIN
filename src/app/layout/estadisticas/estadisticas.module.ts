import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';
import { PageHeaderModule, PageLoadingModule, CardsgModule } from './../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    PageHeaderModule,
    PageLoadingModule,
    Ng2Charts,
    CardsgModule
  ],
  declarations: [EstadisticasComponent],
})
export class EstadisticasModule { }

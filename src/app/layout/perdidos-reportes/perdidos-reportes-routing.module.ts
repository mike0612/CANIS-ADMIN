import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerdidosReportesComponent } from './perdidos-reportes.component';

const routes: Routes = [
    {
        path: '', component: PerdidosReportesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerdidosReportesRoutingModule {
}

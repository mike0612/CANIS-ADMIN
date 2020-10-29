import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerdidosEntregadosComponent } from './perdidos-entregados.component';

const routes: Routes = [
    {
        path: '', component: PerdidosEntregadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerdidosEntregadosRoutingModule {
}

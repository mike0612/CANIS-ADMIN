import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerdidosComponent } from './perdidos.component';

const routes: Routes = [
    {
        path: '', component: PerdidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerdidosRoutingModule {
}

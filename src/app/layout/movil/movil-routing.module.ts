import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovilComponent } from './movil.component';

const routes: Routes = [
    {
        path: '', component: MovilComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovilRoutingModule {
}

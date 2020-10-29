import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MascotaSolicitudesComponent } from './mascota-solicitudes.component';

const routes: Routes = [
    {
        path: '', component: MascotaSolicitudesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MascotaSolicitudesRoutingModule {
}

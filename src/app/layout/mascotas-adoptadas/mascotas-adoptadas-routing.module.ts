import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MascotasAdoptadasComponent } from './mascotas-adoptadas.component';

const routes: Routes = [
    {
        path: '', component: MascotasAdoptadasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MascotasAdoptadasRoutingModule {
}

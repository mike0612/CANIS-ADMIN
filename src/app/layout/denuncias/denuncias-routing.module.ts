import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenunciasComponent } from './denuncias.component';

const routes: Routes = [
    {
        path: '', component: DenunciasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DenunciasRoutingModule {
}

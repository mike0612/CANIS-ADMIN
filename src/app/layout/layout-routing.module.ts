import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,        children: [
            { path: '', redirectTo: 'estadisticas', pathMatch: 'prefix' },
            { path: 'estadisticas', loadChildren: () => import('./estadisticas/estadisticas.module').then(m => m.EstadisticasModule) },
            { path: 'mascotas', loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule) },
            { path: 'mascotaSolicitudes', loadChildren: () =>
                import('./mascota-solicitudes/mascota-solicitudes.module').then(m => m.MascotaSolicitudesModule)
            },
            { path: 'mascotasAdoptadas', loadChildren: () =>
                import('./mascotas-adoptadas/mascotas-adoptadas.module').then(m => m.MascotasAdoptadasModule)
            },
            { path: 'perdidos', loadChildren: () => import('./perdidos/perdidos.module').then(m => m.PerdidosModule) },
            { path: 'perdidosReportes', loadChildren: () =>
                import('./perdidos-reportes/perdidos-reportes.module').then(m => m.PerdidosReportesModule)
            },
            { path: 'perdidosEntregados', loadChildren: () =>
                import('./perdidos-entregados/perdidos-entregados.module').then(m => m.PerdidosEntregadosModule)
            },
            { path: 'noticias', loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasModule) },
            { path: 'tips', loadChildren: () => import('./tips/tips.module').then(m => m.TipsModule) },
            { path: 'denuncias', loadChildren: () => import('./denuncias/denuncias.module').then(m => m.DenunciasModule) },
            { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
            { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
            { path: 'configuracion', loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule) },
            { path: 'movil', loadChildren: () => import('./movil/movil.module').then(m => m.MovilModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

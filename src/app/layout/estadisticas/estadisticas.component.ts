import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService } from './../../shared';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  animations: [routerTransition()]
})
export class EstadisticasComponent implements OnInit {

  usuario: any = [];

  mascotas: any = [];
  solicitudes: any = [];
  adoptados: any = [];
  noticias: any = [];
  tips: any = [];
  denuncias: any = [];
  usuarios: any = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {

    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.dbService.getFilterFieldValue('/mascotas/', 'status', 'Disponible').valueChanges().subscribe((res) => {
      this.mascotas = res.length;
    });

    this.dbService.getFilterFieldValue('/solicitudesAdopcion/', 'status', 'En proceso').valueChanges().subscribe((res) => {
      this.solicitudes = res.length;
    });

    this.dbService.getAllData('/mascotasAdoptadas/').valueChanges().subscribe((res) => {
      this.adoptados = res.length;
    });

    this.dbService.getAllData('/noticias/').valueChanges().subscribe((res) => {
      this.noticias = res.length;
    });

    this.dbService.getAllData('/noticias/').valueChanges().subscribe((res) => {
      this.noticias = res.length;
    });

    this.dbService.getAllData('/denuncias/').valueChanges().subscribe((res) => {
      this.denuncias = res.length;
    });

    this.dbService.getAllData('/tips/').valueChanges().subscribe((res) => {
      this.tips = res.length;
    });

    this.dbService.getFilterFieldValue('/administracion/', 'tipo', 2).valueChanges().subscribe((res) => {
      this.usuarios = res.length;
    });
  }

}

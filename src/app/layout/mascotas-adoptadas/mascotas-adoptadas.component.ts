import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService } from './../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mascotas-adoptadas',
  templateUrl: './mascotas-adoptadas.component.html',
  styleUrls: ['./mascotas-adoptadas.component.scss'],
  animations: [routerTransition()]
})
export class MascotasAdoptadasComponent implements OnInit {

  private database = '/mascotasAdoptadas/';
  title: string;

  adoptados: any = [];
  adoptado: any = [];

  loadingDB = false;
  loadingImge = false;

  table = true;
  info = false;


  constructor(
    private dbService: DatabaseService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadingDB = true;
    this.dbService.getAllData(this.database).valueChanges().subscribe((res) => {
      this.loadingDB = false;
      this.adoptados = res.sort(this.compare);
    });
  }

  compare(a, b) {
    if (a.id < b.id) { return 1; }
    if (a.id > b.id) { return -1; }
    return 0;
  }

  deleteMascota(denuncia) {
    Swal.fire({
      title: '<h5> Eliminar la adopción con folio: ' + denuncia.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente los datos. ' +
        '¿Desea continuar?</p>',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.dbService.deleteData(this.database, denuncia).then(() => {
          this.toastr.success('datos eliminados');
        });
      }
    });
  }

}

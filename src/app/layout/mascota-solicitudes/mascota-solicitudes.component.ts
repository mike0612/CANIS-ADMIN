import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService } from './../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-mascota-solicitudes',
  templateUrl: './mascota-solicitudes.component.html',
  styleUrls: ['./mascota-solicitudes.component.scss'],
  animations: [routerTransition()]
})
export class MascotaSolicitudesComponent implements OnInit {

  private database = '/solicitudesAdopcion/';
  title: string;

  solicitudes: any = [];
  solicitud: any = [];
  mascotasAdoptadas: any = [];

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
      this.solicitudes = res.sort(this.compare);
    });
  }

  compare(a, b) {
    if (a.id < b.id) { return 1; }
    if (a.id > b.id) { return -1; }
    return 0;
  }


  viewInfo(solicitud) {
    this.table = false;
    this.info = true;
    this.solicitud = solicitud;
  }

  viewTable() {
    this.table = true;
    this.info = false;
    this.solicitud = [];
  }

  adoptar() {
    Swal.fire({
      title: '<h5>Dar en adopción?</h5>',
      html:
        '<p>La mascota con folio ' + this.solicitud.mascota.folio +
        ' será adoptado por ' + this.solicitud.datosPersonales.nombre +
        ' ¿Desea continuar?</p>',
      imageUrl: this.solicitud.mascota.foto,
      imageWidth: 350,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.mascotasAdoptadas.id = Date.now();
        this.mascotasAdoptadas.folio = ('ACP' + '' + Math.random().toString(10).substr(2, 5));
        this.mascotasAdoptadas.solicitud = this.solicitud;
        this.mascotasAdoptadas.mascota = this.solicitud.mascota;
        this.dbService.addNew('/mascotasAdoptadas/', this.mascotasAdoptadas).then(() => {
          this.solicitud.mascota.status = 'Adoptado';
          this.dbService.addNew('/mascotas/', this.solicitud.mascota).then(() => {
            this.solicitud.status = 'Finalizada';
            this.dbService.addNew(this.database, this.solicitud);
            this.solicitud = [];
            this.info = false;
            this.table = true;
            this.toastr.success('Mascota adoptada correctamente');
          });
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al agregar la mascota');
        });



      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('adopción cancelada');
      }
    });
  }

  deleteMascota(solicitud) {
    Swal.fire({
      title: '<h5> Eliminar la solicitud con folio: ' + solicitud.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente la solicitud. ' +
        '¿Desea continuar?</p>',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.dbService.deleteData(this.database, solicitud).then(() => {
          this.toastr.success('solicitud eliminada');
        });
      }
    });
  }

  exportPDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('ADOPCION_' + this.solicitud.folio + '.pdf');
    });
  }

}
